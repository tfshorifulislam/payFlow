'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleCheck, Building2, Clock, Banknote, FileSpreadsheet } from 'lucide-react';

interface ActionModalProps {
  actionId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (message: string) => void;
}

export function ActionModal({
  actionId,
  open,
  onOpenChange,
  onConfirm,
}: ActionModalProps) {
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  if (!actionId) return null;

  let title = 'Action';
  let desc = '';
  let IconComp = Building2;

  if (actionId === 'create-dept') {
    title = 'Create New Department';
    desc = 'Add a functional department unit, assign a director lead, and allocate annual operating budget.';
    IconComp = Building2;
  } else if (actionId === 'mark-attendance') {
    title = 'Batch Mark Attendance';
    desc = 'Log shift overrides, approve remote check-ins, or reconcile biometric badge entries.';
    IconComp = Clock;
  } else if (actionId === 'create-payroll') {
    title = 'Initiate Monthly Payroll';
    desc = 'Prepare October 2026 payroll run across 1,248 active employees and review tax deductions.';
    IconComp = Banknote;
  } else if (actionId === 'generate-report') {
    title = 'Export Workforce Analytics Report';
    desc = 'Generate an executive PDF/CSV audit of headcount growth, departmental budgets, and leave ratios.';
    IconComp = FileSpreadsheet;
  }

  const handleExecute = () => {
    let msg = 'Action executed successfully';
    if (actionId === 'create-dept') msg = 'Department created successfully';
    if (actionId === 'mark-attendance') msg = 'Shift attendance updated for 1,248 records';
    if (actionId === 'create-payroll') msg = 'Payroll preview batch generated for October 2026';
    if (actionId === 'generate-report') msg = 'Workforce Report downloaded (CSV)';

    setSuccessMsg(msg);
    setTimeout(() => {
      setSuccessMsg(null);
      onConfirm(msg);
      onOpenChange(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-xl border-border bg-surface shadow-xl p-5 sm:p-6">
        <DialogHeader className="pb-3 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <IconComp className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold text-foreground">
                {title}
              </DialogTitle>
              <DialogDescription className="text-xs text-text-secondary">
                {desc}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {successMsg ? (
          <div className="py-8 flex flex-col items-center justify-center text-center gap-2">
            <div className="h-10 w-10 rounded-full bg-success/10 text-success flex items-center justify-center">
              <CircleCheck className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold text-foreground">{successMsg}</p>
          </div>
        ) : (
          <div className="space-y-3.5 py-3 text-xs">
            {actionId === 'create-dept' && (
              <>
                <div className="space-y-1">
                  <Label className="text-xs font-semibold text-foreground">Department Name</Label>
                  <Input placeholder="e.g. Artificial Intelligence Labs" className="h-8 text-xs rounded-lg" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-semibold text-foreground">Department Lead / Director</Label>
                  <Input placeholder="e.g. Dr. Jennifer Wu" className="h-8 text-xs rounded-lg" />
                </div>
              </>
            )}

            {actionId === 'mark-attendance' && (
              <div className="space-y-2">
                <p className="text-text-secondary">
                  Shift: <span className="font-semibold text-foreground">Main HQ &bull; Morning Shift (9:00 AM - 5:30 PM)</span>
                </p>
                <div className="p-3 rounded-lg bg-surface-muted border border-border/60 space-y-1">
                  <div className="flex justify-between">
                    <span>Present checked-in:</span>
                    <span className="font-bold tabular-nums">1,087</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Late arrivals:</span>
                    <span className="font-bold tabular-nums text-warning">84</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unreported:</span>
                    <span className="font-bold tabular-nums text-danger">35</span>
                  </div>
                </div>
              </div>
            )}

            {actionId === 'create-payroll' && (
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-surface-muted border border-border/60 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Payroll Period:</span>
                    <span className="font-semibold">October 1 - October 31, 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Total Net Payout:</span>
                    <span className="font-bold tabular-nums text-success">$2,418,920.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Employees to Process:</span>
                    <span className="font-mono font-semibold">1,248</span>
                  </div>
                </div>
              </div>
            )}

            {actionId === 'generate-report' && (
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-foreground">Report Format</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" className="p-2.5 rounded-lg border border-primary bg-primary/5 text-xs font-medium text-left">
                    <span className="font-semibold block text-primary">Executive Summary</span>
                    <span className="text-[10px] text-text-secondary">PDF (12 pages)</span>
                  </button>
                  <button type="button" className="p-2.5 rounded-lg border border-border bg-surface text-xs font-medium text-left hover:bg-surface-muted">
                    <span className="font-semibold block text-foreground">Raw Data Sheet</span>
                    <span className="text-[10px] text-text-secondary">CSV / Excel</span>
                  </button>
                </div>
              </div>
            )}

            <DialogFooter className="pt-3 border-t border-border/60 gap-2 sm:gap-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="text-xs border-border text-text-secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={handleExecute}
                size="sm"
                className="bg-gradient-primary hover:opacity-95 text-white text-xs font-medium px-4 shadow-sm"
              >
                Confirm &amp; Proceed
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

