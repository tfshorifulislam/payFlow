'use client';

import * as React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TopNavbar } from '@/components/ems/top-navbar';
import { DashboardHeader } from '@/components/ems/dashboard-header';
import { KpiStatsGrid } from '@/components/ems/kpi-stats-grid';
import { EmployeeGrowthChart } from '@/components/ems/employee-growth-chart';
import { AttendanceOverviewChart } from '@/components/ems/attendance-overview-chart';
import { RecentEmployeesTable } from '@/components/ems/recent-employees-table';
import { DepartmentDistribution } from '@/components/ems/department-distribution';
import { UpcomingEvents } from '@/components/ems/upcoming-events';
import { QuickActionsBar } from '@/components/ems/quick-actions-bar';
import { AddEmployeeDialog } from '@/components/ems/add-employee-dialog';
import { ActionModal } from '@/components/ems/action-modal';
import {
  kpiMetricsData,
  growthChartData,
  attendanceData,
  departmentDistributionData,
  recentEmployeesData,
  upcomingEventsData,
  quickActionsData,
} from '@/data/ems-mock-data';
import { Employee, UpcomingEvent } from '@/types/ems';
import { CircleCheck } from 'lucide-react';

export default function DashboardPage() {
  const [employees, setEmployees] = React.useState<Employee[]>(recentEmployeesData);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = React.useState(false);
  const [selectedQuickAction, setSelectedQuickAction] = React.useState<string | null>(null);
  const [isActionModalOpen, setIsActionModalOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddEmployee = (newEmp: Employee) => {
    setEmployees((prev) => [newEmp, ...prev]);
    showToast(`Employee "${newEmp.name}" successfully onboarded to ${newEmp.department}`);
  };

  const handleQuickAction = (actionId: string) => {
    if (actionId === 'add-employee') {
      setIsAddEmployeeOpen(true);
    } else {
      setSelectedQuickAction(actionId);
      setIsActionModalOpen(true);
    }
  };

  const handleEventAction = (event: UpcomingEvent) => {
    showToast(`Opening "${event.title}" details...`);
  };

  const handleViewEmployee = (emp: Employee) => {
    showToast(`Viewing profile for ${emp.name} (${emp.role})`);
  };

  const handleEditEmployee = (emp: Employee) => {
    showToast(`Editing profile for ${emp.name}`);
  };

  return (
    <SidebarProvider>
      {/* 1. SIDEBAR */}
      <AppSidebar />

      {/* Main Content Area */}
      <SidebarInset className="bg-background min-h-screen flex flex-col transition-colors">
        {/* 2. TOP NAVBAR */}
        <TopNavbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onOpenAddEmployee={() => setIsAddEmployeeOpen(true)}
          onOpenQuickAction={handleQuickAction}
        />

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-border bg-surface text-foreground shadow-lg animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
              <CircleCheck className="h-3.5 w-3.5" />
            </div>
            <span className="text-xs font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Main Dashboard Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* 3. DASHBOARD HEADER */}
          <div className="reveal">
            <DashboardHeader
              onAddEmployeeClick={() => setIsAddEmployeeOpen(true)}
              onExportClick={() => handleQuickAction('generate-report')}
            />
          </div>

          {/* 4. KPI STATISTICS */}
          <section aria-label="Workforce key metrics" className="reveal reveal-1">
            <KpiStatsGrid metrics={kpiMetricsData} />
          </section>

          {/* CHARTS ROW: 5. EMPLOYEE OVERVIEW & 6. ATTENDANCE OVERVIEW */}
          <section
            aria-label="Analytics overview"
            className="grid grid-cols-1 lg:grid-cols-12 gap-5 reveal reveal-3"
          >
            {/* 5. EMPLOYEE OVERVIEW (Large Area/Line chart, 7 cols on desktop) */}
            <div className="lg:col-span-7 flex flex-col">
              <EmployeeGrowthChart data={growthChartData} />
            </div>

            {/* 6. ATTENDANCE OVERVIEW (Donut & metrics chart, 5 cols on desktop) */}
            <div id="attendance" className="lg:col-span-5 flex flex-col">
              <AttendanceOverviewChart
                metrics={attendanceData}
                totalEmployees={1248}
              />
            </div>
          </section>

          {/* 7. RECENT EMPLOYEES TABLE */}
          <section
            id="employees"
            aria-label="Recent workforce roster"
            className="reveal reveal-4"
          >
            <RecentEmployeesTable
              employees={employees}
              globalSearchTerm={searchTerm}
              onViewEmployee={handleViewEmployee}
              onEditEmployee={handleEditEmployee}
            />
          </section>

          {/* SECONDARY ROW: 8. DEPARTMENT DISTRIBUTION & 9. UPCOMING EVENTS */}
          <section
            aria-label="Organizational distribution and schedule"
            className="grid grid-cols-1 lg:grid-cols-12 gap-5 reveal reveal-5"
          >
            {/* 8. DEPARTMENT DISTRIBUTION (5 cols on desktop) */}
            <div id="departments" className="lg:col-span-5 flex flex-col">
              <DepartmentDistribution
                departments={departmentDistributionData}
                totalEmployees={1248}
              />
            </div>

            {/* 9. UPCOMING EVENTS (7 cols on desktop) */}
            <div id="calendar" className="lg:col-span-7 flex flex-col">
              <UpcomingEvents
                events={upcomingEventsData}
                onActionClick={handleEventAction}
              />
            </div>
          </section>

          {/* 10. QUICK ACTIONS BAR */}
          <section aria-label="Management quick actions" className="reveal reveal-5">
            <QuickActionsBar
              actions={quickActionsData}
              onSelectAction={handleQuickAction}
            />
          </section>
        </main>

        {/* Footer info */}
        <footer className="border-t border-border/60 py-4 px-6 text-xs text-text-secondary flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">PayFlow EMS</span>
            <span>&bull;</span>
            <span>Enterprise Workforce Platform v2.4</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              All HR systems operational
            </span>
            <span>&bull;</span>
            <a href="#help" className="hover:text-foreground transition-colors">
              Help &amp; Privacy
            </a>
          </div>
        </footer>
      </SidebarInset>

      {/* Interactive Modals */}
      <AddEmployeeDialog
        open={isAddEmployeeOpen}
        onOpenChange={setIsAddEmployeeOpen}
        onAddEmployee={handleAddEmployee}
      />

      <ActionModal
        actionId={selectedQuickAction}
        open={isActionModalOpen}
        onOpenChange={setIsActionModalOpen}
        onConfirm={showToast}
      />
    </SidebarProvider>
  );
}
