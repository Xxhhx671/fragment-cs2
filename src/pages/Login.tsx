import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { Navbar } from '../components/Navbar';
    import { Footer } from '../components/Footer';
    import { Terminal, LogIn, Lock, User, Shield } from 'lucide-react';
    import { DB } from '../components/DatabaseService';
    import { toast } from 'react-toastify';

    export default function Login() {
      const [name, setName] = useState('');
      const [password, setPassword] = useState('');
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();

      const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
          const user = DB.findUserByName(name.trim());
          if (!user) {
            toast.error('User not found. Please check your username or register.');
            setLoading(false);
            return;
          }

          if (user.password && user.password !== password) {
            toast.error('Invalid password provided.');
            setLoading(false);
            return;
          }

          // Save active session
          localStorage.setItem('fragment_user', JSON.stringify(user));
          toast.success(`Welcome back, ${user.name}!`);
          navigate('/dashboard');
          setLoading(false);
        }, 500);
      };

      return (
        <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between selection:bg-green-500 selection:text-black">
          <Navbar />

          <div className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
            <div className="w-full max-w-md bg-black border border-green-500/30 rounded p-8 shadow-[0_0_30px_rgba(34,197,94,0.1)] font-mono">
              <div className="text-center space-y-3 mb-8">
                <div className="w-12 h-12 mx-auto rounded bg-black border border-green-500 flex items-center justify-center text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  <LogIn className="w-6 h-6 animate-pulse" />
                </div>
                <h1 className="text-2xl font-extrabold text-white uppercase tracking-wider">PORTAL LOGIN</h1>
                <p className="text-xs text-gray-400">// Enter credentials to access Fragment CS2</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-green-400" /> USERNAME
                  </label>
                  <input 
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter username..."
                    className="w-full bg-black border border-green-500/30 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-300 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-green-400" /> PASSWORD
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

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-green-500 hover:bg-green-400 text-black font-extrabold rounded transition-all duration-200 shadow-[0_0_20px_rgba(34,197,94,0.4)] disabled:opacity-50"
                >
                  {loading ? 'AUTHENTICATING...' : 'ACCESS PORTAL'}
                </button>
              </form>

              <div className="mt-6 text-center text-xs text-gray-400">
                Don't have an invite code & account?{' '}
                <Link to="/register" className="text-green-400 hover:underline font-bold">
                  Register here
                </Link>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      );
    }