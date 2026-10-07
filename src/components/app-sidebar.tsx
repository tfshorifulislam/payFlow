"use client"

import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
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
} from "@/components/ui/sidebar"
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
  ChevronRightIcon
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
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center px-4 py-2 mt-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
            P
          </div>
          <span className="ml-3 font-semibold text-lg tracking-tight">PayFlow</span>
        </div>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {data.navGroups.map((group) => {
          const isCollapsible = group.items.length > 1;

          if (!isCollapsible) {
            return (
              <SidebarGroup key={group.title}>
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-1">
                  {group.title}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          isActive={item.isActive}
                          render={<a href={item.url} />}
                        >
                          <item.icon className="h-4 w-4 opacity-70 text-blue-600" />
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
              <SidebarGroup>
                <SidebarGroupLabel
                  className="group/label text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-1 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
                  render={<CollapsibleTrigger />}
                >
                  {group.title}{" "}
                  <ChevronRightIcon className="ml-auto transition-transform group-data-open/collapsible:rotate-90 h-4 w-4" />
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            isActive={item.isActive}
                            render={<a href={item.url} />}
                          >
                            <item.icon className="h-4 w-4 opacity-70 text-blue-600" />
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
      <SidebarRail />
    </Sidebar>
  )
}
