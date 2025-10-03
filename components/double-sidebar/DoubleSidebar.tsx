// components/double-sidebar/DoubleSidebar.tsx
"use client";

import { Menu } from "lucide-react";
import * as React from "react";
import { getMenuItemById, getMenuItemsForUser } from "./config/menuConfig";
import { MenuItem } from "./MenuItem";
import { SidebarFooter } from "./SidebarFooter";
import { useSidebar } from "./SidebarProvider";
import { SubMenu } from "./SubMenu";

interface DoubleSidebarProps {
  isAdmin: boolean;
  footer?: React.ReactNode;
}

export function DoubleSidebar({ isAdmin, footer }: DoubleSidebarProps) {
  const {
    isOpen,
    isExpanded,
    activeMenuItem,
    isSecondSidebarOpen,
    footerConfig,
    setActiveMenuItem,
    setIsSecondSidebarOpen,
    sidebarRef,
  } = useSidebar();

  const [hoveredIcon, setHoveredIcon] = React.useState<string | null>(null);

  // Filter menu items based on admin status
  const filteredMenuItems = React.useMemo(() => 
    getMenuItemsForUser(isAdmin), 
    [isAdmin]
  );

  const handleMenuItemHover = React.useCallback((itemId: string) => {
    if (isExpanded) {
      setActiveMenuItem(itemId);
      const item = getMenuItemById(itemId);
      if (item?.subItems) {
        setIsSecondSidebarOpen(true);
      } else {
        setIsSecondSidebarOpen(false);
      }
    } else {
      setHoveredIcon(itemId);
    }
  }, [isExpanded, setActiveMenuItem, setIsSecondSidebarOpen]);

  const activeItem = activeMenuItem ? getMenuItemById(activeMenuItem) : undefined;

  if (!isOpen) return null;

  return (
    <div className="relative w-16 h-full flex-shrink-0">
      <div
        ref={sidebarRef}
        className={`${
          isExpanded ? 'fixed left-0 top-0 z-50' : 'relative z-10'
        } h-full`}
      >
        {/* Main Sidebar */}
        <div
          className={`h-full bg-background border-r border-border transition-all duration-300 ease-out ${
            isExpanded ? "w-64" : "w-16"
          }`}
        >
          <div className="h-full overflow-y-auto flex flex-col">
            {/* Fixed Header Space */}
            <div className="flex-none p-4 border-b border-border h-[88px] flex flex-col justify-center">
              <div className="h-full flex items-center px-3">
                <h2 className="text-xl font-semibold text-foreground leading-tight">
                  N<span className={`transition-opacity duration-500 ${
                    isExpanded ? 'opacity-100' : 'opacity-0'
                  }`}>ova</span>
                </h2>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 p-4 overflow-hidden flex flex-col">
              <nav className="space-y-2 flex-1">
                {filteredMenuItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    isExpanded={isExpanded}
                    isActive={activeMenuItem === item.id}
                    hoveredIcon={hoveredIcon}
                    onHover={handleMenuItemHover}
                    onLeave={() => setHoveredIcon(null)}
                  />
                ))}
              </nav>
            </div>

            {/* Sticky Footer */}
            {footerConfig.enabled && footer && (
              <SidebarFooter showDivider={footerConfig.showDivider} className={footerConfig.className}>
                {footer}
              </SidebarFooter>
            )}
          </div>
        </div>

        {/* Second Sidebar Layer */}
        {activeItem && (
          <SubMenu
            activeItem={activeItem}
            isExpanded={isExpanded}
            isSecondSidebarOpen={isSecondSidebarOpen}
            isAdmin={isAdmin}
          />
        )}
      </div>
    </div>
  );
}

export function SidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
    >
      <Menu className="h-4 w-4" />
    </button>
  );
}