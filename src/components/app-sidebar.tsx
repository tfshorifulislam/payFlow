'use client';

import * as React from 'react';
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
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LayoutDashboard,
  Users,
  Building,
  Clock,
  CalendarOff,
  Banknote,
  FolderKanban,
  ListChecks,
  TrendingUp,
  FileSpreadsheet,
  Settings,
  LifeBuoy,
  ChevronsUpDown,
  LogOut,
  Sparkles,
  ShieldCheck,
  User,
  Bell,
} from 'lucide-react';

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  badge?: string;
  badgeTone?: 'default' | 'accent' | 'warning';
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: 'CORE WORKFORCE',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: 'Employees',
        url: '#employees',
        icon: Users,
        badge: '1,248',
      },
      {
        title: 'Departments',
        url: '#departments',
        icon: Building,
        badge: '6',
      },
    ],
  },
  {
    title: 'TIME & COMPENSATION',
    items: [
      {
        title: 'Attendance',
        url: '#attendance',
        icon: Clock,
        badge: '87.1%',
        badgeTone: 'accent',
      },
      {
        title: 'Leave Management',
        url: '#leave',
        icon: CalendarOff,
        badge: '4 pending',
        badgeTone: 'warning',
      },
      {
        title: 'Payroll',
        url: '#payroll',
        icon: Banknote,
      },
    ],
  },
  {
    title: 'WORK & TALENT',
    items: [
      {
        title: 'Projects',
        url: '#projects',
        icon: FolderKanban,
      },
      {
        title: 'Tasks',
        url: '#tasks',
        icon: ListChecks,
        badge: '12',
      },
      {
        title: 'Performance',
        url: '#performance',
        icon: TrendingUp,
      },
    ],
  },
  {
    title: 'SYSTEM & SUPPORT',
    items: [
      {
        title: 'Reports',
        url: '#reports',
        icon: FileSpreadsheet,
      },
      {
        title: 'Settings',
        url: '#settings',
        icon: Settings,
      },
      {
        title: 'Help & Support',
        url: '#help',
        icon: LifeBuoy,
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r border-border bg-sidebar select-none" {...props}>
      {/* Brand Header */}
      <SidebarHeader className="pt-4 pb-2 px-3 border-b border-border/50">
        <div className="flex items-center gap-3 px-1.5 py-1">
          {/* Brand Logo with selective primary gradient */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-primary text-white shadow-sm shadow-blue-600/25">
            <Sparkles className="h-4.5 w-4.5 fill-white/20 text-white" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-foreground truncate">
                PayFlow EMS
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
                PRO
              </span>
            </div>
            <span className="text-[11px] font-medium text-text-secondary truncate">
              Employee Management
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent className="gap-4 px-2 py-3 overflow-y-auto">
        {navGroups.map((group) => (
          <SidebarGroup key={group.title} className="px-1 py-0">
            <SidebarGroupLabel className="text-[10px] font-semibold text-text-secondary/80 tracking-wider uppercase mb-1.5 px-2">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {group.items.map((item) => {
                  const isActive = !!item.isActive;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={isActive}
                        render={<a href={item.url} />}
                        className={`group relative flex items-center justify-between rounded-md px-2.5 py-2 text-xs font-medium transition-all duration-150 h-8.5 ${
                          isActive
                            ? 'bg-gradient-primary text-white shadow-sm font-semibold hover:bg-gradient-primary hover:text-white'
                            : 'text-text-secondary hover:text-foreground hover:bg-surface-muted/80'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <item.icon
                            className={`h-4 w-4 shrink-0 transition-colors ${
                              isActive ? 'text-white' : 'text-text-secondary group-hover:text-foreground'
                            }`}
                          />
                          <span className="truncate">{item.title}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded tracking-tight transition-colors ${
                              isActive
                                ? 'bg-white/20 text-white font-semibold'
                                : item.badgeTone === 'warning'
                                ? 'bg-warning/10 text-warning border border-warning/20'
                                : item.badgeTone === 'accent'
                                ? 'bg-success/10 text-success border border-success/20'
                                : 'bg-surface-muted text-text-secondary group-hover:text-foreground'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Organization / User Profile Footer */}
      <SidebarFooter className="p-3 border-t border-border/60 bg-surface/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="w-full flex items-center gap-2.5 rounded-lg p-2 text-left hover:bg-surface-muted transition-colors border border-transparent hover:border-border"
                  />
                }
              >
                {/* Avatar with status indicator */}
                <div className="relative shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    SJ
                  </div>
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-success ring-2 ring-surface" />
                </div>
                <div className="grid flex-1 text-left text-xs leading-snug min-w-0">
                  <span className="truncate font-semibold text-foreground">Sarah Jenkins</span>
                  <span className="truncate text-[11px] text-text-secondary">HR Director • Admin</span>
                </div>
                <ChevronsUpDown className="ml-auto h-3.5 w-3.5 text-text-secondary" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-lg border-border bg-surface shadow-lg"
                side="top"
                align="start"
                sideOffset={8}
              >
                <DropdownMenuLabel className="font-normal px-2.5 py-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-xs font-semibold leading-none text-foreground">Sarah Jenkins</p>
                    <p className="text-[11px] leading-none text-text-secondary">sarah.jenkins@payflow.internal</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem className="cursor-pointer text-xs py-2 px-2.5">
                  <User className="mr-2 h-3.5 w-3.5 text-text-secondary" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-xs py-2 px-2.5">
                  <ShieldCheck className="mr-2 h-3.5 w-3.5 text-text-secondary" />
                  <span>Admin Controls</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-xs py-2 px-2.5">
                  <Bell className="mr-2 h-3.5 w-3.5 text-text-secondary" />
                  <span>Notification Center</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-xs py-2 px-2.5">
                  <Settings className="mr-2 h-3.5 w-3.5 text-text-secondary" />
                  <span>Org Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem className="cursor-pointer text-xs py-2 px-2.5 text-danger focus:bg-danger/10 focus:text-danger">
                  <LogOut className="mr-2 h-3.5 w-3.5" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
