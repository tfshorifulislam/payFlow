'use client';

import * as React from 'react';
import { Plus, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  onAddEmployeeClick?: () => void;
  onExportClick?: () => void;
}

const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
};

export function DashboardHeader({
  onAddEmployeeClick,
  onExportClick,
}: DashboardHeaderProps) {
  // Client clock via external store: prerender-safe (server snapshot is static),
  // lint-safe (no setState-in-effect), refreshes every 30s for midnight rollover.
  const formattedDate = React.useSyncExternalStore(
    (onChange) => {
      const id = setInterval(onChange, 30_000);
      return () => clearInterval(id);
    },
    () => new Date().toLocaleDateString('en-US', DATE_FORMAT_OPTIONS),
    () => ''
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Good morning, Admin
          </h1>
          <span className="chip chip-success [&>span]:animate-none [&::before]:animate-pulse">
            Live
          </span>
        </div>
        <p className="text-xs sm:text-sm text-text-secondary font-normal">
          Here&apos;s what&apos;s happening across your organization today.
        </p>
      </div>

      <div className="flex items-center gap-2.5 self-start sm:self-auto">
        {/* Date Display Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-text-secondary text-xs font-medium shadow-xs">
          <Calendar className="h-3.5 w-3.5 text-text-secondary" />
          <span>{formattedDate}</span>
        </div>

        {/* Secondary Action: Export / Report */}
        <Button
          variant="outline"
          size="sm"
          onClick={onExportClick}
          className="border-border bg-surface hover:bg-surface-muted text-foreground text-xs font-medium h-9 px-3 rounded-lg shadow-xs transition-colors"
        >
          <Download className="h-3.5 w-3.5 mr-1.5 text-text-secondary" />
          <span>Export</span>
        </Button>

        {/* Primary CTA: Add Employee with primary gradient */}
        <Button
          onClick={onAddEmployeeClick}
          className="bg-gradient-primary hover:opacity-95 text-white font-medium text-xs h-9 px-3.5 rounded-lg shadow-sm shadow-blue-600/20 active:translate-y-px transition-all"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Add Employee</span>
        </Button>
      </div>
    </div>
  );
}
