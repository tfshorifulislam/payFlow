'use client';

import * as React from 'react';
import { Clock, ArrowUpRight } from 'lucide-react';
import { AttendanceMetric } from '@/types/ems';

interface AttendanceOverviewChartProps {
  metrics: AttendanceMetric[];
  totalEmployees?: number;
}

export function AttendanceOverviewChart({
  metrics,
  totalEmployees = 1248,
}: AttendanceOverviewChartProps) {
  const [activeSegment, setActiveSegment] = React.useState<string | null>(null);

  // Radial Donut parameters
  const size = 180;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Compute stroke offsets for the donut segments (pure — no accumulator mutation)
  const segments = React.useMemo(() => {
    return metrics.map((m, index) => {
      const cumulativeBefore = metrics
        .slice(0, index)
        .reduce((sum, prev) => sum + prev.percentage, 0);
      const strokeDasharray = `${(m.percentage / 100) * circumference} ${circumference}`;
      const strokeDashoffset = -((cumulativeBefore / 100) * circumference);
      return {
        ...m,
        strokeDasharray,
        strokeDashoffset,
      };
    });
  }, [metrics, circumference]);

  const presentMetric = metrics.find((m) => m.status === 'Present');

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/50">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Attendance Overview
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Real-time daily presence & check-in activity
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-muted text-[11px] font-medium text-text-secondary border border-border/60">
          <Clock className="h-3 w-3 text-primary" />
          <span>Today &bull; 9:00 AM Shift</span>
        </div>
      </div>

      {/* Donut Chart + Central summary */}
      <div className="my-5 flex flex-col sm:flex-row items-center justify-center gap-6">
        <div className="relative flex items-center justify-center shrink-0">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="-rotate-90 transform select-none"
          >
            {/* Background Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="var(--color-surface-muted)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            {/* Segments */}
            {segments.map((seg) => {
              const isHovered = activeSegment === seg.status;
              return (
                <circle
                  key={seg.status}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={seg.colorVar}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={seg.strokeDasharray}
                  strokeDashoffset={seg.strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setActiveSegment(seg.status)}
                  onMouseLeave={() => setActiveSegment(null)}
                />
              );
            })}
          </svg>

          {/* Center Text inside Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-2xl font-bold tracking-tight text-foreground font-mono">
              {presentMetric ? `${presentMetric.percentage}%` : '—'}
            </span>
            <span className="text-[11px] font-medium text-text-secondary">
              Present Rate
            </span>
            <span className="text-[10px] text-text-secondary/70">
              {(presentMetric?.count ?? 0).toLocaleString('en-US')} /{' '}
              {totalEmployees.toLocaleString('en-US')}
            </span>
          </div>
        </div>

        {/* Legend / Metrics Grid */}
        <div className="flex-1 w-full space-y-2.5">
          {segments.map((item) => {
            const isHovered = activeSegment === item.status;

            return (
              <div
                key={item.status}
                onMouseEnter={() => setActiveSegment(item.status)}
                onMouseLeave={() => setActiveSegment(null)}
                className={`p-2 rounded-lg border transition-all cursor-pointer ${
                  isHovered
                    ? 'border-border bg-surface-muted/80 shadow-xs'
                    : 'border-transparent hover:bg-surface-muted/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: item.colorVar }}
                    />
                    <span className="font-semibold text-foreground">
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground font-mono">
                      {item.count.toLocaleString('en-US')}
                    </span>
                    <span className="text-[11px] text-text-secondary font-mono w-10 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-surface-muted h-1 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.colorVar,
                    }}
                  />
                </div>

                <p className="text-[10px] text-text-secondary/80 mt-1.5">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer info link */}
      <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs">
        <span className="text-text-secondary text-[11px]">
          Target rate: <b className="text-foreground font-medium">&gt;85%</b> &bull; Tracking standard shift
        </span>
        <a
          href="#attendance"
          className="text-primary hover:underline text-xs font-medium inline-flex items-center gap-0.5"
        >
          View Attendance Log
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
