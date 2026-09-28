import React from 'react';
    import { Navbar } from '../components/Navbar';
    import { Footer } from '../components/Footer';
    import { Terminal, Shield, CheckCircle2, AlertTriangle, Cpu } from 'lucide-react';

    export default function Status() {
      return (
        <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between selection:bg-green-500 selection:text-black">
          <Navbar />

          <div className="flex-1 max-w-5xl mx-auto px-6 pt-32 pb-20 w-full font-mono">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-green-500 text-xs tracking-widest uppercase">// TELEMETRY & NODES</span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white uppercase">SYSTEM STATUS</h1>
              <p className="text-gray-400 text-sm">Real-time operational status of Fragment CS2 beta servers and loader nodes.</p>
            </div>

            <div className="space-y-6">
              {[
                { name: "Fragment Loader API", status: "OPERATIONAL", uptime: "99.98%", latency: "14ms" },
                { name: "Database & Sync Server", status: "OPERATIONAL", uptime: "100.0%", latency: "8ms" },
                { name: "CS2 Internal Core (Beta v0.9.4)", status: "TESTING", uptime: "98.50%", latency: "19ms" },
                { name: "Player Chat & Direct Messaging", status: "OPERATIONAL", uptime: "99.95%", latency: "11ms" }
              ].map((node, i) => (
                <div key={i} className="p-6 bg-black border border-green-500/30 rounded flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_0_15px_rgba(34,197,94,0.05)]">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <div>
                      <h3 className="text-white font-bold text-sm">// {node.name}</h3>
                      <p className="text-xs text-gray-400">Uptime: {node.uptime} | Response: {node.latency}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded bg-green-950/40 border border-green-500/40 text-green-400 text-xs font-bold">
                    {node.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-green-950/20 border border-green-500/30 rounded text-xs text-gray-300 leading-relaxed">
              <strong className="text-green-400">NOTICE:</strong> During major Counter-Strike 2 game updates, software status may temporarily switch to <span className="text-yellow-400">UPDATING</span> while our developers verify signature integrity against VAC. Check our player chat for real-time announcements.
            </div>
          </div>

          <Footer />
        </div>
      );
    }