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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        // Icon selection
        let IconComponent = Users;
        if (metric.iconName === 'user-check') IconComponent = UserCheck;
        else if (metric.iconName === 'calendar-off') IconComponent = CalendarOff;
        else if (metric.iconName === 'briefcase') IconComponent = Briefcase;

        // Sparkline mini data simulation for visual indicator
        const isLeave = metric.id === 'on-leave';
        const isPresent = metric.id === 'present-today';

        return (
          <div
            key={metric.id}
            className="group relative rounded-xl border border-border bg-surface p-4 sm:p-5 shadow-xs hover:border-border/80 hover:shadow-card transition-all duration-200 flex flex-col justify-between"
          >
            {/* Top row: Icon and Change badge */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted border border-border/60 text-text-secondary group-hover:text-primary group-hover:border-primary/30 transition-colors">
                  <IconComponent className="h-4.5 w-4.5 transition-transform group-hover:scale-105" />
                </div>
                <span className="text-xs font-medium text-text-secondary">
                  {metric.label}
                </span>
              </div>

              {/* Percentage / Change indicator */}
              <div
                className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[11px] font-semibold tracking-tight ${
                  metric.isPositive
                    ? 'bg-success/10 text-success border border-success/20'
                    : 'bg-danger/10 text-danger border border-danger/20'
                }`}
              >
                {metric.isPositive ? (
                  <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 stroke-[2.5]" />
                )}
                <span>{metric.change}</span>
              </div>
            </div>

            {/* Middle row: Large number and primary value */}
            <div className="mt-3.5 flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-mono">
                  {metric.value}
                </span>
              </div>

              {/* Small visual indicator: Mini sparkline or rate bar */}
              <div className="w-16 h-6 flex items-center justify-end">
                {isPresent ? (
                  // Circular or miniature progress meter for attendance
                  <div className="w-full bg-surface-muted rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-success rounded-full"
                      style={{ width: '87.1%' }}
                    />
                  </div>
                ) : (
                  // SVG Mini Sparkline
                  <svg className="w-14 h-5 overflow-visible" viewBox="0 0 56 20" fill="none">
                    {metric.isPositive ? (
                      <>
                        <path
                          d="M1 16 L12 13 L24 15 L36 9 L48 6 L55 2"
                          stroke={isLeave ? 'var(--color-danger)' : 'var(--color-primary)'}
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="55"
                          cy="2"
                          r="2"
                          fill={isLeave ? 'var(--color-danger)' : 'var(--color-primary)'}
                        />
                      </>
                    ) : (
                      <>
                        <path
                          d="M1 4 L14 7 L26 5 L38 11 L48 13 L55 17"
                          stroke="var(--color-danger)"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="55" cy="17" r="2" fill="var(--color-danger)" />
                      </>
                    )}
                  </svg>
                )}
              </div>
            </div>

            {/* Bottom row: Subtext context */}
            <div className="mt-2.5 pt-2.5 border-t border-border/50 flex items-center justify-between text-[11px] text-text-secondary">
              <span className="truncate">{metric.subtext}</span>
              <span className="text-[10px] uppercase tracking-wider text-text-secondary/70 shrink-0 font-medium">
                {metric.timeframe}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

