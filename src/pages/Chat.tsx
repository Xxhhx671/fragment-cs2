import React, { useEffect, useState, useRef } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Navbar } from '../components/Navbar';
    import { Footer } from '../components/Footer';
    import { MessageSquare, Send, Search, User, Terminal } from 'lucide-react';
    import { DB, ChatMessage, UserProfile } from '../components/DatabaseService';
    import { format } from 'date-fns';
    import { toast } from 'react-toastify';

    export default function Chat() {
      const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
      const [users, setUsers] = useState<UserProfile[]>([]);
      const [messages, setMessages] = useState<ChatMessage[]>([]);
      const [searchQuery, setSearchQuery] = useState('');
      const [selectedRecipient, setSelectedRecipient] = useState<string>(''); 
      const [newMessage, setNewMessage] = useState('');
      const messagesEndRef = useRef<HTMLDivElement>(null);
      const navigate = useNavigate();

      useEffect(() => {
        const session = localStorage.getItem('fragment_user');
        if (!session) {
          navigate('/login');
          return;
        }
        try {
          setCurrentUser(JSON.parse(session));
        } catch {
          navigate('/login');
        }
      }, [navigate]);

      const loadData = () => {
        const allUsers = DB.getUsers();
        setUsers(allUsers);
        setMessages(DB.getMessages());

        if (!selectedRecipient) {
          const others = allUsers.filter(u => currentUser && u.id !== currentUser.id);
          if (others.length > 0) {
            setSelectedRecipient(others[0].id);
          }
        }
      };

      useEffect(() => {
        loadData();
        const interval = setInterval(() => {
          loadData();
        }, 1500);
        return () => clearInterval(interval);
      }, [currentUser]);

      useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages, selectedRecipient]);

      if (!currentUser) return null;

      const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedRecipient) return;

        const msg: ChatMessage = {
          id: 'msg-' + Math.random().toString(36).substring(2, 9),
          senderId: currentUser.id,
          senderName: currentUser.name,
          recipientId: selectedRecipient,
          content: newMessage.trim(),
          timestamp: new Date().toISOString()
        };

        DB.saveMessage(msg);
        setMessages(DB.getMessages());
        setNewMessage('');
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };

      const filteredUsers = users.filter(u => 
        u.id !== currentUser.id && 
        u.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const currentMessages = messages.filter(m => {
        if (!selectedRecipient) return false;
        return (
          (m.senderId === currentUser.id && m.recipientId === selectedRecipient) ||
          (m.senderId === selectedRecipient && m.recipientId === currentUser.id)
        );
      });

      const selectedUserObj = users.find(u => u.id === selectedRecipient);

      return (
        <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between selection:bg-green-500 selection:text-black">
          <Navbar />

          <div className="flex-1 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full font-mono flex flex-col">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-green-400" /> PRIVATE MESSAGING CHAT
                </h1>
                <p className="text-xs text-gray-400 mt-1">Direct peer-to-peer messaging with existing registered users</p>
              </div>
              <div className="text-xs text-green-400 bg-green-950/40 px-3 py-1.5 rounded border border-green-500/30">
                ACTIVE USER: {currentUser.name}
              </div>
            </div>

            {/* Chat Container */}
            <div className="grid grid-cols-1 md:grid-cols-4 bg-black border border-green-500/30 rounded overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.08)] h-[650px]">
              
              {/* Sidebar: Search & Chats */}
              <div className="md:col-span-1 border-r border-green-500/30 flex flex-col bg-black/80">
                <div className="p-4 border-b border-green-500/30 space-y-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-green-400 absolute left-3 top-3" />
                    <input 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search existing users..."
                      className="w-full bg-black border border-green-500/30 rounded pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-green-500"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-green-500/10">
                  {filteredUsers.map(u => (
                    <button
                      key={u.id}
                      onClick={() => setSelectedRecipient(u.id)}
                      className={`w-full p-4 text-left flex items-center gap-3 transition-colors ${selectedRecipient === u.id ? 'bg-green-950/40 border-l-2 border-green-500' : 'hover:bg-green-950/10'}`}
                    >
                      <div className="w-9 h-9 rounded bg-black border border-green-500/30 flex items-center justify-center text-green-400 font-bold text-xs">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-bold text-white truncate">{u.name}</h4>
                        <p className="text-[10px] text-green-500/70 truncate">{u.role}</p>
                      </div>
                    </button>
                  ))}

                  {filteredUsers.length === 0 && (
                    <div className="p-4 text-center text-xs text-gray-500">
                      No registered users found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              </div>

              {/* Main Chat Area */}
              <div className="md:col-span-3 flex flex-col justify-between bg-black">
                {/* Chat Header */}
                <div className="p-4 border-b border-green-500/30 flex items-center justify-between bg-black/90">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-green-950/40 border border-green-500/40 flex items-center justify-center text-green-400">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase">
                        {selectedUserObj ? `Direct Message: ${selectedUserObj.name}` : 'Select a user'}
                      </h3>
                      <p className="text-[10px] text-gray-400">
                        {selectedUserObj ? `Secure peer connection with ${selectedUserObj.role}` : 'Choose a registered account from the sidebar'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages Box */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {!selectedRecipient ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-2">
                      <Terminal className="w-8 h-8 text-green-500/30" />
                      <p className="text-xs">Select a registered user to start direct messaging.</p>
                    </div>
                  ) : currentMessages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-2">
                      <Terminal className="w-8 h-8 text-green-500/30" />
                      <p className="text-xs">No direct messages with {selectedUserObj?.name} yet. Send the first message!</p>
                    </div>
                  ) : (
                    currentMessages.map(m => {
                      const isMe = m.senderId === currentUser.id;
                      return (
                        <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                          <div className="flex items-center gap-2 mb-1 text-[10px] text-gray-400">
                            <span className="font-bold text-green-400">{m.senderName}</span>
                            <span>{format(new Date(m.timestamp), 'HH:mm')}</span>
                          </div>
                          <div className={`max-w-md p-3.5 rounded text-xs leading-relaxed ${isMe ? 'bg-green-950/30 border border-green-500/40 text-white rounded-tr-none' : 'bg-black border border-green-500/20 text-gray-200 rounded-tl-none'}`}>
                            {m.content}
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Form */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-green-500/30 flex items-center gap-3 bg-black/90">
                  <input 
                    type="text"
                    disabled={!selectedRecipient}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={selectedRecipient ? `Type secure message to ${selectedUserObj?.name}...` : "Select a user first..."}
                    className="flex-1 bg-black border border-green-500/30 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-green-500 disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={!selectedRecipient}
                    className="px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded flex items-center gap-2 text-xs transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" /> SEND
                  </button>
                </form>
              </div>

            </div>
          </div>

          <Footer />
        </div>
      );
    }