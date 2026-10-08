'use client';

import * as React from 'react';
import {
  MoreHorizontal,
  Mail,
  ExternalLink,
  Edit2,
  UserCheck,
  UserX,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { Employee, EmployeeStatus } from '@/types/ems';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface RecentEmployeesTableProps {
  employees: Employee[];
  onViewEmployee?: (emp: Employee) => void;
  onEditEmployee?: (emp: Employee) => void;
  globalSearchTerm?: string;
}

export function RecentEmployeesTable({
  employees,
  onViewEmployee,
  onEditEmployee,
  globalSearchTerm = '',
}: RecentEmployeesTableProps) {
  const [statusFilter, setStatusFilter] = React.useState<'All' | EmployeeStatus>('All');
  const [selectedDept, setSelectedDept] = React.useState<string>('All');
  const [localSearch, setLocalSearch] = React.useState<string>('');

  // Combined search term
  const effectiveSearch = localSearch || globalSearchTerm;

  // Filtered employees
  const filteredEmployees = React.useMemo(() => {
    return employees.filter((emp) => {
      // Status filter
      if (statusFilter !== 'All' && emp.status !== statusFilter) return false;
      // Department filter
      if (selectedDept !== 'All' && emp.department !== selectedDept) return false;
      // Search term
      if (effectiveSearch.trim() !== '') {
        const query = effectiveSearch.toLowerCase();
        const matchesName = emp.name.toLowerCase().includes(query);
        const matchesEmail = emp.email.toLowerCase().includes(query);
        const matchesRole = emp.role.toLowerCase().includes(query);
        const matchesDept = emp.department.toLowerCase().includes(query);
        return matchesName || matchesEmail || matchesRole || matchesDept;
      }
      return true;
    });
  }, [employees, statusFilter, selectedDept, effectiveSearch]);

  const departments = ['All', 'Engineering', 'Design', 'Marketing', 'HR', 'Finance', 'Sales'];

  return (
    <div className="rounded-xl border border-border bg-surface shadow-xs overflow-hidden">
      {/* Table Header & Controls */}
      <div className="p-4 sm:p-5 border-b border-border/60 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              Recent Employees
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-muted text-text-secondary border border-border">
              {filteredEmployees.length} of {employees.length}
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Manage, review and verify recently onboarded workforce members
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Segmented Tabs */}
          <div className="flex items-center bg-surface-muted p-0.5 rounded-lg border border-border/60">
            {(['All', 'Active', 'On Leave', 'Inactive'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  statusFilter === status
                    ? 'bg-surface text-foreground shadow-xs font-semibold'
                    : 'text-text-secondary hover:text-foreground'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Department Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="h-8 text-xs font-medium rounded-lg border border-border bg-surface pl-2.5 pr-7 text-foreground focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d === 'All' ? 'All Departments' : d}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-secondary" />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-border/50 bg-surface-muted/50 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-5">Employee</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Joined</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50 font-normal">
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-text-secondary">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <ShieldAlert className="h-6 w-6 text-text-secondary/60" />
                    <span className="text-xs font-medium">No employees match your filter criteria</span>
                    <button
                      onClick={() => {
                        setStatusFilter('All');
                        setSelectedDept('All');
                        setLocalSearch('');
                      }}
                      className="text-xs text-primary hover:underline font-semibold"
                    >
                      Clear all filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => {
                const statusChipClass =
                  emp.status === 'Active'
                    ? 'chip-success'
                    : emp.status === 'On Leave'
                      ? 'chip-info'
                      : 'chip-neutral';

                return (
                  <tr
                    key={emp.id}
                    className="hover:bg-surface-muted/40 transition-colors group"
                  >
                    {/* Employee Identity */}
                    <td className="py-3 px-4 sm:px-5">
                      <div className="flex items-center gap-3">
                        <div className="relative h-8 w-8 shrink-0">
                          <span className="avatar-brand h-8 w-8 text-[10px]">
                            {emp.name
                              .split(' ')
                              .map((part) => part[0])
                              .slice(0, 2)
                              .join('')}
                          </span>
                          {emp.avatarUrl && (
                            // eslint-disable-next-line @next/next/no-img-element -- remote avatars with local initials fallback
                            <img
                              src={emp.avatarUrl}
                              alt=""
                              loading="lazy"
                              className="absolute inset-0 h-8 w-8 rounded-full object-cover ring-1 ring-border"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                            {emp.name}
                          </span>
                          <span className="text-[11px] text-text-secondary truncate">
                            {emp.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-3 px-4">
                      <span className="text-xs font-medium text-text-secondary">
                        {emp.department}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{emp.role}</span>
                        <span className="text-[10px] text-text-secondary">{emp.type}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`chip ${statusChipClass}`}>{emp.status}</span>
                    </td>

                    {/* Joined Date */}
                    <td className="py-3 px-4 text-text-secondary tabular-nums text-[12px] whitespace-nowrap">
                      {emp.joinedDate}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => onViewEmployee?.(emp)}
                          className="text-text-secondary hover:text-foreground rounded"
                          title="View profile"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon-xs"
                                className="text-text-secondary hover:text-foreground rounded"
                                title="More options"
                              />
                            }
                          >
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-44 rounded-lg border-border bg-surface shadow-md py-1"
                          >
                            <DropdownMenuLabel className="text-[10px] uppercase font-semibold text-text-secondary px-2.5 py-1">
                              Employee Action
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => onViewEmployee?.(emp)}
                              className="text-xs cursor-pointer py-1.5 px-2.5"
                            >
                              <UserCheck className="mr-2 h-3.5 w-3.5 text-text-secondary" />
                              <span>View Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onEditEmployee?.(emp)}
                              className="text-xs cursor-pointer py-1.5 px-2.5"
                            >
                              <Edit2 className="mr-2 h-3.5 w-3.5 text-text-secondary" />
                              <span>Edit Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => window.open(`mailto:${emp.email}`)}
                              className="text-xs cursor-pointer py-1.5 px-2.5"
                            >
                              <Mail className="mr-2 h-3.5 w-3.5 text-text-secondary" />
                              <span>Send Email</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-border" />
                            <DropdownMenuItem
                              className="text-xs cursor-pointer py-1.5 px-2.5 text-danger focus:bg-danger/10 focus:text-danger"
                            >
                              <UserX className="mr-2 h-3.5 w-3.5" />
                              <span>Deactivate Member</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination & Summary Footer */}
      <div className="p-3 sm:px-5 border-t border-border/50 bg-surface-muted/30 flex items-center justify-between text-xs text-text-secondary">
        <span>
          Showing <b className="text-foreground font-semibold">{filteredEmployees.length}</b> of 1,248 total employees
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-xs"
            disabled
            className="border-border bg-surface text-text-secondary rounded"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <span className="px-2 text-[11px] text-foreground font-medium tabular-nums">Page 1 of 156</span>
          <Button
            variant="outline"
            size="icon-xs"
            className="border-border bg-surface hover:bg-surface-muted text-foreground rounded"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

