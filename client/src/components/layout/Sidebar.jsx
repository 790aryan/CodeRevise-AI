import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { APP_NAME, NAV_ITEMS } from '@/constants/app.js';
import { useAuth } from '@/context/AuthContext.jsx';
import { logoutUser } from '@/services/auth.service.js';

export default function Sidebar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] =
  useState(false);

  async function handleLogout() {
  try {
    await logoutUser();

    setShowLogoutModal(false);

    setUser(null);

    navigate('/login');
  } catch (error) {
    console.error(error);

    alert('Logout failed.');
  }
}

  return (
    <aside className="hidden w-72 border-r border-white/10 bg-surface/80 lg:flex lg:flex-col">
      <div className="border-b border-white/10 p-6">
        <h1 className="text-2xl font-bold">
          {APP_NAME}
        </h1>

        <div className="mt-6 rounded-lg border border-white/10 bg-background/40 p-4">
          <p className="text-xs uppercase tracking-wider text-text-muted">
            Signed in as
          </p>

          <h2 className="mt-2 font-semibold">
            {user?.name ?? 'Guest'}
          </h2>

          <p className="text-sm text-text-muted">
            {user?.email ?? 'No email'}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-6">
{NAV_ITEMS.map((item) => {
  const Icon = item.icon;

  return (
    <NavLink
      key={item.href}
      to={item.href}
      end={item.href === '/problems'}
      className={({ isActive }) =>
        `
        flex
        items-center
        gap-3
        rounded-lg
        px-4
        py-3
        font-medium
        transition-all
        ${
  isActive
  ? `
      bg-accent
      text-background
      font-semibold
      shadow-lg
    `
  : `
      text-text-muted
      hover:bg-white/10
      hover:text-white
    `
        }
        `
      }
    >
      <Icon size={20} />

      <span>{item.label}</span>
    </NavLink>
  );
})}
            </nav>

      <div className="border-t border-white/10 p-6">
  <button
    onClick={() => setShowLogoutModal(true)}
    className="
      w-full
      rounded-lg
      border
      border-red-500/30
      py-3
      text-red-400
      transition
      hover:bg-red-500/10
    "
  >
    Logout
  </button>
            </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-surface p-6 shadow-2xl">

            <h2 className="text-xl font-semibold">
              Logout
            </h2>

            <p className="mt-3 text-text-muted">
              Are you sure you want to logout?
            </p>

            <div className="mt-8 flex justify-end gap-3">

              <button
                onClick={() => setShowLogoutModal(false)}
                className="
                  rounded-lg
                  border
                  border-white/10
                  px-5
                  py-2
                  hover:bg-white/10
                "
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="
                  rounded-lg
                  bg-red-500
                  px-5
                  py-2
                  font-medium
                  text-white
                  hover:bg-red-600
                "
              >
                Logout
              </button>

            </div>

          </div>
        </div>
      )}

    </aside>
  );
}