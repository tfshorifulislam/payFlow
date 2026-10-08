'use client';

import * as React from 'react';
import {
  Search,
  Bell,
  Plus,
  ChevronDown,
  CircleCheck,
  CircleAlert,
  Clock,
} from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ems/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface TopNavbarProps {
  onOpenAddEmployee?: () => void;
  onOpenQuickAction?: (actionId: string) => void;
  onSearchChange?: (term: string) => void;
  searchTerm?: string;
}

export function TopNavbar({
  onOpenAddEmployee,
  onOpenQuickAction,
  onSearchChange,
  searchTerm = '',
}: TopNavbarProps) {
  const [unreadNotifications, setUnreadNotifications] = React.useState(3);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 lg:px-6">
        {/* Left side: Sidebar trigger & Search */}
        <div className="flex items-center gap-3 md:gap-4 flex-1 max-w-xl">
        <SidebarTrigger className="-ml-1 text-text-secondary hover:text-foreground hover:bg-surface-muted transition-colors rounded-lg p-1.5" />
        <Separator orientation="vertical" className="h-5 bg-border hidden sm:block" />

        {/* Global Search Input */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search employees, roles, departments..."
            className="w-full h-9 pl-9 pr-14 text-xs font-medium rounded-lg border border-border bg-surface-muted/60 text-foreground placeholder:text-text-secondary/70 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-surface transition-all"
          />
          <kbd className="hidden sm:inline-flex absolute right-2.5 top-1/2 -translate-y-1/2 items-center gap-0.5 rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium text-text-secondary shadow-xs">
            <span className="text-[11px]">⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Right side: Actions, Theme, Notifications & User Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Action Button */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex border-border bg-surface hover:bg-surface-muted text-xs font-semibold text-foreground shadow-xs gap-1.5 h-8 px-3 rounded-lg"
              />
            }
          >
            <Plus className="h-3.5 w-3.5 text-primary" />
            <span>Quick Action</span>
            <ChevronDown className="h-3 w-3 text-text-secondary ml-0.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-52 rounded-lg border-border bg-surface shadow-md py-1"
          >
            <DropdownMenuLabel className="text-[10px] uppercase font-semibold text-text-secondary tracking-wider px-3 py-1.5">
              Workforce Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={onOpenAddEmployee}
              className="cursor-pointer text-xs py-2 px-3 font-medium text-foreground hover:bg-surface-muted"
            >
              <Plus className="mr-2 h-3.5 w-3.5 text-primary" />
              <span>Add Employee</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpenQuickAction?.('create-dept')}
              className="cursor-pointer text-xs py-2 px-3 text-foreground hover:bg-surface-muted"
            >
              <span>Create Department</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpenQuickAction?.('mark-attendance')}
              className="cursor-pointer text-xs py-2 px-3 text-foreground hover:bg-surface-muted"
            >
              <span>Mark Attendance</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpenQuickAction?.('create-payroll')}
              className="cursor-pointer text-xs py-2 px-3 text-foreground hover:bg-surface-muted"
            >
              <span>Create Payroll</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={() => onOpenQuickAction?.('generate-report')}
              className="cursor-pointer text-xs py-2 px-3 text-foreground hover:bg-surface-muted"
            >
              <span>Generate Report</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notification Bell with Badge */}
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger
              render={
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="relative text-text-secondary hover:text-foreground hover:bg-surface-muted rounded-lg"
                      aria-label="Notifications"
                    />
                  }
                >
                  <Bell className="h-4 w-4" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-1 right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                  )}
                </DropdownMenuTrigger>
              }
            />
            <TooltipContent side="bottom">
              <p className="text-xs">{unreadNotifications} unread notifications</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenuContent
            align="end"
            className="w-80 rounded-xl border-border bg-surface shadow-xl p-0"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground">Notifications</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-primary/10 text-primary">
                  {unreadNotifications} new
                </span>
              </div>
              <button
                onClick={() => setUnreadNotifications(0)}
                className="text-[11px] text-text-secondary hover:text-primary transition-colors"
              >
                Mark all read
              </button>
            </div>
            <div className="divide-y divide-border/50 max-h-72 overflow-y-auto">
              <div className="p-3 hover:bg-surface-muted/60 transition-colors flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-success/10 text-success mt-0.5">
                  <CircleCheck className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">New hire onboarded</p>
                  <p className="text-[11px] text-text-secondary">Sarah Chen completed paperwork</p>
                  <span className="text-[10px] text-text-secondary/70">12 mins ago</span>
                </div>
              </div>
              <div className="p-3 hover:bg-surface-muted/60 transition-colors flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-warning/10 text-warning mt-0.5">
                  <Clock className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">Leave request pending</p>
                  <p className="text-[11px] text-text-secondary">Elena Rostova requested 3 days off</p>
                  <span className="text-[10px] text-text-secondary/70">1 hour ago</span>
                </div>
              </div>
              <div className="p-3 hover:bg-surface-muted/60 transition-colors flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-info/10 text-info mt-0.5">
                  <CircleAlert className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">Payroll schedule alert</p>
                  <p className="text-[11px] text-text-secondary">October salary run due in 4 days</p>
                  <span className="text-[10px] text-text-secondary/70">3 hours ago</span>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="h-5 bg-border" />

        {/* User Identity Info */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-sm ring-1 ring-border">
              SJ
            </div>
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-success ring-2 ring-surface" />
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-semibold text-foreground leading-tight">Sarah Jenkins</span>
            <span className="text-[11px] font-medium text-text-secondary leading-tight">HR Director</span>
          </div>
        </div>
      </div>
      </div>
    </header>
  );
}

