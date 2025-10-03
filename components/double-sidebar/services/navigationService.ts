import { useRouter } from "next/navigation";
import { MenuItem, SubMenuItem } from "../config/menuConfig";
import { useSidebar } from "../SidebarProvider";

export interface NavigationService {
  navigateToMenuItem: (item: MenuItem) => void;
  navigateToSubMenuItem: (subItem: SubMenuItem) => void;
  handleMenuItemAction: (item: MenuItem) => void;
  handleSubMenuItemAction: (subItem: SubMenuItem) => void;
}

export const useNavigationService = (): NavigationService => {
  const router = useRouter();
  const { handleNavigation } = useSidebar();

  const navigateToMenuItem = (item: MenuItem) => {
    if (item.href) {
      router.push(item.href);
    }
  };

  const navigateToSubMenuItem = (subItem: SubMenuItem) => {
    if (subItem.href) {
      router.push(subItem.href);
    }
  };

  const handleMenuItemAction = (item: MenuItem) => {
    // Handle custom actions or navigation
    if (item.href) {
      handleNavigation();
      navigateToMenuItem(item);
    }
    // Add any other custom logic here
  };

  const handleSubMenuItemAction = (subItem: SubMenuItem) => {
    // Handle custom actions first
    if (subItem.action) {
      subItem.action();
      return;
    }
    
    // Default to navigation
    if (subItem.href) {
      handleNavigation();
      navigateToSubMenuItem(subItem);
    }
  };

  return {
    navigateToMenuItem,
    navigateToSubMenuItem,
    handleMenuItemAction,
    handleSubMenuItemAction,
  };
};