'use client';

import * as React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DepartmentData } from '@/types/ems';

interface DepartmentDistributionProps {
  departments: DepartmentData[];
  totalEmployees?: number;
}

export function DepartmentDistribution({
  departments,
  totalEmployees = 1248,
}: DepartmentDistributionProps) {
  const [hoveredDept, setHoveredDept] = React.useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/50">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Department Distribution
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Workforce allocation across 6 functional divisions
          </p>
        </div>
        <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-surface-muted border border-border/60 text-text-secondary">
          6 Orgs
        </span>
      </div>

      {/* Stacked Progress Bar */}
      <div className="my-4">
        <div className="flex h-3 w-full rounded-md overflow-hidden bg-surface-muted gap-0.5 p-0.5 border border-border/50">
          {departments.map((dept) => {
            const isHovered = hoveredDept === dept.name;
            return (
              <div
                key={dept.name}
                onMouseEnter={() => setHoveredDept(dept.name)}
                onMouseLeave={() => setHoveredDept(null)}
                style={{
                  width: `${dept.percentage}%`,
                  backgroundColor: dept.color,
                }}
                className={`h-full rounded-xs transition-all duration-200 cursor-pointer ${
                  isHovered ? 'brightness-125 scale-y-110' : 'opacity-90'
                }`}
                title={`${dept.name}: ${dept.count} (${dept.percentage}%)`}
              />
            );
          })}
        </div>
      </div>

      {/* Department Cards / List */}
      <div className="space-y-2.5">
        {departments.map((dept) => {
          const isHovered = hoveredDept === dept.name;
          return (
            <div
              key={dept.name}
              onMouseEnter={() => setHoveredDept(dept.name)}
              onMouseLeave={() => setHoveredDept(null)}
              className={`p-2.5 rounded-lg border transition-all duration-150 ${
                isHovered
                  ? 'border-border bg-surface-muted/70 shadow-xs'
                  : 'border-transparent hover:bg-surface-muted/40'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-sm shrink-0"
                    style={{ backgroundColor: dept.color }}
                  />
                  <span className="text-xs font-semibold text-foreground">
                    {dept.name}
                  </span>
                  <span className="text-[11px] text-text-secondary">
                    Lead: {dept.lead}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {dept.openRoles > 0 && (
                    <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
                      {dept.openRoles} open
                    </span>
                  )}
                  <span className="text-xs font-bold tabular-nums text-foreground">
                    {dept.count}
                  </span>
                  <span className="text-[11px] tabular-nums text-text-secondary w-10 text-right">
                    {dept.percentage}%
                  </span>
                </div>
              </div>

              {/* Progress bar per department */}
              <div className="w-full bg-surface-muted h-1 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${dept.percentage}%`,
                    backgroundColor: dept.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs">
        <span className="text-text-secondary text-[11px]">
          Total Headcount:{' '}
          <b className="text-foreground font-semibold">
            {totalEmployees.toLocaleString('en-US')}
          </b>{' '}
          &bull; Budget: $12.13M
        </span>
        <a
          href="#departments"
          className="text-primary hover:underline text-xs font-medium inline-flex items-center gap-0.5"
        >
          Manage Org Tree
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

