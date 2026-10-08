'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

function readTheme(): 'light' | 'dark' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  const theme = React.useSyncExternalStore(subscribe, readTheme, () => 'light');

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleTheme}
            className="text-text-secondary hover:text-foreground hover:bg-surface-muted transition-colors rounded-lg"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          />
        }
      >
        {theme === 'light' ? (
          <Moon className="h-4 w-4 transition-transform hover:-rotate-12" />
        ) : (
          <Sun className="h-4 w-4 transition-transform hover:rotate-45 text-warning" />
        )}
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p className="text-xs">Switch to {theme === 'light' ? 'Dark' : 'Light'} mode</p>
      </TooltipContent>
    </Tooltip>
  );
}
