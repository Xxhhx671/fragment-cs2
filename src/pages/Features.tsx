import React from 'react';
    import { Navbar } from '../components/Navbar';
    import { Footer } from '../components/Footer';
    import { Terminal, Shield, Cpu, Zap, Eye, Crosshair, RefreshCw, CheckCircle2 } from 'lucide-react';
    import { Link } from 'react-router-dom';

    export default function Features() {
      return (
        <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between selection:bg-green-500 selection:text-black">
          <Navbar />

          <div className="flex-1 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full font-mono">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-green-500 text-xs tracking-widest uppercase">// MODULE SPECIFICATIONS</span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white uppercase">FRAGMENT CS2 FEATURES</h1>
              <p className="text-gray-400 text-sm">Explore our comprehensive feature suite engineered specifically for Counter-Strike 2 sub-tick architecture.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {[
                {
                  icon: <Crosshair className="w-6 h-6 text-green-400" />,
                  title: "Aimbot & Recoil Control",
                  desc: "Precision targeting module with customizable FOV, smooth curves, hitbox priority, and intelligent RCS designed for sub-tick weapon spray compensation."
                },
                {
                  icon: <Eye className="w-6 h-6 text-green-400" />,
                  title: "Visual ESP Suite",
                  desc: "High-performance DirectX 12 overlay featuring 2D/3D bounding boxes, skeleton renderers, health bars, weapon icons, and distance indicators."
                },
                {
                  icon: <RefreshCw className="w-6 h-6 text-green-400" />,
                  title: "Advanced Resolver",
                  desc: "Proprietary prediction algorithms and angle correction telemetry to ensure flawless hit registration across all competitive servers."
                },
                {
                  icon: <Shield className="w-6 h-6 text-green-400" />,
                  title: "Loader & Bypass Security",
                  desc: "Polymorphic encrypted loader architecture providing absolute discretion and reliability during closed beta testing phases."
                }
              ].map((f, i) => (
                <div key={i} className="p-8 bg-black border border-green-500/30 rounded space-y-4 shadow-[0_0_20px_rgba(34,197,94,0.05)]">
                  <div className="w-12 h-12 rounded bg-green-950/40 border border-green-500/40 flex items-center justify-center">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">// {f.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center bg-black border border-green-500/30 rounded p-12 space-y-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase">READY TO TEST FRAGMENT?</h2>
              <p className="text-xs text-gray-400 max-w-xl mx-auto">Get your invite code and register your account to access the downloader and player network chat.</p>
              <div>
                <Link 
                  to="/register"
                  className="inline-block px-8 py-4 bg-green-500 hover:bg-green-400 text-black font-extrabold rounded text-xs transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                >
                  REGISTER WITH INVITE CODE
                </Link>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      );
    }