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
import { Employee } from '@/types/ems';
import { UserPlus } from 'lucide-react';

interface AddEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddEmployee: (employee: Employee) => void;
}

export function AddEmployeeDialog({
  open,
  onOpenChange,
  onAddEmployee,
}: AddEmployeeDialogProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    department: 'Engineering' as Employee['department'],
    role: '',
    status: 'Active' as Employee['status'],
    type: 'Full-time' as Employee['type'],
    location: 'San Francisco, CA',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    const newEmp: Employee = {
      id: `emp-${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      avatarUrl: '',
      department: formData.department,
      role: formData.role.trim() || 'Software Engineer',
      status: formData.status,
      type: formData.type,
      location: formData.location,
      joinedDate: 'Today',
    };

    onAddEmployee(newEmp);
    onOpenChange(false);
    // Reset
    setFormData({
      name: '',
      email: '',
      department: 'Engineering',
      role: '',
      status: 'Active',
      type: 'Full-time',
      location: 'San Francisco, CA',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-xl border-border bg-surface shadow-xl p-5 sm:p-6">
        <DialogHeader className="pb-3 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-white shadow-xs">
              <UserPlus className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold text-foreground">
                Add New Employee
              </DialogTitle>
              <DialogDescription className="text-xs text-text-secondary">
                Onboard a team member to the organizational workforce roster.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-xs font-semibold text-foreground">Full Name</Label>
              <Input
                placeholder="e.g. Alex Morgan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="h-8.5 text-xs rounded-lg border-border bg-surface"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-xs font-semibold text-foreground">Work Email</Label>
              <Input
                type="email"
                placeholder="alex.morgan@payflow.internal"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-8.5 text-xs rounded-lg border-border bg-surface"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">Department</Label>
              <select
                value={formData.department}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    department: e.target.value as Employee['department'],
                  })
                }
                className="w-full h-8.5 text-xs rounded-lg border border-border bg-surface px-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">Role Title</Label>
              <Input
                placeholder="e.g. Senior Frontend Dev"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="h-8.5 text-xs rounded-lg border-border bg-surface"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">Employment Type</Label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as Employee['type'],
                  })
                }
                className="w-full h-8.5 text-xs rounded-lg border border-border bg-surface px-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">Status</Label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as Employee['status'],
                  })
                }
                className="w-full h-8.5 text-xs rounded-lg border border-border bg-surface px-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <DialogFooter className="pt-3 border-t border-border/60 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-xs border-border text-text-secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-gradient-primary hover:opacity-95 text-white text-xs font-medium px-4 shadow-sm"
            >
              Save Employee
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

