import React from 'react';
    import { Link } from 'react-router-dom';
    import { Terminal, ArrowLeft } from 'lucide-react';
    import { Navbar } from '../components/Navbar';
    import { Footer } from '../components/Footer';

    export default function NotFound() {
      return (
        <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between selection:bg-green-500 selection:text-black">
          <Navbar />

          <div className="flex-1 flex items-center justify-center px-6 pt-32 pb-20 font-mono text-center">
            <div className="max-w-md space-y-6">
              <div className="w-16 h-16 mx-auto rounded bg-black border border-green-500 flex items-center justify-center text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <Terminal className="w-8 h-8 animate-pulse" />
              </div>
              <h1 className="text-4xl font-extrabold text-white">404 // NOT FOUND</h1>
              <p className="text-xs text-gray-400">The requested sector or endpoint does not exist on the Fragment CS2 network.</p>
              <div>
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded text-xs transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                >
                  <ArrowLeft className="w-4 h-4" /> RETURN TO HOME
                </Link>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      );
    }