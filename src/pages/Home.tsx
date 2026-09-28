import React from 'react';
    import { Link } from 'react-router-dom';
    import { Navbar } from '../components/Navbar';
    import { Footer } from '../components/Footer';
    import { Terminal, Shield, Cpu, Zap, Lock, Users, ArrowRight, CheckCircle2, Code2, Sparkles } from 'lucide-react';
    import { motion } from 'framer-motion';

    export default function Home() {
      return (
        <div className="min-h-screen bg-black text-white selection:bg-green-500 selection:text-black font-sans">
          <Navbar />

          {/* Hero Section */}
          <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-950/20 via-black to-black">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff000a_1px,transparent_1px),linear-gradient(to_bottom,#00ff000a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center space-y-8"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-green-950/50 border border-green-500/40 font-mono text-xs text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                  STATUS: IN DEVELOPMENT // CLOSED BETA v0.9.4
                </div>

                <h1 className="text-4xl md:text-7xl font-mono font-extrabold tracking-tight uppercase">
                  FRAGMENT CS2 <span className="text-green-500 block mt-2 drop-shadow-[0_0_25px_rgba(34,197,94,0.4)]">| HERO</span>
                </h1>

                <p className="text-gray-400 text-base md:text-lg font-mono max-w-2xl mx-auto leading-relaxed">
                  Next-generation internal software suite engineered for Counter-Strike 2. Currently in active development phase. Secure your spot via <span className="text-green-400 font-bold">Invite Code</span> to participate in exclusive beta testing.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 font-mono">
                  <Link 
                    to="/register" 
                    className="w-full sm:w-auto px-8 py-4 bg-green-500 hover:bg-green-400 text-black font-extrabold rounded flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.8)]"
                  >
                    REGISTER WITH INVITE <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link 
                    to="/features" 
                    className="w-full sm:w-auto px-8 py-4 bg-black hover:bg-green-950/30 text-green-400 border border-green-500/40 rounded flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <Terminal className="w-5 h-5" /> EXPLORE FEATURES
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Notice Banner */}
          <section className="py-12 bg-black border-y border-green-500/20 font-mono">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-black border border-green-500/30 rounded flex items-start gap-4 shadow-[0_0_15px_rgba(34,197,94,0.05)]">
                  <div className="p-3 bg-green-950/40 rounded border border-green-500/30 text-green-400">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm tracking-wide mb-1">INVITE ONLY ACCESS</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">Public registration is locked. Every tester requires a verified invite code distributed by existing members or staff.</p>
                  </div>
                </div>

                <div className="p-6 bg-black border border-green-500/30 rounded flex items-start gap-4 shadow-[0_0_15px_rgba(34,197,94,0.05)]">
                  <div className="p-3 bg-green-950/40 rounded border border-green-500/30 text-green-400">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm tracking-wide mb-1">ACTIVE DEVELOPMENT</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">Constant updates, telemetry testing, and state-of-the-art visual rendering modules built for CS2 sub-tick.</p>
                  </div>
                </div>

                <div className="p-6 bg-black border border-green-500/30 rounded flex items-start gap-4 shadow-[0_0_15px_rgba(34,197,94,0.05)]">
                  <div className="p-3 bg-green-950/40 rounded border border-green-500/30 text-green-400">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm tracking-wide mb-1">COMMUNITY & CHAT</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">Integrated real-time player network allowing testers to communicate, exchange tips, and coordinate feedback.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Feature Highlight Section */}
          <section className="py-24 bg-black font-mono">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                <span className="text-green-500 text-xs tracking-widest uppercase">// MODULE ARCHITECTURE</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase">ENGINEERED FOR PRECISION</h2>
                <p className="text-gray-400 text-sm">Designed with a sleek gamesense-pub inspired aesthetic for absolute focus.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "Aimbot & Resolver", desc: "Advanced prediction algorithms tailored for CS2 sub-tick accuracy and lag compensation." },
                  { title: "Visual ESP Suite", desc: "Customizable box, skeleton, and material chams with zero performance penalty." },
                  { title: "Cloud Synchronization", desc: "Save and load your configurations instantly across sessions with our secure database service." },
                  { title: "Bypass Protection", desc: "Proprietary loader design ensuring maximum discretion during beta testing cycles." },
                  { title: "Player Direct Chat", desc: "Search fellow beta testers by username and communicate securely in private or global channels." },
                  { title: "Subscription Manager", desc: "Real-time tracking of beta access expiration, rank badges, and account telemetry." }
                ].map((feat, i) => (
                  <div key={i} className="p-8 bg-black border border-green-500/20 hover:border-green-500/60 rounded transition-all duration-300 group">
                    <div className="w-10 h-10 rounded bg-green-950/30 border border-green-500/40 flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-bold text-base mb-2 group-hover:text-green-400 transition-colors">// {feat.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Banner */}
          <section className="py-20 bg-gradient-to-b from-black to-green-950/20 border-t border-green-500/20 font-mono">
            <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase">READY TO JOIN THE BETA?</h2>
              <p className="text-gray-400 text-sm max-w-xl mx-auto">
                Acquire an invite code from an active tester and register your account today to access the Fragment CS2 portal and chat network.
              </p>
              <div className="pt-4">
                <Link 
                  to="/register"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-black font-extrabold rounded transition-all duration-300 shadow-[0_0_25px_rgba(34,197,94,0.4)]"
                >
                  CREATE ACCOUNT NOW <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      );
    }