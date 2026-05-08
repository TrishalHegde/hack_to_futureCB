import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShieldAlert, Cpu, Globe, ArrowRight, Zap, Fingerprint, Lock } from 'lucide-react';

const Home = () => {
  const [claim, setClaim] = useState('');
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    if (!claim.trim()) return;
    navigate('/analysis', { state: { claim } });
  };

  const stats = [
    { label: 'Intelligence Logs', value: '245k+', icon: <Lock size={20} className="text-indigo-400" /> },
    { label: 'Trusted Nodes', value: '1,280', icon: <Globe size={20} className="text-pink-400" /> },
    { label: 'Neural Latency', value: '450ms', icon: <Cpu size={20} className="text-blue-400" /> },
  ];

  return (
    <div className="flex flex-col items-center gap-32 py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <div className="text-center space-y-10 max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/5 text-slate-300 text-[10px] font-black tracking-[0.5em] uppercase mb-10 backdrop-blur-xl">
            <Fingerprint size={14} className="text-indigo-400" /> Secure Verification Protocol v2.0
          </div>
          <h1 className="text-8xl md:text-9xl font-bold tracking-tighter leading-[0.95] text-white">
            Information <br />
            <span className="gradient-text">Verification</span>.
          </h1>
          <p className="text-slate-400 text-2xl mt-12 max-w-3xl mx-auto font-light leading-relaxed tracking-tight">
            Protecting the truth in a post-reality world. VAULTX uses advanced neural linguistics 
            to identify viral misinformation with surgical precision.
          </p>
        </motion.div>
      </div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-5xl px-6"
      >
        <div className="glass-card p-12 lg:p-16 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
                NEURAL_INPUT_BUFFER
              </label>
              <div className="flex gap-4">
                {['SECURE', 'ENCRYPTED', 'GLOBAL'].map(l => (
                  <span key={l} className="text-[8px] font-mono text-indigo-400/40 font-bold">{l}</span>
                ))}
              </div>
            </div>
            <textarea
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              placeholder="Input suspicious claim for multi-node cross-reference..."
              className="w-full h-56 glass-input text-xl font-light leading-relaxed placeholder:text-slate-600 border-white/10"
            />
          </div>

          <div className="flex items-center justify-between">
             <div className="flex flex-wrap gap-3">
              {['Social', 'Health', 'Finance', 'Media'].map((lang) => (
                <span key={lang} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[9px] text-slate-500 font-bold tracking-widest uppercase hover:border-indigo-500/30 transition-all">
                  {lang}
                </span>
              ))}
            </div>
            <button
              onClick={handleVerify}
              disabled={!claim.trim()}
              className="btn-primary flex items-center gap-4 text-xl group active:scale-95 disabled:opacity-20"
            >
              INITIALIZE SCAN
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full max-w-6xl px-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + (idx * 0.1) }}
            className="flex flex-col items-center text-center gap-6"
          >
            <div className="w-16 h-16 glass flex items-center justify-center rounded-[2rem] shadow-2xl transition-transform hover:scale-110 duration-500">
              {stat.icon}
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-white tracking-tighter">{stat.value}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-[0.5em] font-black">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
