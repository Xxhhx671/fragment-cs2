import React, { useEffect, useState } from 'react';
    import { useNavigate, Link } from 'react-router-dom';
    import { Navbar } from '../components/Navbar';
    import { Footer } from '../components/Footer';
    import { User, Shield, Calendar, Key, MessageSquare, Terminal, Clock, Download, CheckCircle, Award, Lock, Disc } from 'lucide-react';
    import { DB, UserProfile } from '../components/DatabaseService';
    import { format, differenceInDays } from 'date-fns';
    import { toast } from 'react-toastify';

    export default function Dashboard() {
      const [user, setUser] = useState<UserProfile | null>(null);
      const navigate = useNavigate();

      useEffect(() => {
        const session = localStorage.getItem('fragment_user');
        if (!session) {
          navigate('/login');
          return;
        }
        try {
          const parsed = JSON.parse(session);
          // Sync with database
          const latest = DB.findUserByName(parsed.name);
          if (latest) {
            setUser(latest);
          } else {
            setUser(parsed);
          }
        } catch {
          navigate('/login');
        }
      }, [navigate]);

      if (!user) return null;

      const expiryDate = new Date(user.subscriptionExpires);
      const daysLeft = Math.max(0, differenceInDays(expiryDate, new Date()));
      const isAdmin = user.id === 'u-jh72lo3' || user.role === 'Admin';

      const handleDownloadClick = () => {
        window.location.href = 'https://wertigo.ru/shared-files/08487af8-75ca-417b-b626-7ff99f6785b7';
      };

      return (
        <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between selection:bg-green-500 selection:text-black">
          <Navbar />

          <div className="flex-1 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full font-mono">
            {/* Header banner */}
            <div className="bg-black border border-green-500/30 rounded p-8 mb-8 shadow-[0_0_20px_rgba(34,197,94,0.08)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded bg-green-950/40 border border-green-500 flex items-center justify-center text-green-400 text-2xl font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-extrabold text-white">{user.name}</h1>
                    <span className="px-2.5 py-0.5 rounded bg-green-950/60 border border-green-500 text-green-400 text-xs">
                      {user.role}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">ID: {user.id} // Member since {format(new Date(user.createdAt), 'PP')}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="px-5 py-2.5 bg-green-950/50 hover:bg-green-900/50 text-green-400 border border-green-500 rounded flex items-center gap-2 text-xs transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                  >
                    <Lock className="w-4 h-4" /> ADMIN PANEL
                  </Link>
                )}
                <Link 
                  to="/wheel" 
                  className="px-5 py-2.5 bg-black hover:bg-green-950/30 text-green-400 border border-green-500/40 rounded flex items-center gap-2 text-xs transition-all"
                >
                  <Disc className="w-4 h-4 animate-spin" /> FORTUNE WHEEL
                </Link>
                <Link 
                  to="/chat" 
                  className="px-5 py-2.5 bg-black hover:bg-green-950/30 text-green-400 border border-green-500/40 rounded flex items-center gap-2 text-xs transition-all"
                >
                  <MessageSquare className="w-4 h-4" /> PLAYER CHAT
                </Link>
                <button 
                  onClick={handleDownloadClick}
                  className="px-5 py-2.5 bg-green-500 hover:bg-green-400 text-black font-bold rounded flex items-center gap-2 text-xs transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                >
                  <Download className="w-4 h-4" /> DOWNLOAD CHEAT
                </button>
              </div>
            </div>

            {/* Grid stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="p-6 bg-black border border-green-500/30 rounded space-y-3">
                <div className="flex items-center justify-between text-gray-400 text-xs">
                  <span>SUBSCRIPTION STATUS</span>
                  <Clock className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-extrabold text-green-400">
                  {daysLeft > 0 ? `${daysLeft} DAYS LEFT` : 'EXPIRED'}
                </div>
                <p className="text-xs text-gray-400">Expires on: {format(expiryDate, 'PPpp')}</p>
              </div>

              <div className="p-6 bg-black border border-green-500/30 rounded space-y-3">
                <div className="flex items-center justify-between text-gray-400 text-xs">
                  <span>INVITE CODE USED</span>
                  <Key className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-xl font-bold text-white font-mono tracking-wider bg-green-950/20 p-2 rounded border border-green-500/20 text-center">
                  {user.inviteCode}
                </div>
                <p className="text-xs text-gray-400">Verified beta testing token</p>
              </div>

              <div className="p-6 bg-black border border-green-500/30 rounded space-y-3">
                <div className="flex items-center justify-between text-gray-400 text-xs">
                  <span>REFERRAL CODE</span>
                  <Award className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-xl font-bold text-white font-mono tracking-wider bg-green-950/20 p-2 rounded border border-green-500/20 text-center">
                  {user.referralCode || 'NONE'}
                </div>
                <p className="text-xs text-gray-400">Friend referral status</p>
              </div>
            </div>

            {/* Profile info & loader details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-black border border-green-500/30 rounded space-y-6">
                <h3 className="text-white font-bold text-base border-l-2 border-green-500 pl-3">PROFILE TELEMETRY</h3>
                
                <div className="space-y-4 text-xs">
                  <div className="flex justify-between py-2 border-b border-green-500/10">
                    <span className="text-gray-400">USERNAME:</span>
                    <span className="text-white font-bold">{user.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-green-500/10">
                    <span className="text-gray-400">ACCOUNT ID:</span>
                    <span className="text-white">{user.id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-green-500/10">
                    <span className="text-gray-400">ACCESS LEVEL:</span>
                    <span className="text-green-400">{user.role}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-green-500/10">
                    <span className="text-gray-400">DATABASE SYNC:</span>
                    <span className="text-green-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> ACTIVE (LOCAL STORAGE DB)
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-black border border-green-500/30 rounded space-y-6">
                <h3 className="text-white font-bold text-base border-l-2 border-green-500 pl-3">DOWNLOAD & INSTRUCTIONS</h3>
                
                <div className="space-y-4 text-xs text-gray-300 leading-relaxed">
                  <p>1. Ensure Counter-Strike 2 is closed before downloading the cheat binary.</p>
                  <p>2. Click <span className="text-green-400 font-bold">Download Cheat</span> above to retrieve the secure file directly.</p>
                  <p>3. Select your desired configuration preset in-game using the <span className="text-green-400 font-bold">INSERT</span> key.</p>
                  <div className="p-3 bg-green-950/20 border border-green-500/30 rounded text-green-400">
                    NOTE: This is a beta build. Report any crashes or bugs directly via the player chat or support desk.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      );
    }