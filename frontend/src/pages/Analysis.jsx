import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, ShieldAlert, ShieldQuestion, 
  Search, Cpu, Share2, History, AlertTriangle, 
  ExternalLink, CheckCircle2, XCircle, BarChart3, Zap
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const Analysis = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const claim = location.state?.claim || "Drinking boiled garlic water cures COVID-19 immediately.";

  const loadingSteps = [
    "Preprocessing claim data...",
    "Detecting language & context...",
    "Scanning global fact-check databases...",
    "Matching semantic similarity against trusted news...",
    "Analyzing linguistic manipulation patterns...",
    "Gathering social media spread evidence..."
  ];

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= loadingSteps.length - 1) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 500);
            return prev;
          }
          return prev + 1;
        });
      }, 800);
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
      { source: "WHO Official Site", type: "Health Organization", snippet: "No evidence suggests garlic cures COVID-19.", match: 98, status: "contradicts" },
      { source: "FactCheck.org", type: "Fact Checker", snippet: "Viral social media post regarding garlic water is unfounded.", match: 92, status: "contradicts" },
      { source: "BBC Health", type: "Trusted News", snippet: "Home remedies vs medical evidence.", match: 85, status: "unverified" }
    ],
    timeline: [
      { date: "May 1", platform: "WhatsApp", action: "Initial Viral Spread" },
      { date: "May 2", platform: "Telegram", action: "Peak Engagement" },
      { date: "May 3", platform: "Twitter/X", action: "Fact-checked by community" }
    ]
  };

  const scoreData = [
    { name: 'Credibility', value: mockResult.credibility_score },
    { name: 'Risk', value: 100 - mockResult.credibility_score }
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 rounded-full border-2 border-cyber-neon/20 animate-pulse" />
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-t-2 border-r-2 border-cyber-neon shadow-neon-blue" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Cpu className="text-cyber-neon animate-bounce" size={48} />
          </div>
          <div className="scanner-line" />
        </div>
        
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-black neon-text-blue uppercase tracking-tighter">AI Verification Engine Active</h2>
          <div className="flex flex-col items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-gray-400 font-mono text-sm"
              >
                {loadingSteps[currentStep]}
              </motion.p>
            </AnimatePresence>
            <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-cyber-neon shadow-neon-blue"
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
      className="space-y-8 pb-20"
    >
      {/* Header Info */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="glass-card p-6 flex-1 w-full">
          <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">
            <Search size={12} /> Claim Analyzed
          </div>
          <p className="text-xl font-medium leading-relaxed italic text-gray-200">
            "{claim}"
          </p>
        </div>

        <div className={`glass-card p-6 min-w-[300px] border-l-4 ${mockResult.risk_level === 'HIGH' ? 'border-l-cyber-red' : 'border-l-cyber-green'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Intelligence Verdict</span>
            {mockResult.risk_level === 'HIGH' ? <ShieldAlert className="text-cyber-red" size={20} /> : <ShieldCheck className="text-cyber-green" size={20} />}
          </div>
          <h3 className={`text-4xl font-black ${mockResult.risk_level === 'HIGH' ? 'text-cyber-red' : 'text-cyber-green'}`}>
            {mockResult.verdict}
          </h3>
          <div className="mt-4 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Confidence</div>
              <div className="text-xl font-black text-white">{mockResult.confidence}%</div>
            </div>
            <div className="space-y-1 text-right">
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Risk Level</div>
              <div className={`text-xl font-black ${mockResult.risk_level === 'HIGH' ? 'text-cyber-red' : 'text-cyber-green'}`}>{mockResult.risk_level}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Analysis Metrics */}
        <div className="space-y-8">
          <div className="glass-card p-6 h-full">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
              <BarChart3 size={14} className="text-cyber-neon" /> Credibility Metrics
            </h4>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scoreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#00f3ff" />
                    <Cell fill="rgba(255, 255, 255, 0.05)" />
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-4xl font-black text-white">{mockResult.credibility_score}</div>
                <div className="text-[10px] text-gray-500 uppercase font-bold">Score</div>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              {Object.entries(mockResult.linguistic).map(([key, val]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-gray-400">{key}</span>
                    <span className={val > 70 ? 'text-cyber-red' : 'text-cyber-green'}>{val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${val > 70 ? 'bg-cyber-red' : 'bg-cyber-neon'}`}
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Evidence Matching */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
              <ShieldCheck size={14} className="text-cyber-neon" /> Evidence Intelligence
            </h4>
            
            <div className="space-y-4">
              {mockResult.evidence.map((ev, i) => (
                <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl flex gap-4 hover:border-white/20 transition-all">
                  <div className="mt-1">
                    {ev.status === 'contradicts' ? <XCircle className="text-cyber-red" size={20} /> : <CheckCircle2 className="text-cyber-green" size={20} />}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{ev.source}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500 uppercase">{ev.type}</span>
                      </div>
                      <div className="flex items-center gap-1 text-cyber-neon text-[10px] font-mono">
                        <Zap size={10} /> {ev.match}% Match
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed italic">
                      "{ev.snippet}"
                    </p>
                    <button className="flex items-center gap-1 text-[10px] text-cyber-neon hover:underline">
                      View Original Source <ExternalLink size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
              <History size={14} className="text-cyber-neon" /> Attribution Timeline
            </h4>
            
            <div className="relative space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
              {mockResult.timeline.map((item, i) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-cyber-bg border-2 border-cyber-neon flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyber-neon animate-pulse" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-cyber-neon">{item.date}</span>
                    <span className="text-sm font-bold text-white">{item.platform}</span>
                    <span className="text-xs text-gray-500">{item.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analysis;
