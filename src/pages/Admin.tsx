import React, { useEffect, useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Navbar } from '../components/Navbar';
    import { Footer } from '../components/Footer';
    import { Shield, Key, Plus, Trash2, Calendar, User, Terminal, Lock } from 'lucide-react';
    import { DB, UserProfile, InviteCodeEntry } from '../components/DatabaseService';
    import { format } from 'date-fns';
    import { toast } from 'react-toastify';

    export default function Admin() {
      const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
      const [invites, setInvites] = useState<InviteCodeEntry[]>([]);
      const [users, setUsers] = useState<UserProfile[]>([]);

      // New Invite form
      const [newCode, setNewCode] = useState('');
      const [maxUses, setMaxUses] = useState(1);

      // Add days form
      const [selectedUserId, setSelectedUserId] = useState('');
      const [daysToAdd, setDaysToAdd] = useState(30);

      const navigate = useNavigate();

      const loadData = () => {
        setInvites(DB.getInvites());
        setUsers(DB.getUsers());
      };

      useEffect(() => {
        const session = localStorage.getItem('fragment_user');
        if (!session) {
          navigate('/login');
          return;
        }
        try {
          const parsed = JSON.parse(session);
          if (parsed.id !== 'u-jh72lo3' && parsed.role !== 'Admin') {
            toast.error('Access denied. Administrator privileges required.');
            navigate('/dashboard');
            return;
          }
          setCurrentUser(parsed);
          loadData();
        } catch {
          navigate('/login');
        }
      }, [navigate]);

      if (!currentUser) return null;

      const handleCreateInvite = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCode.trim()) {
          toast.error('Please enter an invite code.');
          return;
        }

        const existing = invites.find(i => i.code.toLowerCase() === newCode.trim().toLowerCase());
        if (existing) {
          toast.error('This invite code already exists.');
          return;
        }

        const inviteEntry: InviteCodeEntry = {
          code: newCode.trim(),
          maxUses: Number(maxUses) || 1,
          usedCount: 0,
          createdBy: currentUser.name,
          createdAt: new Date().toISOString()
        };

        DB.saveInvite(inviteEntry);
        setNewCode('');
        setMaxUses(1);
        loadData();
        toast.success(`Invite code ${inviteEntry.code} created for ${inviteEntry.maxUses} account(s).`);
      };

      const handleDeleteInvite = (code: string) => {
        DB.deleteInvite(code);
        loadData();
        toast.success(`Invite code ${code} deleted.`);
      };

      const handleAddDays = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUserId) {
          toast.error('Please select a user.');
          return;
        }

        const targetUser = DB.findUserById(selectedUserId);
        if (!targetUser) {
          toast.error('User not found.');
          return;
        }

        const currentExpiry = new Date(targetUser.subscriptionExpires);
        const baseDate = currentExpiry > new Date() ? currentExpiry : new Date();
        const newExpiry = new Date(baseDate.getTime() + Number(daysToAdd) * 24 * 60 * 60 * 1000).toISOString();

        targetUser.subscriptionExpires = newExpiry;
        DB.updateUser(targetUser);
        loadData();
        toast.success(`Added ${daysToAdd} days to user ${targetUser.name}!`);
      };

      return (
        <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between selection:bg-green-500 selection:text-black">
          <Navbar />

          <div className="flex-1 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full font-mono space-y-10">
            <div className="bg-black border border-green-500/30 rounded p-8 shadow-[0_0_20px_rgba(34,197,94,0.08)] flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
                  <Lock className="w-6 h-6 text-green-400" /> ADMINISTRATOR COMMAND PANEL
                </h1>
                <p className="text-xs text-gray-400 mt-1">Authorized for ID: u-jh72lo3 ({currentUser.name})</p>
              </div>
              <span className="px-3 py-1 bg-green-950/60 border border-green-500 text-green-400 text-xs rounded">
                ROOT ADMIN
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Invite Code Generator */}
              <div className="p-8 bg-black border border-green-500/30 rounded space-y-6">
                <h3 className="text-white font-bold text-base border-l-2 border-green-500 pl-3 uppercase">
                  Manage Invite Codes
                </h3>
                <p className="text-xs text-gray-400">
                  Create custom invite codes and choose how many accounts can register with each code. Random uncreated invite codes are blocked during registration.
                </p>

                <form onSubmit={handleCreateInvite} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300">CUSTOM INVITE CODE</label>
                    <input 
                      type="text"
                      required
                      value={newCode}
                      onChange={(e) => setNewCode(e.target.value)}
                      placeholder="e.g. FRAGMENT-VIP-2026"
                      className="w-full bg-black border border-green-500/30 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-green-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300">NUMBER OF ACCOUNTS ALLOWED (MAX USES)</label>
                    <input 
                      type="number"
                      min="1"
                      max="1000"
                      required
                      value={maxUses}
                      onChange={(e) => setMaxUses(Number(e.target.value))}
                      className="w-full bg-black border border-green-500/30 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-green-500"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3 bg-green-500 hover:bg-green-400 text-black font-extrabold rounded text-xs transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> CREATE INVITE CODE
                  </button>
                </form>

                <div className="pt-4 border-t border-green-500/20 space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase">// Existing Active Codes</h4>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {invites.map(inv => (
                      <div key={inv.code} className="p-3 bg-black border border-green-500/20 rounded flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-green-400 font-mono">{inv.code}</div>
                          <div className="text-[10px] text-gray-400">Uses: {inv.usedCount} / {inv.maxUses} | By: {inv.createdBy}</div>
                        </div>
                        <button 
                          onClick={() => handleDeleteInvite(inv.code)}
                          className="p-2 bg-red-950/30 hover:bg-red-900/40 text-red-400 border border-red-500/30 rounded transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add Subscription Days */}
              <div className="p-8 bg-black border border-green-500/30 rounded space-y-6">
                <h3 className="text-white font-bold text-base border-l-2 border-green-500 pl-3 uppercase">
                  Manage Subscription Days
                </h3>
                <p className="text-xs text-gray-400">
                  Extend subscription time for any registered user or for your own administrator account.
                </p>

                <form onSubmit={handleAddDays} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300">SELECT USER</label>
                    <select 
                      value={selectedUserId}
                      onChange={(e) => setSelectedUserId(e.target.value)}
                      className="w-full bg-black border border-green-500/30 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-green-500"
                    >
                      <option value="">-- Choose User --</option>
                      {users.map(u => (
                        <option key={u.id} value={u.id}>
                          {u.name} ({u.role}) - {u.id === currentUser.id ? ' [YOU]' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-300">DAYS TO ADD</label>
                    <input 
                      type="number"
                      min="1"
                      max="365"
                      required
                      value={daysToAdd}
                      onChange={(e) => setDaysToAdd(Number(e.target.value))}
                      className="w-full bg-black border border-green-500/30 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-green-500"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3 bg-green-500 hover:bg-green-400 text-black font-extrabold rounded text-xs transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" /> ADD SUBSCRIPTION DAYS
                  </button>
                </form>

                <div className="pt-4 border-t border-green-500/20 space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase">// Registered Users Telemetry</h4>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {users.map(u => (
                      <div key={u.id} className="p-3 bg-black border border-green-500/20 rounded flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-white">{u.name} <span className="text-green-400 font-mono text-[10px]">({u.role})</span></div>
                          <div className="text-[10px] text-gray-400">ID: {u.id} | Expires: {format(new Date(u.subscriptionExpires), 'PP')}</div>
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedUserId(u.id);
                            toast.info(`Selected ${u.name} for days addition.`);
                          }}
                          className="px-3 py-1.5 bg-black hover:bg-green-950/40 text-green-400 border border-green-500/30 rounded text-[10px] transition-all"
                        >
                          Select
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      );
    }