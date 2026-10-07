"use client"

import * as React from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  CreditCard,
  Users,
  Package,
  Link2,
  FileText,
  Repeat,
  Undo2,
  Banknote,
  ArrowRightLeft,
  BarChart3,
  Users2,
  Bell,
  Key,
  Webhook,
  Activity,
  TerminalSquare,
  Settings,
  Wallet,
  ChevronRightIcon,
  ChevronsUpDown,
  LogOut,
  Zap
} from "lucide-react"

const data = {
  navGroups: [
    {
      title: "OVERVIEW",
      items: [
        { title: "Overview", url: "/dashboard", icon: LayoutDashboard, isActive: true },
      ],
    },
    {
      title: "PAYMENTS",
      items: [
        { title: "Payments", url: "/dashboard/payments", icon: CreditCard },
        { title: "Payment Links", url: "/dashboard/payment-links", icon: Link2 },
        { title: "Refunds", url: "/dashboard/refunds", icon: Undo2 },
      ],
    },
    {
      title: "CUSTOMERS",
      items: [
        { title: "Customers", url: "/dashboard/customers", icon: Users },
      ],
    },
    {
      title: "PRODUCTS & BILLING",
      items: [
        { title: "Products", url: "/dashboard/products", icon: Package },
        { title: "Invoices", url: "/dashboard/invoices", icon: FileText },
        { title: "Subscriptions", url: "/dashboard/subscriptions", icon: Repeat },
      ],
    },
    {
      title: "MONEY",
      items: [
        { title: "Balance", url: "/dashboard/balance", icon: Wallet },
        { title: "Payouts", url: "/dashboard/payouts", icon: Banknote },
        { title: "Transactions", url: "/dashboard/transactions", icon: ArrowRightLeft },
      ],
    },
    {
      title: "INSIGHTS",
      items: [
        { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
      ],
    },
    {
      title: "DEVELOPERS",
      items: [
        { title: "API Keys", url: "/dashboard/api-keys", icon: Key },
        { title: "Webhooks", url: "/dashboard/webhooks", icon: Webhook },
        { title: "Events", url: "/dashboard/events", icon: Activity },
        { title: "API Logs", url: "/dashboard/api-logs", icon: TerminalSquare },
      ],
    },
    {
      title: "ACCOUNT",
      items: [
        { title: "Team", url: "/dashboard/team", icon: Users2 },
        { title: "Notifications", url: "/dashboard/notifications", icon: Bell },
        { title: "Settings", url: "/dashboard/settings", icon: Settings },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r border-border bg-sidebar" {...props}>
      <SidebarHeader className="pt-4 pb-2 px-2">
        <div className="flex items-center px-2 py-2 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-lg shadow-blue-500/20">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <div className="ml-3 flex flex-col">
            <span className="font-bold text-xl tracking-tight text-foreground leading-tight">PayFlow</span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Payments Platform</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="gap-2 px-2">
        {data.navGroups.map((group) => {
          const isCollapsible = group.items.length > 1;

          if (!isCollapsible) {
            return (
              <SidebarGroup key={group.title} className="px-0 py-0">
                <SidebarGroupLabel className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase mb-1 px-2">
                  {group.title}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          isActive={item.isActive}
                          render={<a href={item.url} />}
                          className={`rounded-[10px] transition-all duration-200 h-9 px-3 ${
                            item.isActive
                              ? "bg-gradient-primary text-white shadow-sm shadow-blue-500/20 data-[active=true]:bg-gradient-primary data-[active=true]:text-white font-medium hover:bg-gradient-primary hover:text-white"
                              : "text-slate-500 dark:text-slate-400 hover:text-foreground hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
                          }`}
                        >
                          <item.icon className={`h-4 w-4 mr-2 ${item.isActive ? "text-white" : "opacity-80"}`} />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )
          }

          return (
            <Collapsible
              key={group.title}
              title={group.title}
              defaultOpen
              className="group/collapsible"
            >
              <SidebarGroup className="px-0 py-0">
                <SidebarGroupLabel
                  className="group/label text-[10px] font-bold text-muted-foreground tracking-widest uppercase mb-1 px-2 hover:bg-transparent hover:text-foreground cursor-pointer transition-colors"
                  render={<CollapsibleTrigger />}
                >
                  {group.title}
                  <ChevronRightIcon className="ml-auto transition-transform group-data-open/collapsible:rotate-90 h-3.5 w-3.5" />
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            isActive={item.isActive}
                            render={<a href={item.url} />}
                            className={`rounded-[10px] transition-all duration-200 h-9 px-3 ${
                              item.isActive
                                ? "bg-gradient-primary text-white shadow-sm shadow-blue-500/20 data-[active=true]:bg-gradient-primary data-[active=true]:text-white font-medium hover:bg-gradient-primary hover:text-white"
                                : "text-slate-500 dark:text-slate-400 hover:text-foreground hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
                            }`}
                          >
                            <item.icon className={`h-4 w-4 mr-2 ${item.isActive ? "text-white" : "opacity-80"}`} />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          )
        })}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl p-2 h-auto transition-colors"
                  />
                }
              >
                <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-gradient-primary text-white shadow-sm">
                  <span className="font-bold text-xs">AC</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight ml-1">
                  <span className="truncate font-semibold text-foreground">Acme Corp</span>
                  <span className="truncate text-xs text-muted-foreground">admin@acme.com</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl border-border"
                side="bottom"
                align="end"
                sideOffset={8}
              >
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive cursor-pointer focus:bg-destructive/10 focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
