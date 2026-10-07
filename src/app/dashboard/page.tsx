import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Bell, ChevronDown, ArrowUpRight, BarChart3 } from "lucide-react"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="sticky top-0 flex h-20 shrink-0 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6 z-10">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-2 text-muted-foreground hover:text-foreground" />
            <Separator orientation="vertical" className="h-6 border-border" />
            <div className="flex flex-col">
              <h1 className="text-lg font-bold tracking-tight text-foreground leading-none mb-1">Overview</h1>
              <span className="text-xs text-muted-foreground font-medium">Welcome back, here's what's happening today.</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center px-2.5 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50 shadow-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-violet-600 dark:bg-violet-400 mr-2 animate-pulse" />
              <span className="text-[10px] font-bold tracking-wider uppercase">Test Mode</span>
            </div>
            <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-destructive border-2 border-background" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer p-1 pr-2 rounded-full border border-border bg-card hover:bg-muted transition-colors shadow-sm">
              <div className="h-8 w-8 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold text-xs shadow-inner">
                AC
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Dashboard Highlight */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-6 text-white shadow-xl shadow-blue-600/20 md:col-span-2 lg:col-span-1">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <span className="text-sm font-medium text-white/90">Available Balance</span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <h2 className="text-4xl font-extrabold tracking-tight">$24,580.00</h2>
                    <span className="text-sm text-white/80 uppercase font-medium">USD</span>
                  </div>
                </div>
                <div className="mt-8 flex items-center text-xs font-semibold text-white bg-white/20 w-fit px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm border border-white/10">
                  <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                  +12.8% this month
                </div>
              </div>
            </div>

            {/* Other standard cards */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">$14,200.50</h2>
                </div>
              </div>
              <div className="mt-8 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 w-fit px-3 py-1.5 rounded-full">
                <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                +8.2% from last week
              </div>
            </div>
            
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Active Subscriptions</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">1,248</h2>
                </div>
              </div>
              <div className="mt-8 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 w-fit px-3 py-1.5 rounded-full">
                <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
                +24 new today
              </div>
            </div>
          </div>
          
          <div className="mt-8 rounded-2xl border border-border bg-card shadow-sm h-[400px] w-full flex items-center justify-center">
            <div className="flex flex-col items-center opacity-50">
              <BarChart3 className="h-10 w-10 text-muted-foreground mb-4" />
              <span className="text-sm font-medium text-muted-foreground">Analytics Overview Chart</span>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
