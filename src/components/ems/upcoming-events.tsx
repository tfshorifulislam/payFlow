'use client';

import * as React from 'react';
import {
  Calendar,
  Cake,
  Sparkles,
  ClipboardCheck,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { UpcomingEvent } from '@/types/ems';
import { Button } from '@/components/ui/button';

interface UpcomingEventsProps {
  events: UpcomingEvent[];
  onActionClick?: (event: UpcomingEvent) => void;
}

export function UpcomingEvents({ events, onActionClick }: UpcomingEventsProps) {
  const [selectedFilter, setSelectedFilter] = React.useState<string>('all');

  const filteredEvents = React.useMemo(() => {
    if (selectedFilter === 'all') return events;
    return events.filter((e) => e.category === selectedFilter);
  }, [events, selectedFilter]);

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-border/50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              Upcoming Events
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
              {events.length} Scheduled
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Key milestones, team syncs, birthdays and reviews
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-surface-muted p-0.5 rounded-lg border border-border/60 self-start sm:self-auto overflow-x-auto max-w-full">
          {[
            { id: 'all', label: 'All' },
            { id: 'meeting', label: 'Meetings' },
            { id: 'birthday', label: 'Birthdays' },
            { id: 'company', label: 'Company' },
            { id: 'review', label: 'Reviews' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md whitespace-nowrap transition-all ${
                selectedFilter === tab.id
                  ? 'bg-surface text-foreground shadow-xs font-semibold'
                  : 'text-text-secondary hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="my-3 space-y-3">
        {filteredEvents.map((evt) => {
          let IconComponent = Calendar;
          let badgeColor = 'bg-info/10 text-info border-info/20';

          if (evt.category === 'birthday') {
            IconComponent = Cake;
            badgeColor = 'bg-accent/10 text-accent border-accent/20';
          } else if (evt.category === 'company') {
            IconComponent = Sparkles;
            badgeColor = 'bg-secondary/10 text-secondary border-secondary/20';
          } else if (evt.category === 'review') {
            IconComponent = ClipboardCheck;
            badgeColor = 'bg-warning/10 text-warning border-warning/20';
          }

          return (
            <div
              key={evt.id}
              className="group p-3 rounded-lg border border-border/70 hover:border-border hover:bg-surface-muted/40 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div className="flex items-start gap-3 min-w-0">
                {/* Date / Icon Box */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-muted border border-border text-foreground font-semibold">
                  <IconComponent className="h-4 w-4 text-text-secondary group-hover:text-primary transition-colors" />
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                      {evt.title}
                    </span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-medium border ${badgeColor}`}>
                      {evt.categoryLabel}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-secondary mt-0.5 line-clamp-1">
                    {evt.description}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-text-secondary">
                    <span className="inline-flex items-center gap-1 font-medium text-foreground">
                      <Clock className="h-3 w-3 text-text-secondary" />
                      {evt.date}
                    </span>
                    {evt.location && <span>&bull; {evt.location}</span>}
                    {evt.attendeesCount && <span>&bull; {evt.attendeesCount} attendees</span>}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {evt.actionLabel && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onActionClick?.(evt)}
                  className="self-start sm:self-center shrink-0 border-border bg-surface hover:bg-surface-muted text-xs font-medium h-8 px-2.5 rounded-md shadow-xs transition-colors"
                >
                  {evt.actionLabel}
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="pt-2.5 border-t border-border/50 flex items-center justify-between text-xs">
        <span className="text-text-secondary text-[11px]">
          Synced with Google Workspace & Slack
        </span>
        <a
          href="#calendar"
          className="text-primary hover:underline text-xs font-medium inline-flex items-center gap-0.5"
        >
          Open HR Calendar
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

