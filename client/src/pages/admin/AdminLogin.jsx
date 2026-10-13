import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { adminLogin } from '../../services/api';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import { Lock, Mail, ArrowRight, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';

export const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect
  if (isAuthenticated) {
    navigate('/admin', { replace: true });
  }

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await adminLogin(credentials);
      if (response.success && response.token) {
        login(response.token, response.admin);
        const from = location.state?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Invalid administrator credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text flex flex-col justify-center items-center px-4 relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-3xl p-8 sm:p-10 shadow-2xl">
        <div className="text-center mb-8 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
          <p className="text-xs text-light-muted dark:text-dark-muted">
            Authenticate to manage portfolio projects, services, and enquiries.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-muted dark:text-dark-muted mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-light-muted dark:text-dark-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                required
                value={credentials.email}
                onChange={handleChange}
                placeholder="admin@abdurrahmankhan.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-sm text-light-text dark:text-dark-text focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-light-muted dark:text-dark-muted mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-light-muted dark:text-dark-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                required
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-sm text-light-text dark:text-dark-text focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white py-3.5 rounded-xl font-semibold text-sm transition-all shadow-glow-orange cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-light-border dark:border-dark-border text-center">
          <Link to="/" className="text-xs text-light-muted dark:text-dark-muted hover:text-accent transition-colors">
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};

