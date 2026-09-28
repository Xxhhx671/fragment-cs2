// Client-side database simulation with localStorage synchronization across sessions and tabs

export interface UserProfile {
  id: string;
  name: string;
  password?: string;
  inviteCode: string;
  referralCode?: string;
  subscriptionExpires: string; // ISO date string
  createdAt: string;
  role: 'Beta Tester' | 'VIP' | 'Developer' | 'Admin';
  avatar?: string;
  lastSpinTime?: string; // ISO date string for 48h wheel cooldown
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string; // specific user ID
  content: string;
  timestamp: string;
}

export interface InviteCodeEntry {
  code: string;
  maxUses: number;
  usedCount: number;
  createdBy: string;
  createdAt: string;
}

const USERS_KEY = 'fragment_db_users';
const MESSAGES_KEY = 'fragment_db_messages';
const INVITES_KEY = 'fragment_db_invites';

// Initial mock data if empty
const initDatabase = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    const initialUsers: UserProfile[] = [
      {
        id: 'u-jh72lo3',
        name: 'SuperAdmin',
        password: 'password123',
        inviteCode: 'ADMIN-MASTER-01',
        subscriptionExpires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        role: 'Admin'
      },
      {
        id: 'u-admin-1',
        name: 'HeroDev',
        password: 'password123',
        inviteCode: 'HERO-DEV-001',
        subscriptionExpires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        role: 'Developer'
      },
      {
        id: 'u-beta-2',
        name: 'Vortex',
        password: 'password123',
        inviteCode: 'VRX-9988-CS2',
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        role: 'VIP'
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
  } else {
    // Ensure u-jh72lo3 has Admin role
    try {
      const users: UserProfile[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      const adminIdx = users.findIndex(u => u.id === 'u-jh72lo3');
      if (adminIdx >= 0 && users[adminIdx].role !== 'Admin') {
        users[adminIdx].role = 'Admin';
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      } else if (adminIdx < 0) {
        users.unshift({
          id: 'u-jh72lo3',
          name: 'SuperAdmin',
          password: 'password123',
          inviteCode: 'ADMIN-MASTER-01',
          subscriptionExpires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
          role: 'Admin'
        });
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
    } catch {}
  }

  if (!localStorage.getItem(INVITES_KEY)) {
    const initialInvites: InviteCodeEntry[] = [
      { code: 'HERO-DEV-001', maxUses: 10, usedCount: 1, createdBy: 'HeroDev', createdAt: new Date().toISOString() },
      { code: 'VRX-9988-CS2', maxUses: 5, usedCount: 1, createdBy: 'Vortex', createdAt: new Date().toISOString() },
      { code: 'FRAGMENT-BETA-2026', maxUses: 50, usedCount: 0, createdBy: 'SuperAdmin', createdAt: new Date().toISOString() }
    ];
    localStorage.setItem(INVITES_KEY, JSON.stringify(initialInvites));
  }

  if (!localStorage.getItem(MESSAGES_KEY)) {
    const initialMessages: ChatMessage[] = [
      {
        id: 'm-1',
        senderId: 'u-admin-1',
        senderName: 'HeroDev',
        recipientId: 'u-beta-2',
        content: 'Hey Vortex, test the resolver update on Mirage when you get a chance.',
        timestamp: new Date(Date.now() - 1800000).toISOString()
      }
    ];
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(initialMessages));
  }
};

export const DB = {
  getUsers: (): UserProfile[] => {
    initDatabase();
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    } catch {
      return [];
    }
  },

  saveUser: (user: UserProfile) => {
    const users = DB.getUsers();
    const existingIndex = users.findIndex(u => u.name.toLowerCase() === user.name.toLowerCase());
    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...user };
    } else {
      users.push(user);
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  updateUser: (updatedUser: UserProfile) => {
    const users = DB.getUsers();
    const idx = users.findIndex(u => u.id === updatedUser.id);
    if (idx >= 0) {
      users[idx] = updatedUser;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  },

  findUserByName: (name: string): UserProfile | undefined => {
    const users = DB.getUsers();
    return users.find(u => u.name.toLowerCase() === name.toLowerCase());
  },

  findUserById: (id: string): UserProfile | undefined => {
    const users = DB.getUsers();
    return users.find(u => u.id === id);
  },

  getInvites: (): InviteCodeEntry[] => {
    initDatabase();
    try {
      return JSON.parse(localStorage.getItem(INVITES_KEY) || '[]');
    } catch {
      return [];
    }
  },

  saveInvite: (invite: InviteCodeEntry) => {
    const invites = DB.getInvites();
    invites.push(invite);
    localStorage.setItem(INVITES_KEY, JSON.stringify(invites));
  },

  deleteInvite: (code: string) => {
    let invites = DB.getInvites();
    invites = invites.filter(i => i.code !== code);
    localStorage.setItem(INVITES_KEY, JSON.stringify(invites));
  },

  validateAndUseInvite: (code: string): boolean => {
    const invites = DB.getInvites();
    const inv = invites.find(i => i.code.toLowerCase() === code.toLowerCase());
    if (!inv) return false;
    if (inv.usedCount >= inv.maxUses) return false;
    inv.usedCount += 1;
    localStorage.setItem(INVITES_KEY, JSON.stringify(invites));
    return true;
  },

  getMessages: (): ChatMessage[] => {
    initDatabase();
    try {
      return JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]');
    } catch {
      return [];
    }
  },

  saveMessage: (msg: ChatMessage) => {
    const msgs = DB.getMessages();
    msgs.push(msg);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(msgs));
  }
};