import React from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Sparkles,
  MessageSquareQuote,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const AdminLayout = () => {
  const { admin, loading, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center text-dark-muted">
        Verifying administrator session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Services', path: '/admin/services', icon: Wrench },
    { name: 'Skills & Tools', path: '/admin/skills', icon: Sparkles },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
    { name: 'Messages & Enquiries', path: '/admin/messages', icon: Mail },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text flex flex-col md:flex-row transition-colors">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-light-card dark:bg-dark-card border-r border-light-border dark:border-dark-border flex flex-col justify-between shrink-0">
        <div>
          {/* Logo / Header */}
          <div className="p-6 border-b border-light-border dark:border-dark-border flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2 font-bold text-base tracking-tight">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <span>Admin Portal</span>
            </Link>
            <ThemeToggle />
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-accent text-white shadow-glow-orange'
                      : 'text-light-muted dark:text-dark-muted hover:bg-light-bg dark:hover:bg-dark-secondary hover:text-accent dark:hover:text-accent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer / User Profile & Logout */}
        <div className="p-4 border-t border-light-border dark:border-dark-border space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="truncate">
              <div className="text-xs font-bold truncate">{admin?.name || 'Administrator'}</div>
              <div className="text-[11px] text-light-muted dark:text-dark-muted truncate">{admin?.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-light-bg dark:bg-dark-secondary text-xs font-medium hover:text-accent border border-light-border dark:border-dark-border"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={logout}
              className="p-2 rounded-lg bg-light-bg dark:bg-dark-secondary hover:bg-rose-500/20 hover:text-rose-400 text-light-muted dark:text-dark-muted border border-light-border dark:border-dark-border transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

