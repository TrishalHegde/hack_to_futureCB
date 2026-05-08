import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, Users, AlertCircle, CheckCircle, Clock, Activity } from 'lucide-react';

const Admin = () => {
  const stats = [
    { label: 'Total Logs', value: '12,842', change: '+12%', icon: <TrendingUp size={18} className="text-indigo-400" /> },
    { label: 'Neural Nodes', value: '3,420', change: '+5%', icon: <Users size={18} className="text-purple-400" /> },
    { label: 'Anomalies', value: '8,231', change: '+18%', icon: <AlertCircle size={18} className="text-rose-400" /> },
    { label: 'Precision', value: '98.4%', change: '+0.2%', icon: <CheckCircle size={18} className="text-emerald-400" /> },
  ];

  const trendData = [
    { name: 'Mon', claims: 400, false: 240 },
    { name: 'Tue', claims: 300, false: 139 },
    { name: 'Wed', claims: 200, false: 980 },
    { name: 'Thu', claims: 278, false: 390 },
    { name: 'Fri', claims: 189, false: 480 },
    { name: 'Sat', claims: 239, false: 380 },
    { name: 'Sun', claims: 349, false: 430 },
  ];

  const categoryData = [
    { name: 'Health', value: 400 },
    { name: 'Politics', value: 300 },
    { name: 'Finance', value: 300 },
    { name: 'Social', value: 200 },
  ];

  const COLORS = ['rgba(99, 102, 241, 0.5)', 'rgba(168, 85, 247, 0.5)', 'rgba(16, 185, 129, 0.5)', 'rgba(244, 63, 94, 0.5)'];

  const recentClaims = [
    { id: 1, text: "Government announces free data for students.", verdict: "False", risk: "HIGH", time: "2m ago" },
    { id: 2, text: "New tax law for UPI transactions above 2000.", verdict: "Mixed", risk: "MEDIUM", time: "15m ago" },
    { id: 3, text: "NASA confirms asteroid heading towards Earth.", verdict: "False", risk: "HIGH", time: "1h ago" },
    { id: 4, text: "Local holiday declared in Maharashtra.", verdict: "True", risk: "LOW", time: "3h ago" },
  ];

  return (
    <div className="space-y-12 pb-24 relative">
      <div className="accent-glow top-0 right-0 opacity-50" />
      
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-5xl font-bold tracking-tight text-white">Command Center</h1>
          <p className="text-slate-500 text-[10px] font-bold tracking-[0.4em] uppercase ml-1">VAULTX Global Intelligence Dashboard</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 glass rounded-xl border border-white/5">
          <Clock size={14} className="text-indigo-400/60" />
          <span className="text-[10px] font-mono text-slate-400 font-bold tracking-widest uppercase">SYNC_OK // 19:15:22_UTC</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 glass flex items-center justify-center rounded-xl transition-colors group-hover:border-white/20">{stat.icon}</div>
              <span className="text-[10px] text-emerald-400/80 font-bold bg-emerald-400/10 px-2 py-0.5 rounded-full">{stat.change}</span>
            </div>
            <div className="text-3xl font-bold text-white tracking-tight">{stat.value}</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-2">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Verification Trends */}
        <div className="lg:col-span-2 glass-card p-10">
          <div className="flex items-center justify-between mb-10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
              <TrendingUp size={14} className="text-indigo-400" /> Neural Anomaly Trends
            </h4>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-indigo-400/60">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Total Logs
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-rose-400/60">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Anomalies
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={9} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={9} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="claims" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorClaims)" />
                <Area type="monotone" dataKey="false" stroke="#f43f5e" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="glass-card p-10">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-10 flex items-center gap-2">
            <Activity size={14} className="text-indigo-400" /> Subject Clusters
          </h4>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {categoryData.map((entry, i) => (
              <div key={entry.name} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="glass-card p-10 overflow-hidden">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-10 flex items-center gap-2">
          <Activity size={14} className="text-indigo-400" /> Neural Feed Output
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-6 text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Encrypted Claim Data</th>
                <th className="pb-6 text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">AI Verdict</th>
                <th className="pb-6 text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold text-center">Threat Level</th>
                <th className="pb-6 text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold text-right">Node Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentClaims.map((claim) => (
                <tr key={claim.id} className="group hover:bg-white/[0.02] transition-all">
                  <td className="py-6 text-sm font-light text-slate-300 pr-8">{claim.text}</td>
                  <td className="py-6">
                    <span className={`text-[9px] font-bold uppercase px-3 py-1 rounded-full border ${
                      claim.verdict === 'False' ? 'text-rose-400 border-rose-400/20 bg-rose-400/5' : 
                      claim.verdict === 'True' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' : 'text-purple-400 border-purple-400/20 bg-purple-400/5'
                    }`}>
                      {claim.verdict}
                    </span>
                  </td>
                  <td className="py-6 text-center">
                    <div className="flex justify-center">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        claim.risk === 'HIGH' ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]' : 
                        claim.risk === 'MEDIUM' ? 'bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]' : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]'
                      }`} />
                    </div>
                  </td>
                  <td className="py-6 text-right text-[10px] font-mono text-slate-500 uppercase tracking-widest">{claim.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
