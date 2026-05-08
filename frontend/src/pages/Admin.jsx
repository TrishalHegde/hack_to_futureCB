import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, Users, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const Admin = () => {
  const stats = [
    { label: 'Total Verifications', value: '12,842', change: '+12%', icon: <TrendingUp size={20} className="text-cyber-neon" /> },
    { label: 'Active Users', value: '3,420', change: '+5%', icon: <Users size={20} className="text-cyber-purple" /> },
    { label: 'False Claims Detected', value: '8,231', change: '+18%', icon: <AlertCircle size={20} className="text-cyber-red" /> },
    { label: 'Accuracy Rate', value: '98.4%', change: '+0.2%', icon: <CheckCircle size={20} className="text-cyber-green" /> },
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

  const COLORS = ['#00f3ff', '#bc13fe', '#39ff14', '#ff003c'];

  const recentClaims = [
    { id: 1, text: "Government announces free data for students.", verdict: "False", risk: "HIGH", time: "2m ago" },
    { id: 2, text: "New tax law for UPI transactions above 2000.", verdict: "Mixed", risk: "MEDIUM", time: "15m ago" },
    { id: 3, text: "NASA confirms asteroid heading towards Earth.", verdict: "False", risk: "HIGH", time: "1h ago" },
    { id: 4, text: "Local holiday declared in Maharashtra.", verdict: "True", risk: "LOW", time: "3h ago" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black neon-text-blue tracking-tighter uppercase">Command Center</h1>
          <p className="text-gray-500 text-xs font-bold tracking-widest uppercase mt-1 ml-1">VAULTX Intelligence Dashboard</p>
        </div>
        <div className="flex gap-2 text-[10px] font-mono text-cyber-neon border border-cyber-neon/20 bg-cyber-neon/5 px-3 py-1.5 rounded-lg">
          <Clock size={12} /> LAST_SYNC: 19:15:22_UTC
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
            className="glass-card p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/5 rounded-xl border border-white/10">{stat.icon}</div>
              <span className="text-[10px] text-cyber-green font-bold">{stat.change}</span>
            </div>
            <div className="text-2xl font-black text-white">{stat.value}</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Verification Trends */}
        <div className="lg:col-span-2 glass-card p-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">Misinformation Trends</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="claims" stroke="#00f3ff" fillOpacity={1} fill="url(#colorClaims)" />
                <Area type="monotone" dataKey="false" stroke="#ff003c" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="glass-card p-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">Category Heatmap</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {categoryData.map((entry, i) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="glass-card p-6 overflow-hidden">
        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Live Intelligence Stream</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-4 text-[10px] text-gray-500 uppercase tracking-widest">Claim Details</th>
                <th className="pb-4 text-[10px] text-gray-500 uppercase tracking-widest">Verdict</th>
                <th className="pb-4 text-[10px] text-gray-500 uppercase tracking-widest text-center">Risk</th>
                <th className="pb-4 text-[10px] text-gray-500 uppercase tracking-widest text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentClaims.map((claim) => (
                <tr key={claim.id} className="group hover:bg-white/5 transition-all">
                  <td className="py-4 text-sm font-medium text-gray-300 pr-4">{claim.text}</td>
                  <td className="py-4">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                      claim.verdict === 'False' ? 'text-cyber-red bg-cyber-red/10' : 
                      claim.verdict === 'True' ? 'text-cyber-green bg-cyber-green/10' : 'text-cyber-purple bg-cyber-purple/10'
                    }`}>
                      {claim.verdict}
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    <div className={`w-2 h-2 rounded-full mx-auto ${
                      claim.risk === 'HIGH' ? 'bg-cyber-red shadow-[0_0_8px_#ff003c]' : 
                      claim.risk === 'MEDIUM' ? 'bg-cyber-purple shadow-[0_0_8px_#bc13fe]' : 'bg-cyber-green shadow-[0_0_8px_#39ff14]'
                    }`} />
                  </td>
                  <td className="py-4 text-right text-[10px] font-mono text-gray-500">{claim.time}</td>
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
