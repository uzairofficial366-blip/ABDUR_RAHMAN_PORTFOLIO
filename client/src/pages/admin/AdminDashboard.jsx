import React, { useState, useEffect } from 'react';
import { getAdminDashboardMetrics } from '../../services/api';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  FileEdit,
  Mail,
  MailWarning,
  MessageSquareQuote,
  ArrowUpRight,
  Clock,
  CheckCircle,
} from 'lucide-react';

export const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await getAdminDashboardMetrics();
        if (res.metrics) {
          setMetrics(res.metrics);
        }
      } catch (err) {
        console.error('Failed to load metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <div className="text-sm text-light-muted dark:text-dark-muted">Loading dashboard analytics...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview Dashboard</h1>
        <p className="text-xs text-light-muted dark:text-dark-muted mt-1">
          Real-time summary of portfolio content, client enquiries, and publication status.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase text-light-muted dark:text-dark-muted">
              Published Projects
            </span>
            <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold">{metrics?.publishedProjectsCount ?? 0}</div>
          <div className="text-[11px] text-light-muted dark:text-dark-muted mt-1">
            Visible to public visitors
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase text-light-muted dark:text-dark-muted">
              Draft Projects
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <FileEdit className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold">{metrics?.draftProjectsCount ?? 0}</div>
          <div className="text-[11px] text-light-muted dark:text-dark-muted mt-1">
            Hidden from public
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase text-light-muted dark:text-dark-muted">
              Unread Enquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <MailWarning className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-accent">{metrics?.unreadEnquiriesCount ?? 0}</div>
          <div className="text-[11px] text-light-muted dark:text-dark-muted mt-1">
            Total Enquiries: {metrics?.totalEnquiriesCount ?? 0}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase text-light-muted dark:text-dark-muted">
              Published Reviews
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold">{metrics?.publishedTestimonialsCount ?? 0}</div>
          <div className="text-[11px] text-light-muted dark:text-dark-muted mt-1">
            Verified client reviews
          </div>
        </div>
      </div>

      {/* Recent Enquiries Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Recent Client Enquiries</h2>
            <p className="text-xs text-light-muted dark:text-dark-muted">
              Latest form submissions submitted through the contact section.
            </p>
          </div>
          <Link
            to="/admin/messages"
            className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {metrics?.recentEnquiries && metrics.recentEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted uppercase font-semibold">
                <tr>
                  <th className="py-3 px-2">Sender</th>
                  <th className="py-3 px-2">Project Type</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-border dark:divide-dark-border">
                {metrics.recentEnquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-light-bg/50 dark:hover:bg-dark-secondary/50">
                    <td className="py-3.5 px-2">
                      <div className="font-bold text-light-text dark:text-dark-text">{enq.name}</div>
                      <div className="text-[11px] text-light-muted dark:text-dark-muted">{enq.email}</div>
                    </td>
                    <td className="py-3.5 px-2 font-medium">{enq.projectType}</td>
                    <td className="py-3.5 px-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          enq.status === 'new'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : enq.status === 'in_progress'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-light-muted dark:text-dark-muted">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-2 text-right">
                      <Link
                        to={`/admin/messages`}
                        className="text-accent hover:underline font-semibold"
                      >
                        View &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-xs text-light-muted dark:text-dark-muted">
            No contact enquiries recorded yet. Submissions from the public form will appear here.
          </div>
        )}
      </div>
    </div>
  );
};

