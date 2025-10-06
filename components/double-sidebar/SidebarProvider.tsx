"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useHover, useOnClickOutside } from "usehooks-ts";
import { SidebarFooterConfig } from "./config/menuConfig";

// Default footer configuration
const defaultFooterConfig: SidebarFooterConfig = {
  enabled: true,
  showDivider: true,
};

interface SidebarContextType {
  isOpen: boolean;
  isExpanded: boolean;
  activeMenuItem: string | null;
  isSecondSidebarOpen: boolean;
  footerConfig: SidebarFooterConfig;
  isDropdownOpen: boolean;
  isSidebarHovered: boolean;
  
  setIsOpen: (open: boolean) => void;
  setIsExpanded: (expanded: boolean) => void;
  setActiveMenuItem: (item: string | null) => void;
  setIsSecondSidebarOpen: (open: boolean) => void;
  setFooterConfig: (config: SidebarFooterConfig) => void;
  setIsDropdownOpen: (open: boolean) => void;

  toggleSidebar: () => void;
  handleDropdownStateChange: (open: boolean) => void;
  handleNavigation: () => void;

  sidebarRef: React.RefObject<HTMLDivElement | null>;

  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleOpen: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ 
  children,
  initialFooterConfig = defaultFooterConfig 
}: { 
  children: ReactNode;
  initialFooterConfig?: SidebarFooterConfig;
}) {
  // Sidebar state (no more admin state - handled via props)
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const [isSecondSidebarOpen, setIsSecondSidebarOpen] = useState(false);
  const [footerConfig, setFooterConfig] = useState<SidebarFooterConfig>(initialFooterConfig);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const isMobile = false;

  const collapseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const providerSidebarRef = useRef<HTMLDivElement | null>(null);
  const isSidebarHovered = useHover(providerSidebarRef as React.RefObject<HTMLElement>);

  // Core collapse logic function
  const collapseSidebar = useCallback(() => {
    setIsExpanded(false);
    setIsSecondSidebarOpen(false);
    setActiveMenuItem(null);
  }, [setIsExpanded, setIsSecondSidebarOpen, setActiveMenuItem]);

  // Sidebar hover/collapse logic
  useEffect(() => {
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }

    if (!isSidebarHovered && !isDropdownOpen) {
      collapseTimeoutRef.current = setTimeout(() => {
        if (!isSidebarHovered && !isDropdownOpen) {
          collapseSidebar();
        }
      }, 150);
    } else if (isSidebarHovered) {
      if (!isExpanded) { 
        setIsExpanded(true);
      }
    }
  }, [isSidebarHovered, isDropdownOpen, collapseSidebar, setIsExpanded, isExpanded]);

  // Click outside handler
  useOnClickOutside(
    providerSidebarRef as React.RefObject<HTMLElement>,
    () => {
      if (isExpanded && !isDropdownOpen && !isSidebarHovered) {
        collapseSidebar();
      }
    }
  );

  // Navigation handler
  const handleNavigation = useCallback(() => {
    setIsExpanded(false);
    setIsSecondSidebarOpen(false);
    setActiveMenuItem(null);
    
    if (isMobile) {
      setIsOpen(false);
      setOpenMobile(false);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsExpanded(false);
      setActiveMenuItem(null);
      setIsSecondSidebarOpen(false);
    }
  };

  const toggleOpen = () => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      toggleSidebar();
    }
  };

  // Handle dropdown state changes
  const handleDropdownStateChange = useCallback((open: boolean) => {
    setIsDropdownOpen(open);

    if (!open) {
      if (!isSidebarHovered) {
        if (collapseTimeoutRef.current) {
          clearTimeout(collapseTimeoutRef.current);
        }
        collapseTimeoutRef.current = setTimeout(() => {
          if (!isSidebarHovered && !isDropdownOpen) {
            collapseSidebar();
          }
        }, 150);
      }
    } else {
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current);
        collapseTimeoutRef.current = null;
      }
    }
  }, [collapseSidebar, setIsDropdownOpen, isSidebarHovered, isDropdownOpen]); 

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isExpanded,
        activeMenuItem,
        isSecondSidebarOpen,
        footerConfig,
        isDropdownOpen,
        isSidebarHovered,
        
        setIsOpen,
        setIsExpanded,
        setActiveMenuItem,
        setIsSecondSidebarOpen,
        setFooterConfig,
        setIsDropdownOpen,
        
        toggleSidebar,
        handleDropdownStateChange,
        handleNavigation,
        
        sidebarRef: providerSidebarRef,
        
        state: isExpanded ? "expanded" : "collapsed",
        open: isOpen,
        setOpen: setIsOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}