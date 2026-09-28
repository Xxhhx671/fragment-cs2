import React from 'react';
    import { Link } from 'react-router-dom';
    import { Terminal, Shield, Cpu, Github, Twitter, Disc as Discord } from 'lucide-react';
    
    export const Footer: React.FC = () => {
      return (
        <footer className="bg-black border-t border-green-500/20 text-gray-400 font-mono py-16">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-black border border-green-500 flex items-center justify-center text-green-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <span className="font-bold tracking-wider text-white">FRAGMENT CS2</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Elite internal software solution engineered for Counter-Strike 2. Currently in closed beta testing phase. Invite code required.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a href="#discord" className="w-8 h-8 rounded border border-green-500/30 flex items-center justify-center text-green-400 hover:bg-green-950/40 hover:border-green-500 transition-all">
                  <Discord className="w-4 h-4" />
                </a>
                <a href="#twitter" className="w-8 h-8 rounded border border-green-500/30 flex items-center justify-center text-green-400 hover:bg-green-950/40 hover:border-green-500 transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#github" className="w-8 h-8 rounded border border-green-500/30 flex items-center justify-center text-green-400 hover:bg-green-950/40 hover:border-green-500 transition-all">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
    
            <div className="space-y-4">
              <h4 className="text-white text-sm font-bold tracking-wider uppercase border-l-2 border-green-500 pl-3">Navigation</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/" className="hover:text-green-400 transition-colors">// Home Portal</Link></li>
                <li><Link to="/features" className="hover:text-green-400 transition-colors">// Core Features</Link></li>
                <li><Link to="/status" className="hover:text-green-400 transition-colors">// System Status</Link></li>
                <li><Link to="/chat" className="hover:text-green-400 transition-colors">// Player Network</Link></li>
              </ul>
            </div>
    
            <div className="space-y-4">
              <h4 className="text-white text-sm font-bold tracking-wider uppercase border-l-2 border-green-500 pl-3">Security & Legal</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#terms" className="hover:text-green-400 transition-colors">// Terms of Service</a></li>
                <li><a href="#privacy" className="hover:text-green-400 transition-colors">// Privacy Protocol</a></li>
                <li><a href="#anticheat" className="hover:text-green-400 transition-colors">// VAC Bypass Info</a></li>
                <li><a href="#support" className="hover:text-green-400 transition-colors">// Support Desk</a></li>
              </ul>
            </div>
    
            <div className="space-y-4">
              <h4 className="text-white text-sm font-bold tracking-wider uppercase border-l-2 border-green-500 pl-3">Server Telemetry</h4>
              <div className="bg-black/80 border border-green-500/20 p-4 rounded text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">STATUS:</span>
                  <span className="text-green-400 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> DEVELOPMENT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">BUILD:</span>
                  <span className="text-white font-mono">v0.9.4-beta</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">NODES:</span>
                  <span className="text-white font-mono">ONLINE [EU/NA]</span>
                </div>
              </div>
            </div>
          </div>
    
          <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-green-500/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
            <p>© 2026 Fragment CS2. All rights reserved. Gamesense aesthetic architecture.</p>
            <p className="mt-4 md:mt-0 text-green-500/60 font-mono">SECURE INVITE SYSTEM ACTIVE</p>
          </div>
        </footer>
      );
    };