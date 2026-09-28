import React, { useEffect, useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Navbar } from '../components/Navbar';
    import { Footer } from '../components/Footer';
    import { Disc, Award, Clock, Sparkles, Terminal, Shield } from 'lucide-react';
    import { DB, UserProfile } from '../components/DatabaseService';
    import { toast } from 'react-toastify';
    import { format, differenceInHours } from 'date-fns';

    const PRIZES = [
      { name: 'NO DROP', probability: 50, hours: 0, color: 'text-gray-400' },
      { name: '1 HOURS SUB', probability: 25, hours: 1, color: 'text-green-400' },
      { name: '2H SUB', probability: 15, hours: 2, color: 'text-green-300' },
      { name: '1D SUB', probability: 8, hours: 24, color: 'text-emerald-400' },
      { name: 'MONTH SUB', probability: 2, hours: 720, color: 'text-yellow-400' },
    ];

    export default function Wheel() {
      const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
      const [spinning, setSpinning] = useState(false);
      const [lastResult, setLastResult] = useState<string | null>(null);
      const [timeLeftHours, setTimeLeftHours] = useState<number>(0);
      const navigate = useNavigate();

      useEffect(() => {
        const session = localStorage.getItem('fragment_user');
        if (!session) {
          navigate('/login');
          return;
        }
        try {
          const parsed = JSON.parse(session);
          const latest = DB.findUserByName(parsed.name) || parsed;
          setCurrentUser(latest);
          checkCooldown(latest);
        } catch {
          navigate('/login');
        }
      }, [navigate]);

      const checkCooldown = (user: UserProfile) => {
        if (!user.lastSpinTime) {
          setTimeLeftHours(0);
          return;
        }
        const lastSpin = new Date(user.lastSpinTime).getTime();
        const now = new Date().getTime();
        const diffHours = (now - lastSpin) / (1000 * 60 * 60);
        if (diffHours < 48) {
          setTimeLeftHours(Math.ceil(48 - diffHours));
        } else {
          setTimeLeftHours(0);
        }
      };

      if (!currentUser) return null;

      const handleSpin = () => {
        if (timeLeftHours > 0) {
          toast.error(`You can spin the Wheel of Fortune again in ${timeLeftHours} hours (every 48 hours).`);
          return;
        }

        setSpinning(true);
        setLastResult(null);

        setTimeout(() => {
          // Roll based on probabilities summing to 100
          const rand = Math.random() * 100;
          let cumulative = 0;
          let selectedPrize = PRIZES[0];

          for (const prize of PRIZES) {
            cumulative += prize.probability;
            if (rand <= cumulative) {
              selectedPrize = prize;
              break;
            }
          }

          const nowISO = new Date().toISOString();
          currentUser.lastSpinTime = nowISO;

          if (selectedPrize.hours > 0) {
            const currentExpiry = new Date(currentUser.subscriptionExpires);
            const baseDate = currentExpiry > new Date() ? currentExpiry : new Date();
            const newExpiry = new Date(baseDate.getTime() + selectedPrize.hours * 60 * 60 * 1000).toISOString();
            currentUser.subscriptionExpires = newExpiry;
            toast.success(`🎉 CONGRATULATIONS! You won ${selectedPrize.name}! Subscription extended.`);
          } else {
            toast.info(`Better luck next time! Result: ${selectedPrize.name}`);
          }

          DB.updateUser(currentUser);
          localStorage.setItem('fragment_user', JSON.stringify(currentUser));
          setCurrentUser({ ...currentUser });
          setSpinning(false);
          setLastResult(selectedPrize.name);
          checkCooldown(currentUser);
        }, 2000);
      };

      return (
        <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between selection:bg-green-500 selection:text-black">
          <Navbar />

          <div className="flex-1 max-w-5xl mx-auto px-6 pt-32 pb-20 w-full font-mono space-y-10">
            <div className="bg-black border border-green-500/30 rounded p-8 shadow-[0_0_20px_rgba(34,197,94,0.08)] flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
                  <Disc className={`w-7 h-7 text-green-400 ${spinning ? 'animate-spin' : ''}`} /> WHEEL OF FORTUNE
                </h1>
                <p className="text-xs text-gray-400 mt-1">Spin every 48 hours to win free subscription hours or months!</p>
              </div>
              <div className="px-4 py-2 bg-green-950/40 border border-green-500/30 rounded text-xs text-green-400">
                USER: {currentUser.name}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Prize list table */}
              <div className="p-6 bg-black border border-green-500/30 rounded space-y-4">
                <h3 className="text-white font-bold text-sm uppercase border-l-2 border-green-500 pl-3">
                  Drop Probabilities
                </h3>
                <div className="space-y-2 text-xs">
                  {PRIZES.map((p, i) => (
                    <div key={i} className="flex justify-between items-center p-2.5 bg-black border border-green-500/20 rounded">
                      <span className={`font-bold ${p.color}`}>{p.name}</span>
                      <span className="text-gray-400">{p.probability}%</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  * Note: 50% chance of NO DROP. Monthly and daily subscriptions have lower odds. Available every 48 hours per account.
                </p>
              </div>

              {/* Wheel Spin Arena */}
              <div className="md:col-span-2 p-8 bg-black border border-green-500/30 rounded flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-36 h-36 rounded-full bg-green-950/20 border-2 border-green-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)] relative overflow-hidden">
                  <div className={`absolute inset-0 bg-[radial-gradient(circle,_rgba(34,197,94,0.2)_0%,_transparent_70%)] ${spinning ? 'animate-pulse' : ''}`}></div>
                  <Disc className={`w-16 h-16 text-green-400 ${spinning ? 'animate-spin duration-300' : ''}`} />
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-white uppercase">
                    {spinning ? 'SPINNING WHEEL...' : lastResult ? `RESULT: ${lastResult}` : 'READY TO SPIN'}
                  </h2>
                  <p className="text-xs text-gray-400">
                    {timeLeftHours > 0 
                      ? `Cooldown active. Next spin available in ${timeLeftHours} hours.` 
                      : 'Click below to test your fortune!'
                    }
                  </p>
                </div>

                <button 
                  onClick={handleSpin}
                  disabled={spinning || timeLeftHours > 0}
                  className="px-8 py-4 bg-green-500 hover:bg-green-400 text-black font-extrabold rounded text-xs transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] disabled:opacity-50 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> {spinning ? 'SPINNING...' : timeLeftHours > 0 ? `COOLDOWN (${timeLeftHours}H)` : 'SPIN THE WHEEL'}
                </button>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      );
    }