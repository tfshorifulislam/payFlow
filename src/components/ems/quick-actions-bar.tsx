'use client';

import * as React from 'react';
import {
  UserPlus,
  Building2,
  Clock,
  Banknote,
  FileSpreadsheet,
  Zap,
} from 'lucide-react';
import { QuickActionItem } from '@/types/ems';

interface QuickActionsBarProps {
  actions: QuickActionItem[];
  onSelectAction: (actionId: string) => void;
}

export function QuickActionsBar({ actions, onSelectAction }: QuickActionsBarProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-border/50 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Zap className="h-3.5 w-3.5 fill-current" />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              Quick Actions
            </h2>
          </div>
        </div>
        <span className="text-[11px] text-text-secondary">
          Frequently used management tools
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((act) => {
          let IconComp = UserPlus;
          if (act.iconName === 'building') IconComp = Building2;
          else if (act.iconName === 'clock-check') IconComp = Clock;
          else if (act.iconName === 'receipt') IconComp = Banknote;
          else if (act.iconName === 'file-spreadsheet') IconComp = FileSpreadsheet;

          const isPrimary = act.id === 'add-employee';

          return (
            <button
              key={act.id}
              onClick={() => onSelectAction(act.id)}
              className={`group text-left p-3.5 rounded-lg border transition-all duration-150 flex flex-col justify-between ${
                isPrimary
                  ? 'border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 shadow-xs'
                  : 'border-border bg-surface hover:bg-surface-muted hover:border-border/80 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition-transform group-hover:scale-105 ${
                    isPrimary
                      ? 'bg-gradient-primary text-white shadow-xs'
                      : 'bg-surface-muted text-text-secondary group-hover:text-primary group-hover:bg-primary/10'
                  }`}
                >
                  <IconComp className="h-4 w-4" />
                </div>
                {act.shortcut && (
                  <kbd className="hidden sm:inline-flex items-center rounded border border-border/80 bg-surface px-1.5 py-0.5 text-[10px] font-mono text-text-secondary">
                    {act.shortcut}
                  </kbd>
                )}
              </div>

              <div>
                <span
                  className={`text-xs font-semibold block transition-colors ${
                    isPrimary ? 'text-primary' : 'text-foreground group-hover:text-primary'
                  }`}
                >
                  {act.label}
                </span>
                <span className="text-[11px] text-text-secondary mt-0.5 line-clamp-1 block">
                  {act.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

