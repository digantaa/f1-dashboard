import { motion } from 'motion/react';
import { useF1Store } from '../store/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, Clock, Flag, Activity, Navigation, ChevronsUp, Flame } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TELEMETRY_DATA } from '../lib/mockData';

export function Dashboard() {
  const { drivers, currentRace } = useF1Store();
  const topDrivers = [...drivers].sort((a, b) => b.points - a.points).slice(0, 3);

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Hero Header */}
      <section className="relative rounded-2xl overflow-hidden bg-black border border-white/10 p-8 md:p-12 min-h-[300px] flex items-center shadow-2xl glass-panel">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/f_auto/q_auto/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Monaco_Circuit)'}}></div>
        <div className="absolute right-0 top-0 bottom-0 w-2/3 bg-gradient-to-l from-transparent via-black/80 to-black z-10 hidden md:block"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10"></div>
        
        <div className="relative z-20 max-w-2xl text-left space-y-4">
          <motion.div initial={{opacity: 0, x:-20}} animate={{opacity: 1, x:0}} transition={{delay: 0.1}}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/20 text-red-500 rounded-full border border-red-500/30 text-sm font-mono uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Round 8
            </div>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase neon-text-red">
              {currentRace?.name || "Next Grand Prix"}
            </h1>
            <p className="text-white/60 font-mono text-lg mt-2 flex items-center gap-2">
              <Navigation className="w-4 h-4" /> {currentRace?.circuit}
            </p>
          </motion.div>
          
          <motion.div initial={{opacity: 0, y:20}} animate={{opacity: 1, y:0}} transition={{delay: 0.3}} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="border border-white/10 rounded-lg p-3 bg-white/5 backdrop-blur-sm">
              <div className="text-white/40 text-xs font-mono uppercase">Pole</div>
              <div className="text-white font-bold text-lg">{drivers.find(d => d.id === currentRace?.poleId)?.name.split(' ')[1] || 'TBD'}</div>
            </div>
            <div className="border border-white/10 rounded-lg p-3 bg-white/5 backdrop-blur-sm">
              <div className="text-white/40 text-xs font-mono uppercase">Laps</div>
              <div className="text-white font-bold text-lg">78</div>
            </div>
            <div className="border border-white/10 rounded-lg p-3 bg-white/5 backdrop-blur-sm col-span-2">
              <div className="text-white/40 text-xs font-mono uppercase">Time to Lights</div>
              <div className="text-primary font-bold text-lg font-mono tracking-wider flex items-center gap-2">
                02:14:59:00 <Clock className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Stats Overview */}
        <section className="space-y-6 md:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Live Speed Telemetry</h2>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1 text-primary"><Flame className="w-3 h-3"/> Verstappen</span>
              <span className="flex items-center gap-1 text-blue-500"><Flame className="w-3 h-3"/> Leclerc</span>
              <span className="flex items-center gap-1 text-orange-500"><Flame className="w-3 h-3"/> Norris</span>
            </div>
          </div>
          
          <Card className="glass-panel border-white/10 overflow-hidden h-[300px]">
            <CardContent className="p-0 h-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={TELEMETRY_DATA} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorVerstappen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorLeclerc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorNorris" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 10}} fontFamily="monospace" domain={['auto', 'auto']} />
                    <Tooltip 
                      contentStyle={{backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: 'white', borderRadius: '8px', fontFamily: 'monospace'}}
                      itemStyle={{color: 'white'}}
                    />
                    <Area type="monotone" dataKey="verstappenSpeed" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorVerstappen)" />
                    <Area type="monotone" dataKey="leclercSpeed" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLeclerc)" />
                    <Area type="monotone" dataKey="norrisSpeed" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorNorris)" />
                  </AreaChart>
               </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Championship Card */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" /> WDC Standings
            </h2>
          </div>
          <Card className="glass-panel border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Trophy className="w-48 h-48" />
             </div>
             <CardContent className="p-6 relative z-10 space-y-4">
               {topDrivers.map((driver, idx) => (
                 <div key={driver.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                       <span className="font-mono text-xl text-white/40 font-bold w-4">{idx + 1}</span>
                       <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden relative">
                         <img src={driver.image} alt={driver.name} className="w-full h-full object-cover translate-y-1" />
                       </div>
                       <div>
                         <h3 className="text-white font-bold tracking-wide group-hover:text-primary transition-colors">{driver.name.split(' ')[1]}</h3>
                         <p className="text-white/50 text-xs font-mono">{driver.name.split(' ')[0]}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <div className="text-white font-mono font-bold text-lg">{driver.points}</div>
                       <div className="text-green-500 text-xs flex items-center gap-1 justify-end"><ChevronsUp className="w-3 h-3" /> PTS</div>
                    </div>
                 </div>
               ))}
               <div className="pt-4 border-t border-white/10">
                 <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-md text-sm text-white/70 uppercase tracking-widest transition-colors font-mono font-bold">
                   Full Standings
                 </button>
               </div>
             </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
