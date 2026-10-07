"use client"

import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
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
  UserCircle,
  Building2,
  Shield,
  Blocks,
  Layout,
  Briefcase,
  History,
} from "lucide-react"

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navGroups: [
    {
      title: "MAIN",
      items: [
        { title: "Overview", url: "#", icon: LayoutDashboard, isActive: true },
        { title: "Payments", url: "#", icon: CreditCard },
        { title: "Customers", url: "#", icon: Users },
        { title: "Products", url: "#", icon: Package },
        { title: "Payment Links", url: "#", icon: Link2 },
        { title: "Invoices", url: "#", icon: FileText },
        { title: "Subscriptions", url: "#", icon: Repeat },
        { title: "Refunds", url: "#", icon: Undo2 },
        { title: "Payouts", url: "#", icon: Banknote },
        { title: "Transactions", url: "#", icon: ArrowRightLeft },
        { title: "Analytics", url: "#", icon: BarChart3 },
      ],
    },
    {
      title: "MANAGEMENT",
      items: [
        { title: "Team", url: "#", icon: Users2 },
        { title: "Notifications", url: "#", icon: Bell },
      ],
    },
    {
      title: "DEVELOPER",
      items: [
        { title: "API Keys", url: "#", icon: Key },
        { title: "Webhooks", url: "#", icon: Webhook },
        { title: "Events", url: "#", icon: Activity },
        { title: "API Logs", url: "#", icon: TerminalSquare },
      ],
    },
    {
      title: "SETTINGS",
      items: [
        { title: "Profile", url: "#", icon: UserCircle },
        { title: "Business", url: "#", icon: Building2 },
        { title: "Security", url: "#", icon: Shield },
        { title: "Billing", url: "#", icon: CreditCard },
        { title: "Integrations", url: "#", icon: Blocks },
      ],
    },
    {
      title: "ADMIN",
      items: [
        { title: "Admin Dashboard", url: "#", icon: Layout },
        { title: "Users", url: "#", icon: Users },
        { title: "Businesses", url: "#", icon: Briefcase },
        { title: "Audit Logs", url: "#", icon: History },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center px-4 py-2 mt-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
            P
          </div>
          <span className="ml-3 font-semibold text-lg tracking-tight">PayFlow</span>
        </div>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {data.navGroups.map((group) => (
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
                      <item.icon className="h-4 w-4 opacity-70" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
