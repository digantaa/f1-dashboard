import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const PERFORMANCE_DATA = [
  { name: 'RBR', qualify: 98, race: 100, reliability: 95 },
  { name: 'FER', qualify: 99, race: 92, reliability: 88 },
  { name: 'MCL', qualify: 95, race: 96, reliability: 94 },
  { name: 'MER', qualify: 90, race: 90, reliability: 98 },
  { name: 'AST', qualify: 85, race: 82, reliability: 90 },
];

export function Analytics() {
  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
           <div className="text-primary font-mono tracking-widest text-sm mb-2 flex items-center gap-2">
             <span className="w-8 h-px bg-primary"></span> DATA CORE
           </div>
           <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">Analytics</h1>
        </div>
      </div>

      <motion.div 
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{type: "spring", stiffness: 300, damping: 25}}
        className="flex-1 min-h-0 flex flex-col gap-6"
      >
         <Card className="glass-panel border-white/10 flex-1 min-h-[400px] flex flex-col pt-6 pb-2">
            <div className="px-6 pb-4">
               <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                 <Activity className="w-4 h-4 text-primary" /> Constructor Performance Matrix
               </h2>
               <p className="text-white/40 text-sm font-mono mt-1">Relative index data based on 2026 telemetry correlation (0-100)</p>
            </div>
            <CardContent className="flex-1 min-h-0 p-6 pt-0">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PERFORMANCE_DATA} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.6)', fontSize: 12}} fontFamily="monospace" />
                    <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} fontFamily="monospace" />
                    <Tooltip 
                      contentStyle={{backgroundColor: 'rgba(0,0,0,0.9)', borderColor: 'rgba(255,255,255,0.1)', color: 'white', fontFamily: 'monospace'}} 
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    />
                    <Legend wrapperStyle={{fontFamily: 'monospace', fontSize: '12px', color: 'rgba(255,255,255,0.6)'}} />
                    <Bar dataKey="qualify" name="Qualifying Pace" fill="#3b82f6" radius={[4,4,0,0]} barSize={30} />
                    <Bar dataKey="race" name="Race Pace" fill="#22c55e" radius={[4,4,0,0]} barSize={30} />
                    <Bar dataKey="reliability" name="Reliability" fill="#f59e0b" radius={[4,4,0,0]} barSize={30} />
                  </BarChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-64">
           {/* Add a couple of smaller info cards */}
           <Card className="glass-panel border-white/10 flex flex-col justify-center items-center text-center p-6">
              <Zap className="w-12 h-12 text-blue-400 mb-4 opacity-50" />
              <div className="text-5xl font-black italic text-white mb-2">354.2 <span className="text-xl text-white/40">KM/H</span></div>
              <div className="text-xs font-mono text-white/50 uppercase tracking-widest">Season Top Speed</div>
           </Card>
           <Card className="glass-panel border-white/10 flex flex-col justify-center items-center text-center p-6">
              <Activity className="w-12 h-12 text-primary mb-4 opacity-50" />
              <div className="text-5xl font-black italic text-white mb-2">1.8 <span className="text-xl text-white/40">SEC</span></div>
              <div className="text-xs font-mono text-white/50 uppercase tracking-widest">Fastest Pit Stop</div>
           </Card>
         </div>
      </motion.div>
    </div>
  );
}
