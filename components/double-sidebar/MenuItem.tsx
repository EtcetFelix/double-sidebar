// app/(protected)/components/sidebar/MenuItem.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { MenuItem as MenuItemType } from "./config/menuConfig";
import { useNavigationService } from "./services/navigationService";

interface MenuItemProps {
  item: MenuItemType;
  isExpanded: boolean;
  isActive: boolean;
  hoveredIcon: string | null;
  onHover: (itemId: string) => void;
  onLeave: () => void;
  onMenuItemAction?: (item: MenuItemType) => void;
}

export function MenuItem({
  item,
  isExpanded,
  isActive,
  hoveredIcon,
  onHover,
  onLeave,
  onMenuItemAction,
}: MenuItemProps) {
  const { handleMenuItemAction } = useNavigationService();

  const handleClick = () => {
    if (onMenuItemAction) {
      onMenuItemAction(item);
    } else {
      handleMenuItemAction(item);
    }
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={onLeave}
    >
      <Button
        variant="ghost"
        className={`w-full h-10 justify-start px-3 overflow-hidden ${
          isExpanded && isActive ? "bg-accent text-accent-foreground" : ""
        }`}
        onClick={handleClick}
      >
        {/* Icon - always in same position */}
        <item.icon className="h-5 w-5 flex-shrink-0" />
        
        {/* Text and badges - always present, just get clipped */}
        <span className={`text-sm font-medium whitespace-nowrap ml-3 ${
          item.adminOnly ? 'text-amber-700 font-semibold' : ''
        }`}>
          {item.title}
        </span>
        
        {/* Spacer to push badges to the right */}
        <div className="flex-1"></div>
        
        {/* Badges and indicators - always rendered */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Regular badge */}
          {item.badge && (
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full min-w-[1.5rem] h-5">
              {item.badge}
            </span>
          )}
          
          {/* Chevron for sub-items */}
          {item.subItems && (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </Button>
      
      {/* Badge for collapsed state - positioned relative to button but offset from center */}
      {!isExpanded && item.badge && (
        <span className="absolute -top-1 -right-3 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium bg-destructive text-destructive-foreground rounded-full min-w-[1.25rem] h-5 z-10">
          {item.badge > 99 ? "99+" : item.badge}
        </span>
      )}
      
      {/* Tooltip - only when collapsed */}
      {!isExpanded && hoveredIcon === item.id && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 px-3 py-1.5 text-sm text-popover-foreground bg-popover border border-border rounded-md shadow-md whitespace-nowrap">
          {item.title}
          {item.adminOnly && (
            <span className="ml-2 text-xs text-amber-600 font-medium">• Admin</span>
          )}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-popover"></div>
        </div>
      )}
    </div>
  );
}