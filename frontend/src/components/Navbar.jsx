import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, Search, BarChart3 } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Verify', path: '/', icon: <Search size={18} /> },
    { name: 'Analysis', path: '/analysis', icon: <BarChart3 size={18} /> },
    { name: 'Admin', path: '/admin', icon: <LayoutDashboard size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4">
      <div className="max-w-7xl mx-auto glass px-8 py-4 flex items-center justify-between rounded-2xl">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-indigo-500/10 rounded-xl group-hover:bg-indigo-500/20 transition-all border border-indigo-500/20">
            <Shield className="text-indigo-400" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            VAULTX <span className="text-indigo-400/80 font-medium">SYSTEMS</span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 text-sm font-medium transition-all relative py-1 ${
                location.pathname === item.path ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.icon}
              {item.name}
              {location.pathname === item.path && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="h-4 w-[1px] bg-white/5 mx-2" />
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Encrypted</span>
              <span className="text-[10px] text-indigo-400/80 font-mono">NODE_01</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
