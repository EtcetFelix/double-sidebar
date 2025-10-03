"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface SidebarFooterProps extends React.ComponentProps<"div"> {
  showDivider?: boolean;
}

export const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, showDivider = false, children, ...props }, ref) => {
    return (
      <div className="flex-none">
        {/* Optional divider */}
        {showDivider && (
          <div className="border-t border-border mx-2" />
        )}
        
        {/* Footer content */}
        <div
          ref={ref}
          data-sidebar="footer"
          className={cn("flex flex-col gap-2 p-2", className)}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);

SidebarFooter.displayName = "SidebarFooter";