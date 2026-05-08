import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, ShieldAlert, ShieldQuestion, 
  Search, Cpu, Share2, History, AlertTriangle, 
  ExternalLink, CheckCircle2, XCircle, BarChart3, Zap
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Analysis = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const claim = location.state?.claim || "Drinking boiled garlic water cures COVID-19 immediately.";

  const loadingSteps = [
    "Initializing neural pathways...",
    "Scanning global metadata...",
    "Analyzing linguistic nuances...",
    "Cross-referencing verified nodes...",
    "Synthesizing final intelligence..."
  ];

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= loadingSteps.length - 1) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 800);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const mockResult = {
    verdict: "Likely False",
    confidence: 94,
    risk_level: "HIGH",
    credibility_score: 28,
    language: "English",
    linguistic: {
      urgency: 85,
      fear: 70,
      manipulation: 90
    },
    evidence: [
      { source: "WHO Official", type: "Official", snippet: "No evidence suggests garlic cures COVID-19.", match: 98, status: "contradicts" },
      { source: "FactCheck", type: "Verified", snippet: "Viral social media post regarding garlic water is unfounded.", match: 92, status: "contradicts" },
      { source: "BBC Health", type: "News", snippet: "Home remedies vs medical evidence.", match: 85, status: "unverified" }
    ],
    timeline: [
      { date: "May 1", platform: "WhatsApp", action: "Infiltration" },
      { date: "May 2", platform: "Telegram", action: "Peak Engagement" },
      { date: "May 3", platform: "Twitter/X", action: "Neutralization" }
    ]
  };

  const scoreData = [
    { name: 'Credibility', value: mockResult.credibility_score },
    { name: 'Risk', value: 100 - mockResult.credibility_score }
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-12">
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 rounded-full border border-white/5 animate-pulse" />
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border-t border-indigo-500/40" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Cpu className="text-indigo-400/50" size={40} />
          </div>
          <div className="scanner-line !bg-indigo-500/20" />
        </div>
        
        <div className="text-center space-y-6">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-[0.4em]">Neural Analysis in Progress</h2>
          <div className="flex flex-col items-center gap-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-slate-400 font-light text-lg"
              >
                {loadingSteps[currentStep]}
              </motion.p>
            </AnimatePresence>
            <div className="w-64 h-0.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-500/50"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12 pb-24"
    >
      {/* Header Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-card p-10 lg:col-span-2">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
            <Search size={12} /> Claim Analyzed
          </div>
          <p className="text-3xl font-light leading-tight text-white italic">
            "{claim}"
          </p>
        </div>

        <div className={`glass-card p-10 flex flex-col justify-between border-t-4 ${mockResult.risk_level === 'HIGH' ? 'border-t-red-500/40' : 'border-t-emerald-500/40'}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 text-center">Final Verdict</span>
            {mockResult.risk_level === 'HIGH' ? <ShieldAlert className="text-red-400" size={24} /> : <ShieldCheck className="text-emerald-400" size={24} />}
          </div>
          <h3 className={`text-4xl font-bold mt-4 ${mockResult.risk_level === 'HIGH' ? 'text-red-400' : 'text-emerald-400'}`}>
            {mockResult.verdict}
          </h3>
          <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
            <div>
              <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Confidence</div>
              <div className="text-xl font-bold text-white">{mockResult.confidence}%</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Risk Factor</div>
              <div className={`text-xl font-bold ${mockResult.risk_level === 'HIGH' ? 'text-red-400' : 'text-emerald-400'}`}>{mockResult.risk_level}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analysis Metrics */}
        <div className="glass-card p-8">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-10 flex items-center gap-2">
            <BarChart3 size={14} className="text-indigo-400" /> Credibility Metrics
          </h4>
          
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scoreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill="rgba(99, 102, 241, 0.4)" />
                  <Cell fill="rgba(255, 255, 255, 0.02)" />
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-5xl font-bold text-white">{mockResult.credibility_score}</div>
              <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mt-1">Global Score</div>
            </div>
          </div>

          <div className="space-y-6 mt-10">
            {Object.entries(mockResult.linguistic).map(([key, val]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
                  <span className="text-slate-400">{key}</span>
                  <span className={val > 70 ? 'text-red-400' : 'text-emerald-400'}>{val}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${val}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full ${val > 70 ? 'bg-red-400/50' : 'bg-indigo-400/50'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence Matching */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-8 flex items-center gap-2">
              <ShieldCheck size={14} className="text-indigo-400" /> Intelligence Nodes
            </h4>
            
            <div className="space-y-4">
              {mockResult.evidence.map((ev, i) => (
                <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex gap-6 hover:bg-white/[0.04] transition-all group">
                  <div className="mt-1">
                    {ev.status === 'contradicts' ? <XCircle className="text-red-400/60" size={24} /> : <CheckCircle2 className="text-emerald-400/60" size={24} />}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-medium text-white">{ev.source}</span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-slate-500 font-bold uppercase tracking-widest">{ev.type}</span>
                      </div>
                      <div className="text-indigo-400/60 text-[10px] font-mono font-bold">
                        MATCH://{ev.match}%
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed font-light italic">
                      "{ev.snippet}"
                    </p>
                    <button className="flex items-center gap-2 text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors uppercase font-bold tracking-widest">
                      Trace Source <ExternalLink size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-10 flex items-center gap-2">
              <History size={14} className="text-indigo-400" /> Dissemination Path
            </h4>
            
            <div className="flex items-center justify-between px-4">
              {mockResult.timeline.map((item, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-indigo-400 shadow-xl group-hover:border-indigo-500/50 transition-all">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-mono text-indigo-400/60">{item.date}</div>
                      <div className="text-xs font-bold text-white uppercase mt-0.5">{item.platform}</div>
                      <div className="text-[9px] text-slate-500 font-medium italic">{item.action}</div>
                    </div>
                  </div>
                  {i < mockResult.timeline.length - 1 && (
                    <div className="flex-1 h-[1px] bg-white/5 mx-4 mb-12" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analysis;
