'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { GrowthDataPoint } from '@/types/ems';

interface EmployeeGrowthChartProps {
  data: GrowthDataPoint[];
}

export function EmployeeGrowthChart({ data }: EmployeeGrowthChartProps) {
  const [activeMetric, setActiveMetric] = React.useState<'headcount' | 'hires' | 'split'>('headcount');
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(6); // Default to last month (Oct)

  // Chart dimensions inside SVG viewBox
  const width = 720;
  const height = 230;
  const paddingLeft = 50;
  const paddingRight = 30;
  const paddingTop = 25;
  const paddingBottom = 35;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Value bounds based on metric
  const minVal = activeMetric === 'headcount' ? 900 : activeMetric === 'hires' ? 0 : 800;
  const maxVal = activeMetric === 'headcount' ? 1300 : activeMetric === 'hires' ? 70 : 1300;

  // Compute (x, y) coordinates for each point
  const points = React.useMemo(() => {
    return data.map((d, index) => {
      const x = paddingLeft + (index / (data.length - 1)) * chartWidth;
      const val = activeMetric === 'headcount' ? d.headcount : activeMetric === 'hires' ? d.hires : d.headcount;
      const normalized = (val - minVal) / (maxVal - minVal);
      const y = paddingTop + chartHeight - normalized * chartHeight;
      return { x, y, data: d, val };
    });
  }, [data, activeMetric, chartWidth, chartHeight, minVal, maxVal]);

  // Compute smooth bezier curve path
  const pathD = React.useMemo(() => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cx1 = p0.x + (p1.x - p0.x) / 2;
      const cy1 = p0.y;
      const cx2 = p0.x + (p1.x - p0.x) / 2;
      const cy2 = p1.y;
      d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p1.x} ${p1.y}`;
    }
    return d;
  }, [points]);

  // Area path (closed at the bottom)
  const areaD = React.useMemo(() => {
    if (points.length === 0) return '';
    const lastX = points[points.length - 1].x;
    const firstX = points[0].x;
    const baselineY = paddingTop + chartHeight;
    return `${pathD} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;
  }, [pathD, points, paddingTop, chartHeight]);

  const activePoint = hoveredIndex !== null ? points[hoveredIndex] : points[points.length - 1];

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-xs flex flex-col justify-between">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-border/50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              Employee Growth
            </h2>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
              <TrendingUp className="h-3 w-3" />
              +27.3% YoY
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Headcount velocity and hiring distribution over the last 7 months
          </p>
        </div>

        {/* View Segmented Switcher */}
        <div className="flex items-center bg-surface-muted p-0.5 rounded-lg border border-border/60 self-start sm:self-auto">
          <button
            onClick={() => setActiveMetric('headcount')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
              activeMetric === 'headcount'
                ? 'bg-surface text-foreground shadow-xs font-semibold'
                : 'text-text-secondary hover:text-foreground'
            }`}
          >
            Total Headcount
          </button>
          <button
            onClick={() => setActiveMetric('hires')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
              activeMetric === 'hires'
                ? 'bg-surface text-foreground shadow-xs font-semibold'
                : 'text-text-secondary hover:text-foreground'
            }`}
          >
            Monthly Hires
          </button>
          <button
            onClick={() => setActiveMetric('split')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
              activeMetric === 'split'
                ? 'bg-surface text-foreground shadow-xs font-semibold'
                : 'text-text-secondary hover:text-foreground'
            }`}
          >
            Staff Split
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative mt-4 w-full h-[240px] sm:h-[260px]">
        {/* Hover Information Card */}
        {activePoint && (
          <div className="absolute top-1 right-2 z-10 pointer-events-none hidden sm:flex items-center gap-3 bg-surface/95 backdrop-blur-md border border-border px-3 py-1.5 rounded-lg shadow-sm">
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-text-secondary uppercase tracking-wider">
                {activePoint.data.month} 2026
              </span>
              <span className="text-sm font-bold text-foreground font-mono">
                {activePoint.data.headcount.toLocaleString()} employees
              </span>
            </div>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-3 text-[11px]">
              <div>
                <span className="text-text-secondary">Hires: </span>
                <span className="font-semibold text-success">
                  +{activePoint.data.hires}
                </span>
              </div>
              <div>
                <span className="text-text-secondary">Left: </span>
                <span className="font-semibold text-danger">
                  -{activePoint.data.departures}
                </span>
              </div>
              <div>
                <span className="text-text-secondary">FT / Con: </span>
                <span className="font-semibold text-foreground font-mono">
                  {activePoint.data.fullTime}/{activePoint.data.contractors}
                </span>
              </div>
            </div>
          </div>
        )}

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible select-none"
        >
          <defs>
            {/* Primary Brand Gradient for Area Fill */}
            <linearGradient id="growthAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.32" />
              <stop offset="60%" stopColor="var(--color-accent)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.0" />
            </linearGradient>

            {/* Gradient Line Stroke */}
            <linearGradient id="growthLineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="50%" stopColor="var(--color-accent)" />
              <stop offset="100%" stopColor="var(--color-secondary)" />
            </linearGradient>
          </defs>

          {/* Horizontal Gridlines and Y-Axis Labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = paddingTop + chartHeight * ratio;
            const labelVal = Math.round(maxVal - ratio * (maxVal - minVal));
            return (
              <g key={idx}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="var(--color-border)"
                  strokeDasharray="3 3"
                  strokeOpacity="0.7"
                />
                <text
                  x={paddingLeft - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  className="fill-current text-[10px] font-mono text-text-secondary/70"
                >
                  {labelVal}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#growthAreaGradient)" />

          {/* Line Stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#growthLineGradient)"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Vertical Guides and Interactive Data Points */}
          {points.map((pt, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <g
                key={idx}
                className="cursor-pointer transition-opacity"
                onMouseEnter={() => setHoveredIndex(idx)}
              >
                {/* Invisible hover trigger column */}
                <rect
                  x={pt.x - 25}
                  y={paddingTop}
                  width="50"
                  height={chartHeight + 25}
                  fill="transparent"
                />

                {/* Vertical hover indicator line */}
                {isHovered && (
                  <line
                    x1={pt.x}
                    y1={paddingTop}
                    x2={pt.x}
                    y2={paddingTop + chartHeight}
                    stroke="var(--color-primary)"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeOpacity="0.8"
                  />
                )}

                {/* Point outer halo */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : 4}
                  fill="var(--color-surface)"
                  stroke="var(--color-primary)"
                  strokeWidth={isHovered ? 2.5 : 2}
                  className="transition-all duration-150"
                />

                {isHovered && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="9"
                    fill="var(--color-primary)"
                    fillOpacity="0.2"
                  />
                )}

                {/* X Axis Month Label */}
                <text
                  x={pt.x}
                  y={height - 8}
                  textAnchor="middle"
                  className={`text-[11px] font-medium transition-colors ${
                    isHovered
                      ? 'fill-current text-primary font-bold'
                      : 'fill-current text-text-secondary'
                  }`}
                >
                  {pt.data.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Chart Footer Highlights */}
      <div className="mt-4 pt-3 border-t border-border/50 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
        <div className="flex flex-col">
          <span className="text-[11px] text-text-secondary">Average Net Expansion</span>
          <span className="font-semibold text-foreground font-mono">+38.2 / month</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] text-text-secondary">Peak Growth Month</span>
          <span className="font-semibold text-foreground font-mono">September (+64 hires)</span>
        </div>
        <div className="flex flex-col col-span-2 sm:col-span-1">
          <span className="text-[11px] text-text-secondary">Voluntary Retention</span>
          <span className="font-semibold text-success font-mono">96.4%</span>
        </div>
      </div>
    </div>
  );
}

