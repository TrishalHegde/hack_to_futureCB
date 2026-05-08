import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShieldAlert, Cpu, Globe, ArrowRight, Zap, Fingerprint } from 'lucide-react';

const Home = () => {
  const [claim, setClaim] = useState('');
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    if (!claim.trim()) return;
    navigate('/analysis', { state: { claim } });
  };

  const stats = [
    { label: 'Analysed Claims', value: '245k+', icon: <Zap size={18} className="text-indigo-400" /> },
    { label: 'Neural Sources', value: '1,280', icon: <Globe size={18} className="text-purple-400" /> },
    { label: 'Response Time', value: '450ms', icon: <Cpu size={18} className="text-slate-400" /> },
  ];

  return (
    <div className="flex flex-col items-center gap-24 py-20 relative">
      {/* Background Orbs */}
      <div className="accent-glow top-0 left-1/4 scale-150" />
      <div className="accent-glow bottom-0 right-1/4 scale-150 bg-purple-500/10" />

      {/* Hero Section */}
      <div className="text-center space-y-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-8 backdrop-blur-sm">
            <Fingerprint size={12} className="text-indigo-400" /> Advanced Verification Protocols
          </div>
          <h1 className="text-7xl md:text-8xl font-bold tracking-tight leading-[1.1] text-white">
            Secure the <span className="text-gradient">Information</span> <br />
            <span className="text-indigo-400">Integrity</span> of VAULTX
          </h1>
          <p className="text-slate-400 text-xl mt-8 max-w-2xl mx-auto font-light leading-relaxed">
            The next generation of misinformation analysis. Leverage neural networks 
            to identify viral anomalies and linguistic manipulation in real-time.
          </p>
        </motion.div>
      </div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="w-full max-w-4xl"
      >
        <div className="glass-card p-10 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                Neural Input Buffer
              </label>
              <div className="flex gap-2">
                {['EN', 'HI', 'TA', 'TE'].map(l => (
                  <span key={l} className="text-[9px] font-mono text-indigo-400/60">{l}</span>
                ))}
              </div>
            </div>
            <textarea
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              placeholder="Paste suspicious data stream for analysis..."
              className="w-full h-48 glass-input text-lg font-light leading-relaxed placeholder:text-slate-600"
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              onClick={handleVerify}
              disabled={!claim.trim()}
              className="btn-glass flex items-center gap-3 px-10 py-4 text-lg active:scale-95 disabled:opacity-30"
            >
              INITIALIZE VERIFICATION
              <ArrowRight size={22} className="text-indigo-300" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + (idx * 0.1) }}
            className="flex flex-col items-center text-center gap-4"
          >
            <div className="w-12 h-12 glass flex items-center justify-center rounded-2xl mb-2">
              {stat.icon}
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-bold text-white tracking-tight">{stat.value}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
