import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Trophy, Calendar, Activity, Timer, Settings, UserCircle, Search, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useF1Store } from '@/src/store/store';

const NAV_ITEMS = [
  { path: '/', label: 'Overview', icon: LayoutDashboard },
  { path: '/live', label: 'Live Timing', icon: Timer },
  { path: '/drivers', label: 'Drivers', icon: Users },
  { path: '/teams', label: 'Teams', icon: Trophy },
  { path: '/races', label: 'Calendar', icon: Calendar },
  { path: '/analytics', label: 'Analytics', icon: Activity },
];

export function AppLayout() {
  const location = useLocation();
  const currentRace = useF1Store(state => state.currentRace);

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">
      {/* Sidebar */}
      <aside className="w-64 flex-col hidden md:flex border-r border-white/10 bg-black/40 backdrop-blur-3xl z-40 relative">
        <div className="p-6 pb-2">
          <Link to="/" className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] italic tracking-tighter">
              F1
            </div>
            <span className="font-semibold text-xl tracking-wider uppercase text-white/90">Control Core</span>
          </Link>
          <div className="mt-8 flex items-center justify-between text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
            <span>Menu</span>
            <span className="text-primary/70">Sys.2026</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-300 relative group overflow-hidden",
                  isActive 
                    ? "text-white bg-white/5" 
                    : "text-white/50 hover:text-white/90 hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-red-600 rounded-r shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={cn("w-5 h-5", isActive ? "text-red-500" : "group-hover:text-red-400/70 transition-colors")} />
                <span className="font-medium">{item.label}</span>
                {item.path === '/live' && currentRace && (
                  <span className="ml-auto flex items-center">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-white/10 text-white/50 flex space-x-2">
           <Link to="/settings" className="p-2 hover:bg-white/5 hover:text-white rounded transition-colors flex-1 flex justify-center">
              <Settings className="w-5 h-5" />
           </Link>
           <button className="p-2 hover:bg-white/5 hover:text-white rounded transition-colors">
              <UserCircle className="w-5 h-5" />
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-black/20 backdrop-blur-md z-30 sticky top-0">
          <div className="flex items-center flex-1">
             <div className="relative group w-full max-w-sm hidden sm:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search telemetry, driver, or team..." 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm text-white/90 placeholder:text-white/40 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all font-mono"
                />
             </div>
          </div>
          
          <div className="flex items-center gap-4">
             {currentRace && (
                <div className="hidden lg:flex items-center gap-2 bg-red-600/10 border border-red-600/30 px-3 py-1 rounded-full text-xs font-mono text-red-500 tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  LIVE: {currentRace.name}
                </div>
             )}
             <button className="relative p-2 text-white/60 hover:text-white transition-colors">
               <Bell className="w-5 h-5" />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
             </button>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
