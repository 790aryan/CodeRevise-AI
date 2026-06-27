import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { APP_NAME, NAV_ITEMS } from '@/constants/app.js';
import { useAuth } from '@/context/AuthContext.jsx';
import { logoutUser } from '@/services/auth.service.js';
import { LogOut, Plus, UserCircle, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Sidebar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  async function handleLogout() {
    try {
      await logoutUser();
      setUser(null);
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed.');
    } finally {
      setShowLogoutModal(false);
    }
  }

  return (
    <aside className="hidden w-72 border-r border-white/10 bg-surface lg:flex lg:flex-col">
      {/* Brand & User Profile */}
      <div className="p-6 border-b border-white/5">
        <h1 className="text-xl font-bold tracking-tight text-white mb-6 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center font-black text-background">C</div>
          {APP_NAME}
        </h1>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
          <UserCircle className="h-10 w-10 text-gray-500" />
          <div className="overflow-hidden">
            <p className="font-semibold text-sm truncate">{user?.name ?? 'Guest User'}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email ?? '---'}</p>
          </div>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <button
          onClick={() => navigate('/revision-sessions/new')}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 py-3 text-sm font-semibold text-white border border-white/10 hover:bg-white/10 transition"
        >
          <Plus size={16} /> New Revision Session
        </button>
        
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex w-full items-center justify-between px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition"
        >
          <span>Logout</span>
          <LogOut size={16} />
        </button>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-surface p-6 shadow-2xl">
            <h2 className="text-lg font-bold">Confirm Logout</h2>
            <p className="mt-2 text-sm text-gray-400">You will need to sign in again to access your workspace.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-2.5 rounded-xl border border-white/10 font-medium">Cancel</button>
              <button onClick={handleLogout} className="flex-1 py-2.5 rounded-xl bg-red-500 font-medium text-white hover:bg-red-600">Logout</button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}