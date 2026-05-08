import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, Search, BarChart3, Radio } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Verify', path: '/', icon: <Search size={16} /> },
    { name: 'Analysis', path: '/analysis', icon: <BarChart3 size={16} /> },
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={16} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-6">
      <div className="max-w-7xl mx-auto glass px-10 py-5 flex items-center justify-between rounded-[2.5rem]">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2.5 bg-indigo-500/10 rounded-2xl group-hover:bg-indigo-500/20 transition-all border border-indigo-500/20">
            <Shield className="text-indigo-400" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-white leading-none">
              VAULTX
            </span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-indigo-400/60 font-bold mt-1">Intelligence</span>
          </div>
        </Link>

        <div className="flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] transition-all relative py-1 ${
                location.pathname === item.path ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.icon}
              {item.name}
              {location.pathname === item.path && (
                <div className="absolute -bottom-2 left-0 w-full h-[3px] bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <div className="h-6 w-[1px] bg-white/10" />
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Encrypted Node</span>
              <span className="text-[10px] text-indigo-400/80 font-mono font-bold tracking-tighter">SECURE_ACTIVE_001</span>
            </div>
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping opacity-40" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
