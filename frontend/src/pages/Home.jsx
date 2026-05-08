import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShieldAlert, Cpu, Globe, ArrowRight, Zap } from 'lucide-react';

const Home = () => {
  const [claim, setClaim] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    if (!claim.trim()) return;
    // For now, just navigate to analysis page with mock data
    navigate('/analysis', { state: { claim } });
  };

  const stats = [
    { label: 'Claims Verified', value: '245k+', icon: <Zap size={20} className="text-cyber-neon" /> },
    { label: 'Sources Tracked', value: '1.2k', icon: <Globe size={20} className="text-cyber-purple" /> },
    { label: 'Avg Latency', value: '450ms', icon: <Cpu size={20} className="text-cyber-green" /> },
  ];

  const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Marathi'];

  return (
    <div className="flex flex-col items-center gap-16 py-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-neon/30 bg-cyber-neon/10 text-cyber-neon text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
            <ShieldAlert size={12} /> Powered by OSINT Intelligence
          </span>
          <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-none">
            Expose the <span className="neon-text-blue italic">Hidden</span> <br />
            Truth with <span className="neon-text-purple">VAULTX</span>
          </h1>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto font-light leading-relaxed">
            A state-of-the-art misinformation verification engine. Analyze viral claims, 
            social messages, and media evidence with 99% semantic accuracy.
          </p>
        </motion.div>
      </div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-3xl relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-cyber-neon to-cyber-purple rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        
        <form onSubmit={handleVerify} className="relative glass p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
              Analyze Suspicious Claim
            </label>
            <textarea
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              placeholder="Paste message, viral post, or claim here..."
              className="w-full h-40 cyber-input resize-none text-lg"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {languages.map((lang) => (
                <span key={lang} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-500 font-medium hover:border-cyber-neon/30 hover:text-gray-300 cursor-default transition-all">
                  {lang}
                </span>
              ))}
            </div>

            <button
              type="submit"
              disabled={!claim.trim()}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="btn-primary group flex items-center gap-3 w-full md:w-auto"
            >
              VERIFY CLAIM
              <ArrowRight className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} size={20} />
            </button>
          </div>
        </form>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (idx * 0.1) }}
            className="glass-card p-6 flex flex-col items-center text-center gap-4"
          >
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/20">
              {stat.icon}
            </div>
            <div>
              <div className="text-3xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Background decoration */}
      <div className="fixed top-1/2 left-0 w-full h-[1px] bg-white/5 -z-20 pointer-events-none" />
      <div className="fixed top-0 left-1/2 w-[1px] h-full bg-white/5 -z-20 pointer-events-none" />
    </div>
  );
};

export default Home;
