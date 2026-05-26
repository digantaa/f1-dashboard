import { motion } from 'motion/react';
import { useF1Store } from '../store/store';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Flag } from 'lucide-react';

export function Races() {
  const races = useF1Store(state => state.races);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto h-full overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
           <div className="text-primary font-mono tracking-widest text-sm mb-2 flex items-center gap-2">
             <span className="w-8 h-px bg-primary"></span> 2026 CALENDAR
           </div>
           <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">Races</h1>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20"
      >
        {races.map((race) => (
          <motion.div key={race.id} variants={item}>
            <Card className={`glass-panel border-white/10 overflow-hidden relative group transition-all duration-300 ${race.status === 'live' ? 'ring-1 ring-red-500 shadow-[0_0_20px_rgba(220,38,38,0.2)]' : ''}`}>
              {race.status === 'live' && (
                 <div className="absolute top-0 right-0 left-0 h-1 bg-red-600"></div>
              )}
              
              <CardContent className="p-0 flex flex-col sm:flex-row">
                 <div className="p-6 sm:w-1/3 border-b sm:border-b-0 sm:border-r border-white/10 flex flex-col justify-center items-center sm:items-start text-center sm:text-left bg-black/40">
                    <div className="text-xs font-mono text-white/50 mb-1 uppercase tracking-widest">Round {race.round}</div>
                    <div className="text-3xl font-black italic text-white">{new Date(race.date).getDate()}</div>
                    <div className="text-sm font-bold text-white/80 uppercase">{new Date(race.date).toLocaleString('default', { month: 'short' })}</div>
                    {race.status === 'live' && (
                       <div className="mt-4 px-3 py-1 bg-red-600/20 text-red-500 border border-red-500/30 rounded text-[10px] uppercase font-bold tracking-widest animate-pulse w-max">Live Now</div>
                    )}
                 </div>
                 
                 <div className="p-6 flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                       <img src={`https://flagcdn.com/w40/${race.countryCode.toLowerCase()}.png`} width="20" alt="Flag" className="rounded-sm opacity-80" />
                       <h2 className="text-xl font-bold uppercase text-white truncate">{race.name}</h2>
                    </div>
                    <div className="flex items-center gap-2 text-white/40 text-sm font-mono mb-4">
                       <MapPin className="w-3 h-3" /> <span className="truncate">{race.circuit}</span>
                    </div>
                    
                    {race.status === 'completed' && race.winnerId && (
                       <div className="mt-2 text-xs font-mono bg-white/5 inline-flex p-2 rounded items-center gap-3">
                          <span className="text-white/40 uppercase tracking-widest"><Flag className="w-3 h-3 inline mr-1"/> Winner</span>
                          <span className="text-white font-bold tracking-wider">Verstappen</span>
                       </div>
                    )}
                 </div>
                 
                 {/* Decorative Track Map Silhouette (Fake) */}
                 <div className="absolute right-[-20%] bottom-[-20%] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                    <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 50 C 20 20, 80 20, 80 50 C 80 80, 20 80, 20 50 Z" stroke="white" strokeWidth="4"/>
                    </svg>
                 </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
