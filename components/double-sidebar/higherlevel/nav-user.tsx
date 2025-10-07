"use client"

import {
  ChevronsUpDown,
  LogOut
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../SidebarMenu"
import {
  useSidebar,
} from "../SidebarProvider"

import { signout } from "@/app/actions/signout"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email?: string
    avatar?: string
  }
}) {
  // Destructure setIsDropdownOpen from useSidebar
  const { isMobile, isExpanded, setIsDropdownOpen } = useSidebar() // ADD setIsDropdownOpen HERE

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu
          onOpenChange={setIsDropdownOpen}
        >
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              tooltip={!isExpanded ? `${user.name} - ${user.email}` : undefined}
              className={cn(
                "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
                !isExpanded && "justify-center",
                "h-12"
              )}
            >
              <Avatar className={cn(
                "h-8 w-8 rounded-lg flex-shrink-0",
                !isExpanded && "absolute left-2"
              )}>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Width-based clipping animation for text */}
              <div className={cn(
                "flex items-center text-left text-sm leading-tight min-w-0 overflow-hidden transition-all duration-300",
                isExpanded ? "flex-1" : "w-0"
              )}>
                <div className="grid min-w-0 whitespace-nowrap">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>

              {/* Width-based clipping animation for chevron */}
              <ChevronsUpDown className={cn(
                "size-4 flex-shrink-0 overflow-hidden transition-all duration-300",
                isExpanded ? "w-auto" : "w-0"
              )} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
            onCloseAutoFocus={(event)=> {
                event.preventDefault()
            }}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <Sparkles className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem asChild>
              <form action={signout}>
                <button className="flex w-full items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </button>
              </form>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}