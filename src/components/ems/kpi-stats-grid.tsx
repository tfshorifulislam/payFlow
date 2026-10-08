'use client';

import * as React from 'react';
import {
  Users,
  UserCheck,
  CalendarOff,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { KpiMetric } from '@/types/ems';

interface KpiStatsGridProps {
  metrics: KpiMetric[];
}

export function KpiStatsGrid({ metrics }: KpiStatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {metrics.map((metric) => {
        let IconComponent = Users;
        if (metric.iconName === 'user-check') IconComponent = UserCheck;
        else if (metric.iconName === 'calendar-off') IconComponent = CalendarOff;
        else if (metric.iconName === 'briefcase') IconComponent = Briefcase;

        return (
          <div
            key={metric.id}
            className="group rounded-xl border border-border bg-surface p-5 shadow-xs hover:shadow-card transition-shadow duration-200 flex flex-col"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-[13px] font-medium text-text-secondary">
                {metric.label}
              </span>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted border border-border/60 text-text-secondary group-hover:text-primary group-hover:border-primary/30 transition-colors">
                <IconComponent className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-4 text-[28px] font-semibold leading-none tracking-tight text-foreground tabular-nums">
              {metric.value}
            </div>

            <div className="mt-2.5 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                  metric.isPositive
                    ? 'bg-success/10 text-success'
                    : 'bg-danger/10 text-danger'
                }`}
              >
                {metric.isPositive ? (
                  <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 stroke-[2.5]" />
                )}
                {metric.change}
              </span>
              <span className="text-[11px] text-text-secondary">{metric.timeframe}</span>
            </div>

            <div className="mt-auto pt-3 border-t border-border/50 text-[12px] text-text-secondary">
              {metric.subtext}
            </div>
          </div>
        );
      })}
    </div>
  );
}
