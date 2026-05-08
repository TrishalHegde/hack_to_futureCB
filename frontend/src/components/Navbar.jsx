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
      <div className="max-w-7xl mx-auto glass px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-cyber-neon/10 rounded-lg group-hover:bg-cyber-neon/20 transition-all border border-cyber-neon/20 shadow-neon-blue">
            <Shield className="text-cyber-neon" size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter neon-text-blue">
            VAULTX <span className="text-gray-400 font-light">SYSTEMS</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 text-sm font-medium transition-all hover:text-cyber-neon ${
                location.pathname === item.path ? 'text-cyber-neon' : 'text-gray-400'
              }`}
            >
              {item.icon}
              {item.name}
              {location.pathname === item.path && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyber-neon shadow-neon-blue" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Status</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
              <span className="text-[10px] text-cyber-green font-mono">SYSTEM_ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
