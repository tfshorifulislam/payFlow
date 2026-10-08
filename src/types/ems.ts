export type EmployeeStatus = 'Active' | 'On Leave' | 'Inactive';

export interface Employee {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  department: 'Engineering' | 'Design' | 'Marketing' | 'HR' | 'Finance' | 'Sales';
  role: string;
  status: EmployeeStatus;
  joinedDate: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Part-time';
}

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
  subtext: string;
  secondaryMetric?: string;
  iconName: 'users' | 'user-check' | 'calendar-off' | 'briefcase';
}

export interface GrowthDataPoint {
  month: string;
  headcount: number;
  hires: number;
  departures: number;
  fullTime: number;
  contractors: number;
}

export interface AttendanceMetric {
  status: 'Present' | 'Absent' | 'Late' | 'On Leave';
  count: number;
  percentage: number;
  colorVar: string;
  badgeTone: string;
  description: string;
}

export interface DepartmentData {
  name: string;
  count: number;
  percentage: number;
  lead: string;
  openRoles: number;
  budgetAllocated: string;
  accentClass: string;
  color: string;
}

export type EventCategory = 'meeting' | 'birthday' | 'company' | 'review';

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  category: EventCategory;
  categoryLabel: string;
  description: string;
  attendeesCount?: number;
  personName?: string;
  personAvatar?: string;
  location?: string;
  actionLabel?: string;
}

export interface QuickActionItem {
  id: string;
  label: string;
  description: string;
  iconName: 'user-plus' | 'building' | 'clock-check' | 'receipt' | 'file-spreadsheet';
  category: string;
  shortcut?: string;
}

