import { motion } from 'motion/react';
import { useF1Store } from '../store/store';
import { Card, CardContent } from '@/components/ui/card';

export function Teams() {
  const teams = [...useF1Store(state => state.teams)].sort((a, b) => b.points - a.points);
  const drivers = useF1Store(state => state.drivers);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto h-full overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
           <div className="text-primary font-mono tracking-widest text-sm mb-2 flex items-center gap-2">
             <span className="w-8 h-px bg-primary"></span> CONSTRUCTORS
           </div>
           <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">Teams</h1>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6 pb-20"
      >
        {teams.map((team, index) => {
          const teamDrivers = team.drivers.map(num => drivers.find(d => d.number === num)).filter(Boolean);
          
          return (
            <motion.div key={team.id} variants={item}>
              <Card className="glass-panel border-white/10 overflow-hidden relative group">
                <div 
                  className="absolute top-0 left-0 bottom-0 w-2 transition-all duration-300 md:w-4 group-hover:w-full group-hover:opacity-10 z-0" 
                  style={{ backgroundColor: team.color }}
                />
                
                <CardContent className="p-6 md:p-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
                  
                  {/* Position & Team Name */}
                  <div className="flex items-center gap-6 md:w-1/3">
                    <div className="text-5xl md:text-7xl font-black italic text-white/20 font-mono tracking-tighter w-16 text-right">
                      {index + 1}
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-white">{team.name}</h2>
                      <div className="text-white/60 font-mono mt-1" style={{ color: team.color }}>{team.logo}</div>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="flex-1 w-full flex justify-between items-center bg-black/40 rounded-xl border border-white/5 p-6 backdrop-blur-md">
                     <div className="space-y-1">
                        <div className="text-xs font-mono uppercase tracking-widest text-white/50">Total Points</div>
                        <div className="text-4xl md:text-5xl font-black font-mono text-white">{team.points} <span className="text-lg text-green-500 block md:inline">PTS</span></div>
                     </div>
                     <div className="w-[150px] h-[60px] hidden lg:block opacity-60">
                        {/* Fake sparkline graph for visual aesthetic */}
                        <svg viewBox="0 0 100 30" className="w-full h-full" preserveAspectRatio="none">
                          <polyline 
                            points="0,30 20,25 40,15 60,10 80,12 100,2" 
                            fill="none" 
                            stroke={team.color} 
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round" 
                          />
                        </svg>
                     </div>
                  </div>

                  {/* Drivers */}
                  <div className="flex gap-4 items-center justify-end md:w-1/3">
                    {teamDrivers.map((driver) => !!driver && (
                       <div key={driver.id} className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 overflow-hidden bg-black/50" style={{ borderColor: team.color }}>
                            <img src={driver.image} alt={driver.name} className="w-full h-full object-cover transform translate-y-2 scale-125" />
                          </div>
                          <div className="text-xs font-mono text-white/80 font-bold uppercase">{driver.name.split(' ')[1]}</div>
                       </div>
                    ))}
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
