import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { Navbar } from '../components/Navbar';
    import { Footer } from '../components/Footer';
    import { Terminal, UserPlus, Lock, Key, User, Gift } from 'lucide-react';
    import { DB, UserProfile } from '../components/DatabaseService';
    import { toast } from 'react-toastify';

    export default function Register() {
      const [name, setName] = useState('');
      const [inviteCode, setInviteCode] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [referralCode, setReferralCode] = useState('');
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();

      const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
          toast.error('Passwords do not match.');
          return;
        }

        const trimmedInvite = inviteCode.trim();

        // Check if user tries to use random uncreated invite code
        const isValidInvite = DB.getInvites().some(inv => inv.code.toLowerCase() === trimmedInvite.toLowerCase());
        if (!isValidInvite) {
          toast.error('Invalid or uncreated invite code. Random codes are not permitted.');
          return;
        }

        const isInviteValidAndAvailable = DB.validateAndUseInvite(trimmedInvite);
        if (!isInviteValidAndAvailable) {
          toast.error('This invite code has reached its maximum account limit or does not exist.');
          return;
        }

        setLoading(true);

        setTimeout(() => {
          const existing = DB.findUserByName(name.trim());
          if (existing) {
            toast.error('Username already taken. Please choose another.');
            setLoading(false);
            return;
          }

          // Create new user profile with 30 days subscription
          const newProfile: UserProfile = {
            id: 'u-' + Math.random().toString(36).substring(2, 9),
            name: name.trim(),
            password: password,
            inviteCode: trimmedInvite,
            referralCode: referralCode.trim() || undefined,
            subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString(),
            role: 'Beta Tester'
          };

          DB.saveUser(newProfile);
          localStorage.setItem('fragment_user', JSON.stringify(newProfile));
          toast.success(`Registration successful! Welcome to Fragment CS2 Beta.`);
          navigate('/dashboard');
          setLoading(false);
        }, 600);
      };

      return (
        <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between selection:bg-green-500 selection:text-black">
          <Navbar />

          <div className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
            <div className="w-full max-w-md bg-black border border-green-500/30 rounded p-8 shadow-[0_0_30px_rgba(34,197,94,0.1)] font-mono">
              <div className="text-center space-y-3 mb-8">
                <div className="w-12 h-12 mx-auto rounded bg-black border border-green-500 flex items-center justify-center text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  <UserPlus className="w-6 h-6 animate-pulse" />
                </div>
                <h1 className="text-2xl font-extrabold text-white uppercase tracking-wider">BETA REGISTRATION</h1>
                <p className="text-xs text-gray-400">// Enter valid invite code & credentials to join</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-green-400" /> NAME / USERNAME *
                  </label>
                  <input 
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. CyberHero"
                    className="w-full bg-black border border-green-500/30 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-green-400" /> INVITE CODE *
                  </label>
                  <input 
                    type="text"
                    required
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    placeholder="ADMIN-MASTER-01"
                    className="w-full bg-black border border-green-500/30 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                  />
                  <span className="text-[10px] text-gray-400">// Random uncreated codes are blocked</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-green-400" /> PASSWORD *
                  </label>
                  <input 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-black border border-green-500/30 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-green-400" /> CONFIRM PASSWORD *
                  </label>
                  <input 
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-black border border-green-500/30 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-green-400" /> REFERRAL CODE (FRIEND) [OPTIONAL]
                  </label>
                  <input 
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    placeholder="Optional friend code"
                    className="w-full bg-black border border-green-500/30 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-green-500 hover:bg-green-400 text-black font-extrabold rounded transition-all duration-200 shadow-[0_0_20px_rgba(34,197,94,0.4)] disabled:opacity-50 mt-2"
                >
                  {loading ? 'INITIALIZING ACCOUNT...' : 'REGISTER & JOIN BETA'}
                </button>
              </form>

              <div className="mt-6 text-center text-xs text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-green-400 hover:underline font-bold">
                  Login here
                </Link>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      );
    }