import {
  Blocks,
  Calendar,
  Clapperboard,
  Mail,
  Send,
  Settings,
  UserCheck,
  Video
} from "lucide-react";
import { ComponentType } from "react";

export interface SubMenuItem {
  id: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  badge?: number;
  href?: string;
  action?: () => void;
  adminOnly?: boolean; // New field to mark admin-only items
}

export interface MenuItem {
  id: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  badge?: number;
  href?: string;
  subItems?: SubMenuItem[];
  adminOnly?: boolean; // New field to mark admin-only items
}

export const menuItems: MenuItem[] = [
  {
    id: "video",
    title: "Video",
    icon: Video,
    subItems: [
      { 
        id: "meeting-reminders", 
        title: "Meeting Reminders", 
        icon: Calendar, 
        href: "/meeting-reminders"
      },
      { 
        id: "video-campaigns", 
        title: "Video Campaigns", 
        icon: Video, 
        href: "/send-campaigns",
        adminOnly: true // Mark as admin-only
      },
      { 
        id: "generations", 
        title: "Video Generations", 
        icon: Clapperboard, 
        href: "/campaigns",
        adminOnly: true // Mark as admin-only
      },
    ],
  },
  {
    id: "classic-emails",
    title: "Classic Emails",
    icon: Mail,
    subItems: [
      { 
        id: "sequences", 
        title: "Sequences", 
        icon: Send, 
        href: "/outreach-campaigns"
      },
      { 
        id: "product-profiles", 
        title: "Product Profiles", 
        icon: Blocks, 
        href: "/product-profiles"
      },
      { 
        id: "client-list", 
        title: "Client List", 
        icon: UserCheck, 
        href: "/saved-prospects"
      },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    href: "/settings"
  },
];

// Filter function for menu items based on admin status
export const getMenuItemsForUser = (isAdmin: boolean): MenuItem[] => {
  return menuItems
    .filter(item => !item.adminOnly || isAdmin) // Filter out admin-only top-level items
    .map(item => {
      if (item.subItems) {
        return {
          ...item,
          subItems: item.subItems.filter(subItem => !subItem.adminOnly || isAdmin)
        }
      }
      return item
    })
    .filter(item => {
      // If a menu item only has admin sub-items and user is not admin, 
      // and the parent has no direct href, remove it entirely
      if (item.subItems && !item.href) {
        return item.subItems.length > 0
      }
      return true
    })
}

// Helper functions for menu operations (unchanged)
export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find(item => item.id === id);
};

export const getSubMenuItemById = (menuId: string, subId: string): SubMenuItem | undefined => {
  const menuItem = getMenuItemById(menuId);
  return menuItem?.subItems?.find(subItem => subItem.id === subId);
};

export const getTotalBadgeCount = (): number => {
  return menuItems.reduce((total, item) => {
    const itemBadge = item.badge || 0;
    const subItemsBadge = item.subItems?.reduce((subTotal, subItem) => subTotal + (subItem.badge || 0), 0) || 0;
    return total + itemBadge + subItemsBadge;
  }, 0);
};

export const getMenuItemsWithBadges = (): MenuItem[] => {
  return menuItems.filter(item => item.badge && item.badge > 0);
};

// Footer configuration (unchanged)
export interface SidebarFooterConfig {
  enabled: boolean;
  showDivider?: boolean;
  className?: string;
}