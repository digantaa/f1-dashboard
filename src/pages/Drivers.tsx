import { motion } from 'motion/react';
import { useF1Store } from '../store/store';
import { Trophy, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function Drivers() {
  const drivers = useF1Store(state => state.drivers);
  const teams = useF1Store(state => state.teams);

  // Sort drivers based on points
  const sortedDrivers = [...drivers].sort((a, b) => b.points - a.points);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto h-full overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
           <div className="text-primary font-mono tracking-widest text-sm mb-2 flex items-center gap-2">
             <span className="w-8 h-px bg-primary"></span> 2026 SEASON
           </div>
           <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">Drivers</h1>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20"
      >
        {sortedDrivers.map((driver, index) => {
          const team = teams.find(t => t.id === driver.team);
          return (
            <motion.div key={driver.id} variants={item}>
              <Card className="glass-panel border-white/10 overflow-hidden relative group h-full">
                {/* Team Color Accent Bar */}
                <div 
                  className="absolute top-0 left-0 w-full h-1" 
                  style={{ backgroundColor: team?.color || 'transparent' }}
                />
                
                <CardContent className="p-0">
                   <div className="flex items-center justify-between p-6 pb-2">
                      <div className="text-5xl font-black italic text-white/10 group-hover:text-white/20 transition-colors pointer-events-none">
                        {driver.number}
                      </div>
                      <div className="text-right">
                         <div className="text-white/60 text-sm font-mono tracking-wider">{driver.name.split(' ')[0]}</div>
                         <div className="text-2xl font-bold text-white uppercase tracking-tight">{driver.name.split(' ')[1]}</div>
                      </div>
                   </div>
                   
                   <div className="px-6 py-2 flex justify-end">
                      <div className="text-xs font-mono uppercase tracking-widest text-white/50" style={{ color: team?.color }}>
                        {team?.name}
                      </div>
                   </div>

                   <div className="relative h-64 mt-4 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center">
                      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity flex items-center justify-center p-8">
                         <div className="text-8xl font-black italic text-white transform -rotate-12 translate-y-12 truncate max-w-full">
                           {team?.logo}
                         </div>
                      </div>
                      <motion.img 
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        src={driver.image} 
                        alt={driver.name} 
                        className="h-[120%] object-cover object-top relative z-10 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" 
                      />
                      
                      <div className="absolute bottom-0 inset-x-0 p-4 flex justify-between items-end z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
                         <div className="space-y-1">
                            <div className="text-xs font-mono text-white/50 uppercase">Points</div>
                            <div className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                              {driver.points} <span className="text-green-500 text-xs">PTS</span>
                            </div>
                         </div>
                         <div className="flex gap-4">
                            <div className="text-center">
                               <div className="text-[10px] font-mono text-white/50 uppercase"><Trophy className="w-3 h-3 mx-auto mb-1 text-yellow-500"/> Wins</div>
                               <div className="text-white font-bold font-mono">{driver.wins}</div>
                            </div>
                            <div className="text-center">
                               <div className="text-[10px] font-mono text-white/50 uppercase"><Award className="w-3 h-3 mx-auto mb-1 text-gray-400"/> Podiums</div>
                               <div className="text-white font-bold font-mono">{driver.podiums}</div>
                            </div>
                         </div>
                      </div>
                   </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  );
}
