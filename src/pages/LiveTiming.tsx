import { motion } from 'motion/react';
import { useF1Store } from '../store/store';
import { Card, CardContent } from '@/components/ui/card';
import { Timer, AlertTriangle, Radio } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { TELEMETRY_DATA } from '../lib/mockData';

export function LiveTiming() {
  const { drivers, currentRace } = useF1Store();
  const activeDrivers = [...drivers].sort((a,b) => b.points - a.points); // using points to sort for mock
  
  if (!currentRace) return <div className="p-10 text-white font-mono">NO LIVE SESSION</div>;

  return (
    <div className="p-4 md:p-6 space-y-6 h-full flex flex-col gap-4">
      {/* HUD Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass-panel border border-white/10 p-4 rounded-xl">
         <div className="flex items-center gap-4">
            <div className="bg-red-600 animate-pulse w-3 h-3 rounded-full shadow-[0_0_10px_red]"></div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">Live Timing</h1>
            <div className="text-white/60 font-mono text-sm border-l border-white/20 pl-4">
               {currentRace.name} • LAP <span className="text-white font-bold">42</span>/78
            </div>
         </div>
         <div className="flex gap-4">
            <div className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-3 py-1 rounded flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-widest">
               <AlertTriangle className="w-3 h-3" /> Sector 2 Yellow
            </div>
            <div className="bg-white/5 border border-white/10 px-3 py-1 rounded flex items-center gap-2 font-mono text-xs text-white uppercase tracking-widest">
               <Radio className="w-3 h-3 text-red-500" /> Radio
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Timing Tower */}
        <div className="xl:col-span-1 glass-panel border-white/10 rounded-xl flex flex-col h-full overflow-hidden">
           <div className="p-3 border-b border-white/10 bg-black/40 flex text-[10px] uppercase font-mono tracking-widest text-white/50">
             <div className="w-8 text-center text-red-500">POS</div>
             <div className="w-10">NO</div>
             <div className="flex-1">NAME</div>
             <div className="w-24 text-right">GAP</div>
             <div className="w-20 text-right">INT</div>
           </div>
           <div className="overflow-y-auto flex-1 font-mono text-sm p-2 space-y-1">
             {activeDrivers.map((d, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  key={d.id} 
                  className="flex items-center p-2 rounded bg-white/5 hover:bg-white/10 border left-0 border-transparent hover:border-white/10 transition-colors cursor-default group"
                >
                  <div className="w-8 text-center font-bold text-white/70">{i + 1}</div>
                  <div className="w-10 font-black italic text-white/40">{d.number}</div>
                  <div className="flex-1 font-bold text-white tracking-widest truncate">{d.name.split(' ')[1].toUpperCase()}</div>
                  <div className="w-24 text-right text-white/70">{i === 0 ? 'Leader' : `+${(i * 1.5 + Math.random()).toFixed(3)}`}</div>
                  <div className="w-20 text-right text-yellow-500">{i === 0 ? '-' : `+${(1.5 + Math.random()).toFixed(3)}`}</div>
                </motion.div>
             ))}
           </div>
        </div>

        {/* Telemetry and Track Map */}
        <div className="xl:col-span-2 space-y-6 flex flex-col min-h-0">
           {/* Telemetry Chart */}
           <div className="glass-panel border-white/10 rounded-xl p-4 flex-1 flex flex-col min-h-[300px]">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-white/60 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                    <Timer className="w-4 h-4" /> Live Sector Speed (km/h)
                 </h3>
                 <div className="flex gap-4 font-mono text-[10px]">
                    <span className="text-green-500 font-bold uppercase tracking-wider">Verstappen</span>
                    <span className="text-blue-500 font-bold uppercase tracking-wider">Leclerc</span>
                 </div>
              </div>
              <div className="flex-1 w-full min-h-0">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={TELEMETRY_DATA} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="2 2" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="time" hide />
                      <YAxis stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 10}} domain={['minData - 10', 'maxData + 10']} />
                      <Tooltip contentStyle={{backgroundColor: 'rgba(0,0,0,0.9)', borderColor: 'rgba(255,255,255,0.1)'}} />
                      <Line type="monotone" dataKey="verstappenSpeed" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
                      <Line type="monotone" dataKey="leclercSpeed" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
           </div>
           
           {/* Mini Cards Grid */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["LAP TIME", "SECTOR 1", "SECTOR 2", "SECTOR 3"].map((lbl, i) => (
                 <div key={lbl} className="glass-panel border-white/10 rounded-xl p-4 flex flex-col text-center justify-center">
                    <div className="text-[10px] text-white/40 font-mono tracking-widest mb-2">{lbl}</div>
                    <div className="text-xl md:text-2xl font-mono font-bold text-white">
                      {i === 0 ? "1:15.820" : i === 1 ? "27.4" : i === 2 ? "29.1" : "19.3"}
                    </div>
                    {i === 1 && <div className="text-[9px] text-fuchsia-500 font-mono mt-1 uppercase tracking-widest animate-pulse">Personal Best</div>}
                    {i === 2 && <div className="text-[9px] text-yellow-500 font-mono mt-1 uppercase tracking-widest">Yellow Flag</div>}
                    {i === 3 && <div className="text-[9px] text-white/30 font-mono mt-1 uppercase tracking-widest">+0.2s</div>}
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}
