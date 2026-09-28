import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Terminal, Menu, X, User, MessageSquare, LogIn, UserPlus, Lock, Disc } from 'lucide-react';

const LOGO_URL = 'https://i.oneme.ru/i?r=BUE2sh_eZW7g8kugOdIm2NotjR0dYD9GJEfDv6Sl1MuBsYMxP-662WpoKwGzWGDdSpq-lVzsyQysV3DaVqjHCp2E&expires=1790722208836';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const session = localStorage.getItem('fragment_user');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        setCurrentUser(parsed);
      } catch (e) {
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('fragment_user');
    setCurrentUser(null);
    navigate('/');
  };

  const isAdmin = currentUser && (currentUser.id === 'u-jh72lo3' || currentUser.role === 'Admin');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-green-500/20 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded bg-black border border-green-500 flex items-center justify-center overflow-hidden group-hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300">
            <img src={LOGO_URL} alt="Fragment CS2 Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-mono font-bold tracking-wider text-white text-lg">
              FRAGMENT <span className="text-green-500 text-xs px-1.5 py-0.5 rounded border border-green-500/30 ml-1">CS2</span>
            </span>
            <span className="block text-[10px] text-green-500/70 tracking-widest uppercase font-mono">HERO EDITION</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm">
          <Link to="/" className={`transition-colors hover:text-green-400 ${location.pathname === '/' ? 'text-green-400 font-bold border-b border-green-500 pb-0.5' : 'text-gray-400'}`}>
            // HOME
          </Link>
          <Link to="/features" className={`transition-colors hover:text-green-400 ${location.pathname === '/features' ? 'text-green-400 font-bold border-b border-green-500 pb-0.5' : 'text-gray-400'}`}>
            // FEATURES
          </Link>
          <Link to="/status" className={`transition-colors hover:text-green-400 ${location.pathname === '/status' ? 'text-green-400 font-bold border-b border-green-500 pb-0.5' : 'text-gray-400'}`}>
            // STATUS
          </Link>
          {currentUser && (
            <>
              <Link to="/wheel" className={`transition-colors hover:text-green-400 flex items-center gap-1.5 ${location.pathname === '/wheel' ? 'text-green-400 font-bold border-b border-green-500 pb-0.5' : 'text-gray-400'}`}>
                <Disc className="w-4 h-4 text-green-500 animate-spin" /> FORTUNE
              </Link>
              <Link to="/chat" className={`transition-colors hover:text-green-400 flex items-center gap-1.5 ${location.pathname === '/chat' ? 'text-green-400 font-bold border-b border-green-500 pb-0.5' : 'text-gray-400'}`}>
                <MessageSquare className="w-4 h-4 text-green-500" /> CHAT
              </Link>
              <Link to="/dashboard" className={`transition-colors hover:text-green-400 flex items-center gap-1.5 ${location.pathname === '/dashboard' ? 'text-green-400 font-bold border-b border-green-500 pb-0.5' : 'text-gray-400'}`}>
                <User className="w-4 h-4 text-green-500" /> DASHBOARD
              </Link>
              {isAdmin && (
                <Link to="/admin" className={`transition-colors hover:text-green-400 flex items-center gap-1.5 ${location.pathname === '/admin' ? 'text-green-400 font-bold border-b border-green-500 pb-0.5' : 'text-gray-400'}`}>
                  <Lock className="w-4 h-4 text-green-500" /> ADMIN
                </Link>
              )}
            </>
          )}
        </div>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-4 font-mono text-xs">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <span className="text-green-400 bg-green-950/40 px-3 py-1.5 rounded border border-green-500/30">
                USER: {currentUser.name} {isAdmin && '(ADMIN)'}
              </span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-black hover:bg-green-950/30 text-green-400 border border-green-500/40 rounded transition-all duration-200"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <>
              <Link 
                to="/login"
                className="px-4 py-2 bg-black hover:bg-green-950/30 text-green-400 border border-green-500/40 rounded flex items-center gap-2 transition-all duration-200"
              >
                <LogIn className="w-3.5 h-3.5" /> LOGIN
              </Link>
              <Link 
                to="/register"
                className="px-4 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded flex items-center gap-2 transition-all duration-200 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]"
              >
                <UserPlus className="w-3.5 h-3.5" /> REGISTER
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-green-400 p-2 border border-green-500/30 rounded bg-black"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-green-500/30 p-6 flex flex-col gap-4 font-mono">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-green-400 py-2 border-b border-green-500/10"
          >
            // HOME
          </Link>
          <Link 
            to="/features" 
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-green-400 py-2 border-b border-green-500/10"
          >
            // FEATURES
          </Link>
          <Link 
            to="/status" 
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-green-400 py-2 border-b border-green-500/10"
          >
            // STATUS
          </Link>
          {currentUser && (
            <>
              <Link 
                to="/wheel" 
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-green-400 py-2 border-b border-green-500/10 flex items-center gap-2"
              >
                <Disc className="w-4 h-4 text-green-500" /> FORTUNE WHEEL
              </Link>
              <Link 
                to="/chat" 
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-green-400 py-2 border-b border-green-500/10 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-green-500" /> CHAT
              </Link>
              <Link 
                to="/dashboard" 
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-green-400 py-2 border-b border-green-500/10 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-green-500" /> DASHBOARD
              </Link>
              {isAdmin && (
                <Link 
                  to="/admin" 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-green-400 py-2 border-b border-green-500/10 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-green-500" /> ADMIN PANEL
                </Link>
              )}
            </>
          )}

          <div className="pt-2 flex flex-col gap-3">
            {currentUser ? (
              <button 
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="w-full py-2.5 bg-black text-green-400 border border-green-500/40 rounded text-center"
              >
                LOGOUT ({currentUser.name})
              </button>
            ) : (
              <>
                <Link 
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 bg-black text-green-400 border border-green-500/40 rounded text-center"
                >
                  LOGIN
                </Link>
                <Link 
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 bg-green-500 text-black font-bold rounded text-center shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                >
                  REGISTER
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};