import React, { useState, useEffect } from 'react';
import {
  getAdminMessages,
  getAdminMessageById,
  updateAdminMessage,
  deleteAdminMessage,
} from '../../services/api';
import {
  Mail,
  MailOpen,
  Trash2,
  Search,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';

export const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [notes, setNotes] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await getAdminMessages({
        search: search || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
      });
      if (res.enquiries) setMessages(res.enquiries);
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMessages();
  };

  const handleOpenMessage = async (msg) => {
    try {
      const res = await getAdminMessageById(msg._id);
      if (res.enquiry) {
        setSelectedMessage(res.enquiry);
        setNotes(res.enquiry.notes || '');
        // Update local read state
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, isRead: true } : m))
        );
      }
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateAdminMessage(id, { status: newStatus });
      setAlert({ type: 'success', message: 'Status updated.' });
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage((prev) => ({ ...prev, status: newStatus }));
      }
      fetchMessages();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedMessage) return;
    try {
      await updateAdminMessage(selectedMessage._id, { notes });
      setAlert({ type: 'success', message: 'Notes saved.' });
      setSelectedMessage((prev) => ({ ...prev, notes }));
      fetchMessages();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete enquiry from "${name}"?`)) return;
    try {
      await deleteAdminMessage(id);
      setAlert({ type: 'success', message: 'Enquiry deleted.' });
      if (selectedMessage?._id === id) setSelectedMessage(null);
      fetchMessages();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contact Enquiries</h1>
          <p className="text-xs text-light-muted dark:text-dark-muted mt-1">
            Client messages submitted from the public contact form.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-3.5 h-3.5 text-light-muted dark:text-dark-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sender, email..."
              className="pl-8 pr-3 py-1.5 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-xs focus:outline-none focus:border-accent"
            />
          </form>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-xs"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="responded">Responded</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {alert.message && (
        <div className={`p-4 rounded-xl text-xs flex items-center justify-between ${
          alert.type === 'error' ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
        }`}>
          <span>{alert.message}</span>
          <button onClick={() => setAlert({ type: '', message: '' })}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Messages List Table */}
      <div className="bg-light-card dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-light-bg dark:bg-dark-secondary border-b border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Sender</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Message Snippet</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border dark:divide-dark-border">
              {messages.map((msg) => (
                <tr
                  key={msg._id}
                  onClick={() => handleOpenMessage(msg)}
                  className={`cursor-pointer hover:bg-light-bg/50 dark:hover:bg-dark-secondary/50 ${
                    !msg.isRead ? 'font-bold bg-accent/5' : ''
                  }`}
                >
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        msg.status === 'new'
                          ? 'bg-rose-500/10 text-rose-400'
                          : msg.status === 'in_progress'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-emerald-500/10 text-emerald-400'
                      }`}
                    >
                      {msg.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div>{msg.name}</div>
                    <div className="text-[11px] font-normal text-light-muted dark:text-dark-muted">{msg.email}</div>
                  </td>
                  <td className="py-3 px-4">{msg.projectType}</td>
                  <td className="py-3 px-4 max-w-xs truncate text-light-muted dark:text-dark-muted">
                    {msg.message}
                  </td>
                  <td className="py-3 px-4 text-light-muted dark:text-dark-muted whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleDelete(msg._id, msg.name)}
                      className="p-1.5 rounded hover:bg-rose-500/10 text-light-muted dark:text-dark-muted hover:text-rose-400"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message View Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border w-full max-w-xl rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-light-border dark:border-dark-border pb-3">
              <div>
                <h3 className="text-base font-bold">{selectedMessage.name}</h3>
                <a href={`mailto:${selectedMessage.email}`} className="text-xs text-accent hover:underline">
                  {selectedMessage.email}
                </a>
              </div>
              <button onClick={() => setSelectedMessage(null)}><X className="w-5 h-5" /></button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-light-muted dark:text-dark-muted block">Project Type:</span>
                <span className="font-bold">{selectedMessage.projectType}</span>
              </div>
              <div>
                <span className="text-light-muted dark:text-dark-muted block">Estimated Budget:</span>
                <span className="font-bold">{selectedMessage.budget}</span>
              </div>
            </div>

            <div>
              <span className="text-light-muted dark:text-dark-muted text-xs block mb-1">Message Content:</span>
              <div className="p-4 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-xs whitespace-pre-wrap leading-relaxed">
                {selectedMessage.message}
              </div>
            </div>

            {/* Email Dispatch Status */}
            <div className="p-3 rounded-xl bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border flex items-center justify-between text-xs">
              <span className="text-light-muted dark:text-dark-muted">Email Notification:</span>
              <span className="font-semibold capitalize text-accent">
                {selectedMessage.emailStatus || 'pending'}
              </span>
            </div>

            {/* Administrative Notes & Status Update */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-light-muted dark:text-dark-muted">Status</label>
                <div className="flex gap-1.5">
                  {['new', 'in_progress', 'responded', 'archived'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleUpdateStatus(selectedMessage._id, st)}
                      className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md border ${
                        selectedMessage.status === st
                          ? 'bg-accent text-white border-accent'
                          : 'border-light-border dark:border-dark-border hover:border-accent'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-light-muted dark:text-dark-muted block mb-1">Internal Notes</label>
                <textarea
                  rows="2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record follow-up details, quotes sent, or meeting links..."
                  className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-secondary border border-light-border dark:border-dark-border text-xs"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Portfolio Enquiry (${selectedMessage.projectType})`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email Client</span>
                </a>

                <button
                  onClick={handleSaveNotes}
                  className="px-4 py-2 rounded-xl bg-accent text-white font-bold text-xs"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

