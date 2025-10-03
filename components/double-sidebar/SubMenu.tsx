// app/(protected)/components/sidebar/SubMenu.tsx
"use client";

import { MenuItem } from "./config/menuConfig";
import { useNavigationService } from "./services/navigationService";

interface SubMenuProps {
  activeItem: MenuItem;
  isExpanded: boolean;
  isSecondSidebarOpen: boolean;
  isAdmin: boolean;
}

export function SubMenu({ activeItem, isExpanded, isSecondSidebarOpen, isAdmin }: SubMenuProps) {
  const { handleSubMenuItemAction } = useNavigationService();

  if (!activeItem?.subItems) return null;

  // Filter sub-items based on admin status
  const filteredSubItems = activeItem.subItems.filter(subItem => 
    !subItem.adminOnly || isAdmin
  );

  // If no sub-items are visible after filtering, don't render the submenu
  if (filteredSubItems.length === 0) return null;

  return (
    <div
      className={`absolute top-0 h-full w-56 bg-background border-r border-border transition-all duration-200 ease-out ${
        isExpanded ? "left-64" : "left-16"
      } ${
        isSecondSidebarOpen && isExpanded
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="h-full overflow-y-auto">
        {/* Sub-sidebar Header */}
        <div className="p-4 border-b border-border">
          <h3 className="text-base font-semibold text-foreground flex items-center space-x-2">
            <activeItem.icon className="h-4 w-4" />
            <span>{activeItem.title}</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {activeItem.title} management options
          </p>
        </div>
        
        {/* Sub-menu - Use filtered sub-items */}
        <div className="p-4">
          <nav className="space-y-1">
            {filteredSubItems.map((subItem) => (
              <button
                key={subItem.id}
                className="w-full inline-flex items-center justify-between whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2"
                onClick={() => handleSubMenuItemAction(subItem)}
              >
                <div className="flex items-center space-x-3">
                  <subItem.icon className="h-4 w-4" />
                  <span className={subItem.adminOnly ? 'text-amber-700 font-semibold' : 'font-medium'}>
                    {subItem.title}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {/* Regular badge */}
                  {subItem.badge && (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium border border-input bg-background text-foreground rounded-full min-w-[1.5rem] h-5">
                      {subItem.badge}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}