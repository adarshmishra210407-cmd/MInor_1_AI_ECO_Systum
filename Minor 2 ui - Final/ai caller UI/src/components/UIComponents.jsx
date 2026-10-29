import React from 'react';
import {
  LayoutDashboard,
  History,
  Bot,
  FileText,
  BookOpen,
  BarChart3,
  Phone,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export function Navigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'workspace', label: 'Workspace', icon: LayoutDashboard },
    { id: 'history', label: 'Call History', icon: History },
    { id: 'profile', label: 'AI Profile', icon: Bot },
    { id: 'scripts', label: 'Scripts', icon: FileText },
    { id: 'library', label: 'Reference Library', icon: BookOpen },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-subtleBorder flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="p-6 border-b border-subtleBorder flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-paleBlue flex items-center justify-center text-dusty shadow-sm">
          <Phone className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-heading text-lg tracking-tight flex items-center gap-1.5">
            NEXUS <span className="text-dusty font-normal">AI</span>
          </h1>
          <p className="text-xs text-muted font-medium">AI Caller Bot v3.2</p>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="p-4 space-y-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-paleBlue text-heading font-semibold shadow-sm'
                  : 'text-bodyText hover:bg-pageBg hover:text-heading'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-dusty' : 'text-muted'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Status Badge Footer */}
      <div className="p-4 m-4 bg-paleBlue/50 rounded-2xl border border-subtleBorder">
        <div className="flex items-center space-x-2 text-xs font-semibold text-heading mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-successGreen animate-pulse"></span>
          <span>System Online</span>
        </div>
        <p className="text-xs text-muted">All AI telephony pipelines and secure voice nodes operational.</p>
      </div>
    </aside>
  );
}

export function Header({ activeTab }) {
  const titles = {
    workspace: { title: 'Workspace & Live Call Simulator', subtitle: 'Monitor active inbound/outgoing calls and operate manual demo flows.' },
    history: { title: 'Call History & Records', subtitle: 'Search, filter, review transcripts, and export historical demo call logs.' },
    profile: { title: 'AI Profile & Persona Settings', subtitle: 'Configure voice presets, speech parameters, and persona behaviors.' },
    scripts: { title: 'Call Script Manager & Flow Preview', subtitle: 'Edit conversational flow templates and review branch logic.' },
    library: { title: 'FAQ & Reference Library', subtitle: 'Manage knowledge base entries, FAQs, and reference documents.' },
    reports: { title: 'Performance Reports & Analytics', subtitle: 'Analyze call volume, duration metrics, outcomes, and agent efficiency.' }
  };

  const current = titles[activeTab] || titles.workspace;

  return (
    <header className="bg-surface border-b border-subtleBorder px-8 py-5 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-heading font-heading">{current.title}</h2>
        <p className="text-xs text-bodyText mt-0.5">{current.subtitle}</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-blush/60 text-dusty px-3 py-1.5 rounded-lg text-xs font-semibold border border-dusty/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Demo Mode Active</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-paleBlue text-heading flex items-center justify-center font-bold text-sm border border-subtleBorder shadow-sm">
          AM
        </div>
      </div>
    </header>
  );
}

export function OutcomeBadge({ outcome }) {
  const styles = {
    Completed: 'bg-successGreen/10 text-successGreen border-successGreen/20',
    Missed: 'bg-warningYellow/10 text-warningYellow border-warningYellow/20',
    Failed: 'bg-errorRed/10 text-errorRed border-errorRed/20',
    'Follow-up': 'bg-paleBlue text-heading border-subtleBorder font-semibold'
  };

  const currentStyle = styles[outcome] || 'bg-paleBlue text-bodyText border-subtleBorder';

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${currentStyle}`}>
      {outcome}
    </span>
  );
}

export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-surface rounded-2xl shadow-subtle border border-subtleBorder w-full max-w-lg overflow-hidden transition-all transform scale-100">
        <div className="px-6 py-4 border-b border-subtleBorder flex items-center justify-between bg-paleBlue/30">
          <h3 className="font-heading font-bold text-heading text-base">{title}</h3>
          <button
            onClick={onClose}
            className="text-muted hover:text-heading p-1 rounded-lg hover:bg-paleBlue transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
