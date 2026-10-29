import React, { useState } from 'react';
import {
  LayoutDashboard,
  PhoneCall,
  Mail,
  Calendar,
  Activity,
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  Plus,
  Play,
  Pause,
  Copy,
  Edit3,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Shield,
  ArrowUpRight,
  Filter,
  Sparkles,
  X,
  Check,
  Menu,
  ShieldCheck,
  UserPlus
} from 'lucide-react';
import {
  initialAutomations,
  initialActivityEvents,
  initialNotifications,
  initialTeamMembers,
  analyticsData
} from '../services/dashboardData';

export default function DashboardApp({ onBackToLanding }) {
  // Navigation State
  const [currentTab, setCurrentTab] = useState('overview'); // overview, callers, emails, scheduler, activity, analytics, team, settings
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data State
  const [automations, setAutomations] = useState(initialAutomations);
  const [activityEvents, setActivityEvents] = useState(initialActivityEvents);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);

  // UI Interactive States
  const [toastMessage, setToastMessage] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createModuleType, setCreateModuleType] = useState('AI Caller Bot');
  const [createFormName, setCreateFormName] = useState('');
  const [createFormDesc, setCreateFormDesc] = useState('');

  const [editItem, setEditItem] = useState(null); // { moduleKey, item }
  const [deleteConfirmItem, setDeleteConfirmItem] = useState(null); // { moduleKey, id, name }
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Automation Editor');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handlers for Shared Automation Controls
  const handleToggleStatus = (moduleKey, id) => {
    setAutomations(prev => ({
      ...prev,
      [moduleKey]: prev[moduleKey].map(item => {
        if (item.id === id) {
          const newStatus = item.status === 'Active' ? 'Paused' : 'Active';
          showToast(`Automation "${item.name}" is now ${newStatus}`);
          return { ...item, status: newStatus };
        }
        return item;
      })
    }));
  };

  const handleDuplicate = (moduleKey, item) => {
    const duplicated = {
      ...item,
      id: `${moduleKey}-${Date.now()}`,
      name: `${item.name} (Copy)`,
      status: 'Paused',
      lastRun: 'Never'
    };
    setAutomations(prev => ({
      ...prev,
      [moduleKey]: [duplicated, ...prev[moduleKey]]
    }));
    showToast(`Successfully duplicated "${item.name}"`);
  };

  const handleDelete = () => {
    if (!deleteConfirmItem) return;
    const { moduleKey, id, name } = deleteConfirmItem;
    setAutomations(prev => ({
      ...prev,
      [moduleKey]: prev[moduleKey].filter(i => i.id !== id)
    }));
    setDeleteConfirmItem(null);
    showToast(`Deleted "${name}" successfully`);
  };

  const handleCreateAutomation = (e) => {
    e.preventDefault();
    if (!createFormName.trim()) return;

    let moduleKey = 'callBot';
    let typeName = 'AI Caller Bot';
    if (createModuleType === 'Email Automation') { moduleKey = 'email'; typeName = 'Email Automation'; }
    if (createModuleType === 'Smart Scheduler') { moduleKey = 'scheduler'; typeName = 'Smart Scheduler'; }

    const newItem = {
      id: `${moduleKey}-${Date.now()}`,
      name: createFormName,
      description: createFormDesc || 'Newly created automation workflow rule.',
      status: 'Active',
      lastRun: 'Just now',
      successRate: '100%',
      totalCalls: 0,
      totalSent: 0,
      totalBooked: 0,
      type: typeName,
      health: 'Optimal'
    };

    setAutomations(prev => ({
      ...prev,
      [moduleKey]: [newItem, ...prev[moduleKey]]
    }));

    // Add activity
    setActivityEvents(prev => [
      {
        id: `evt-${Date.now()}`,
        type: 'Automation Created',
        module: typeName,
        description: `Created new workflow rule: ${createFormName}`,
        timestamp: 'Just now',
        status: 'Success',
        client: 'Workspace User'
      },
      ...prev
    ]);

    setCreateFormName('');
    setCreateFormDesc('');
    setCreateModalOpen(false);
    showToast(`Created "${newItem.name}" successfully`);
  };

  const handleManualRefresh = () => {
    showToast('Dashboard data successfully refreshed.');
  };

  return (
    <div className="min-h-screen bg-[#F2F7FC] text-[#626B78] flex font-sans selection:bg-[#C98298]/20 selection:text-[#20242C]">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#24242B] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#C98298]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Sidebar (Desktop) */}
      <aside className={`hidden lg:flex flex-col bg-[#FFFFFF] border-r border-[#E3EAF2] transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'} sticky top-0 h-screen z-30`}>
        {/* Brand Header */}
        <div className="h-20 border-b border-[#E3EAF2] flex items-center justify-between px-6">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C98298] to-[#D6E6F2] flex items-center justify-center shrink-0 shadow-nexus-sm">
              <span className="text-[#24242B] font-bold text-xl">N</span>
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col truncate">
                <span className="font-bold text-lg text-[#20242C] tracking-tight truncate">NEXUS AI</span>
                <span className="text-[10px] text-[#87909D] uppercase tracking-wider">Enterprise Workspace</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'callers', label: 'AI Caller Bot', icon: PhoneCall },
            { id: 'emails', label: 'Email Automation', icon: Mail },
            { id: 'scheduler', label: 'Smart Scheduler', icon: Calendar },
            { id: 'activity', label: 'Activity', icon: Activity },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'team', label: 'Team', icon: Users },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all group ${
                  active
                    ? 'bg-[#24242B] text-white shadow-nexus-sm'
                    : 'text-[#626B78] hover:bg-[#E8F1F8]/60 hover:text-[#20242C]'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-[#C98298]' : 'text-[#87909D] group-hover:text-[#20242C]'}`} />
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer / Collapse toggle & Back to Landing */}
        <div className="p-4 border-t border-[#E3EAF2] space-y-3">
          {!sidebarCollapsed && (
            <button
              onClick={onBackToLanding}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#E8F1F8] hover:bg-[#D6E6F2] text-[#20242C] text-xs font-semibold transition-colors"
            >
              <span>← Landing Page</span>
            </button>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center py-2 text-xs text-[#87909D] hover:text-[#20242C]"
          >
            {sidebarCollapsed ? 'Expand →' : 'Collapse Sidebar'}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E3EAF2] h-20 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#20242C] hover:bg-[#E8F1F8]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#20242C] capitalize">
                {currentTab === 'callers' ? 'AI Caller Bot' : currentTab === 'emails' ? 'Email Automation' : currentTab === 'scheduler' ? 'Smart Scheduler' : currentTab}
              </h1>
              <p className="text-xs text-[#87909D] hidden sm:block">
                Enterprise automation workspace • Connected to local demo state
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Manual Refresh Button */}
            <button
              onClick={handleManualRefresh}
              className="p-2.5 rounded-xl border border-[#E3EAF2] bg-[#FFFFFF] hover:bg-[#E8F1F8] text-[#626B78] hover:text-[#20242C] transition-colors flex items-center gap-2 text-xs font-medium"
              title="Manual Refresh"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden md:inline">Refresh</span>
            </button>

            {/* Notifications Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 rounded-xl border border-[#E3EAF2] bg-[#FFFFFF] hover:bg-[#E8F1F8] text-[#626B78] hover:text-[#20242C] transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C98298]"></span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#FFFFFF] border border-[#E3EAF2] rounded-2xl shadow-2xl py-3 z-50 animate-fadeIn">
                  <div className="px-4 pb-3 border-b border-[#E3EAF2] flex items-center justify-between">
                    <span className="font-bold text-sm text-[#20242C]">Notifications</span>
                    <button
                      onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                      className="text-xs text-[#C98298] font-semibold hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-[#E3EAF2]">
                    {notifications.map(notif => (
                      <div key={notif.id} className={`p-3.5 hover:bg-[#F2F7FC] transition-colors ${!notif.read ? 'bg-[#E8F1F8]/30' : ''}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-[#20242C]">{notif.title}</span>
                          <span className="text-[10px] text-[#87909D]">{notif.timestamp}</span>
                        </div>
                        <p className="text-xs text-[#626B78]">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2.5 p-1.5 rounded-xl border border-[#E3EAF2] bg-[#FFFFFF] hover:bg-[#E8F1F8] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#C98298] text-white flex items-center justify-center font-bold text-xs">
                  AM
                </div>
                <span className="text-xs font-medium text-[#20242C] hidden md:inline">Adarsh Mishra</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#87909D]" />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-[#FFFFFF] border border-[#E3EAF2] rounded-2xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-[#E3EAF2]">
                    <p className="text-xs font-bold text-[#20242C]">Adarsh Mishra</p>
                    <p className="text-[10px] text-[#87909D]">adarsh@nexus-ai.app</p>
                  </div>
                  <button
                    onClick={() => { setCurrentTab('settings'); setProfileMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-[#626B78] hover:bg-[#F2F7FC]"
                  >
                    Workspace Settings
                  </button>
                  <button
                    onClick={onBackToLanding}
                    className="w-full text-left px-4 py-2 text-xs text-[#B93845] hover:bg-[#F5E8ED] flex items-center gap-2 border-t border-[#E3EAF2] mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Exit to Landing</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Sidebar overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-[#24242B]/50 backdrop-blur-sm flex">
            <div className="w-72 bg-[#FFFFFF] h-full shadow-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C98298] to-[#D6E6F2] flex items-center justify-center text-[#24242B] font-bold">N</div>
                    <span className="font-bold text-lg text-[#20242C]">NEXUS AI</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-[#87909D]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {[
                    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                    { id: 'callers', label: 'AI Caller Bot', icon: PhoneCall },
                    { id: 'emails', label: 'Email Automation', icon: Mail },
                    { id: 'scheduler', label: 'Smart Scheduler', icon: Calendar },
                    { id: 'activity', label: 'Activity', icon: Activity },
                    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                    { id: 'team', label: 'Team', icon: Users },
                    { id: 'settings', label: 'Settings', icon: Settings },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => { setCurrentTab(item.id); setMobileMenuOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${currentTab === item.id ? 'bg-[#24242B] text-white' : 'text-[#626B78] hover:bg-[#E8F1F8]'}`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={onBackToLanding}
                className="w-full py-3 rounded-xl bg-[#E8F1F8] text-[#20242C] font-semibold text-xs text-center"
              >
                Return to Landing Page
              </button>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
          </div>
        )}

        {/* Dashboard View Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {currentTab === 'overview' && (
            <OverviewSection
              automations={automations}
              activityEvents={activityEvents}
              teamMembers={teamMembers}
              analyticsData={analyticsData}
              onNavigate={setCurrentTab}
              onToggleStatus={handleToggleStatus}
              onDuplicate={handleDuplicate}
              onOpenCreate={() => setCreateModalOpen(true)}
            />
          )}

          {currentTab === 'callers' && (
            <ModuleManagementView
              title="AI Caller Bot"
              moduleKey="callBot"
              items={automations.callBot}
              onToggleStatus={handleToggleStatus}
              onDuplicate={handleDuplicate}
              onDeleteRequest={(item) => setDeleteConfirmItem({ moduleKey: 'callBot', id: item.id, name: item.name })}
              onOpenCreate={() => { setCreateModuleType('AI Caller Bot'); setCreateModalOpen(true); }}
            />
          )}

          {currentTab === 'emails' && (
            <ModuleManagementView
              title="Email Automation"
              moduleKey="email"
              items={automations.email}
              onToggleStatus={handleToggleStatus}
              onDuplicate={handleDuplicate}
              onDeleteRequest={(item) => setDeleteConfirmItem({ moduleKey: 'email', id: item.id, name: item.name })}
              onOpenCreate={() => { setCreateModuleType('Email Automation'); setCreateModalOpen(true); }}
            />
          )}

          {currentTab === 'scheduler' && (
            <ModuleManagementView
              title="Smart Scheduler"
              moduleKey="scheduler"
              items={automations.scheduler}
              onToggleStatus={handleToggleStatus}
              onDuplicate={handleDuplicate}
              onDeleteRequest={(item) => setDeleteConfirmItem({ moduleKey: 'scheduler', id: item.id, name: item.name })}
              onOpenCreate={() => { setCreateModuleType('Smart Scheduler'); setCreateModalOpen(true); }}
            />
          )}

          {currentTab === 'activity' && (
            <ActivityTimelineView events={activityEvents} />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView analyticsData={analyticsData} />
          )}

          {currentTab === 'team' && (
            <TeamManagementView
              teamMembers={teamMembers}
              setTeamMembers={setTeamMembers}
              onOpenInvite={() => setInviteModalOpen(true)}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView showToast={showToast} />
          )}
        </main>

      </div>

      {/* Create Automation Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#24242B]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-3xl max-w-md w-full p-8 shadow-2xl border border-[#E3EAF2]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#20242C]">Create New Automation</h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-[#87909D] hover:text-[#20242C]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAutomation} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#20242C] mb-1">Module Type</label>
                <select
                  value={createModuleType}
                  onChange={(e) => setCreateModuleType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] bg-[#F2F7FC] text-sm text-[#20242C] focus:ring-2 focus:ring-[#C98298] outline-none"
                >
                  <option value="AI Caller Bot">AI Caller Bot</option>
                  <option value="Email Automation">Email Automation</option>
                  <option value="Smart Scheduler">Smart Scheduler</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#20242C] mb-1">Automation Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q1 Outbound Follow-up"
                  value={createFormName}
                  onChange={(e) => setCreateFormName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] bg-[#F2F7FC] text-sm text-[#20242C] focus:ring-2 focus:ring-[#C98298] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#20242C] mb-1">Description / Goal</label>
                <textarea
                  rows="3"
                  placeholder="Briefly describe what this automation rule does..."
                  value={createFormDesc}
                  onChange={(e) => setCreateFormDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] bg-[#F2F7FC] text-sm text-[#20242C] focus:ring-2 focus:ring-[#C98298] outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E3EAF2]">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E3EAF2] text-xs font-semibold text-[#626B78] hover:bg-[#F2F7FC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#24242B] text-white text-xs font-semibold hover:bg-[#383841]"
                >
                  Save & Activate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 bg-[#24242B]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E3EAF2] text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#F5E8ED] text-[#B93845] flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#20242C]">Confirm Deletion</h3>
            <p className="text-xs text-[#626B78]">
              Are you sure you want to delete <span className="font-semibold text-[#20242C]">"{deleteConfirmItem.name}"</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmItem(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#E3EAF2] text-xs font-semibold text-[#626B78]"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 rounded-xl bg-[#B93845] text-white text-xs font-semibold hover:bg-[#962d38]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Team Member Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#24242B]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-3xl max-w-md w-full p-8 shadow-2xl border border-[#E3EAF2]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#20242C]">Invite Team Member</h3>
              <button onClick={() => setInviteModalOpen(false)} className="text-[#87909D]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#20242C] mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] bg-[#F2F7FC] text-sm text-[#20242C] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#20242C] mb-1">Role & Permissions</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E3EAF2] bg-[#F2F7FC] text-sm text-[#20242C] outline-none"
                >
                  <option value="Workspace Owner">Workspace Owner</option>
                  <option value="Automation Editor">Automation Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setInviteModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E3EAF2] text-xs font-semibold text-[#626B78]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!inviteEmail) return;
                    const newMember = {
                      id: `team-${Date.now()}`,
                      name: inviteEmail.split('@')[0],
                      email: inviteEmail,
                      role: inviteRole,
                      status: 'Invited',
                      avatar: inviteEmail.substring(0, 2).toUpperCase()
                    };
                    setTeamMembers([...teamMembers, newMember]);
                    setInviteEmail('');
                    setInviteModalOpen(false);
                    showToast(`Invitation sent to ${inviteEmail}`);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#24242B] text-white text-xs font-semibold"
                >
                  Send Invitation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Sub-Component: Overview Section
function OverviewSection({ automations, activityEvents, teamMembers, analyticsData, onNavigate, onToggleStatus, onDuplicate, onOpenCreate }) {
  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Top Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E3EAF2] shadow-nexus-sm">
          <div className="text-xs font-medium text-[#87909D]">Total Actions Executed</div>
          <div className="text-2xl font-bold text-[#20242C] mt-2">{analyticsData.overviewMetrics.totalExecutions}</div>
          <div className="text-xs text-[#287A50] font-medium mt-1 flex items-center gap-1">
            <span>↑ 14.2% vs last week</span>
          </div>
        </div>
        <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E3EAF2] shadow-nexus-sm">
          <div className="text-xs font-medium text-[#87909D]">Overall Success Rate</div>
          <div className="text-2xl font-bold text-[#20242C] mt-2">{analyticsData.overviewMetrics.successRate}</div>
          <div className="text-xs text-[#287A50] font-medium mt-1 flex items-center gap-1">
            <span>Optimal performance</span>
          </div>
        </div>
        <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E3EAF2] shadow-nexus-sm">
          <div className="text-xs font-medium text-[#87909D]">Active Workflows</div>
          <div className="text-2xl font-bold text-[#20242C] mt-2">{analyticsData.overviewMetrics.activeAutomationsCount}</div>
          <div className="text-xs text-[#87909D] font-medium mt-1">Across 3 core modules</div>
        </div>
        <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E3EAF2] shadow-nexus-sm">
          <div className="text-xs font-medium text-[#87909D]">Operational Time Saved</div>
          <div className="text-2xl font-bold text-[#20242C] mt-2">{analyticsData.overviewMetrics.hoursSaved}</div>
          <div className="text-xs text-[#C98298] font-medium mt-1">Estimated automated savings</div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-[#E8F1F8] border border-[#E3EAF2] p-4 sm:p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFFFFF] flex items-center justify-center text-[#C98298] shadow-nexus-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#20242C]">Quick Enterprise Controls</h3>
            <p className="text-xs text-[#626B78]">Instantly deploy new rules or manage ongoing workflows.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenCreate}
            className="bg-[#24242B] hover:bg-[#383841] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-nexus-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Automation</span>
          </button>
          <button
            onClick={() => onNavigate('analytics')}
            className="bg-[#FFFFFF] hover:bg-[#F2F7FC] text-[#20242C] border border-[#E3EAF2] text-xs font-semibold px-4 py-2.5 rounded-xl"
          >
            View Reports
          </button>
        </div>
      </div>

      {/* Automation Module Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#20242C]">Automation Modules</h3>
          <span className="text-xs text-[#87909D]">3 Core Systems Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI Caller Bot Card */}
          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E3EAF2] shadow-nexus-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#E8F1F8] flex items-center justify-center text-[#20242C]">
                  <PhoneCall className="w-5 h-5 text-[#C98298]" />
                </div>
                <span className="text-xs bg-[#287A50]/10 text-[#287A50] font-semibold px-2.5 py-1 rounded-full">
                  {automations.callBot.filter(i => i.status === 'Active').length} Active
                </span>
              </div>
              <h4 className="font-bold text-[#20242C] text-base mb-1">AI Caller Bot</h4>
              <p className="text-xs text-[#626B78] mb-4">Autonomous voice agents conducting outbound sales and support.</p>

              <div className="space-y-2 bg-[#F2F7FC] p-3 rounded-2xl text-xs">
                {automations.callBot.slice(0, 1).map(b => (
                  <div key={b.id} className="flex items-center justify-between">
                    <span className="font-medium text-[#20242C] truncate max-w-[140px]">{b.name}</span>
                    <span className="text-[#287A50] font-semibold">{b.successRate}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E3EAF2] flex items-center justify-between">
              <span className="text-[11px] text-[#87909D]">1,428 calls logged</span>
              <button
                onClick={() => onNavigate('callers')}
                className="text-xs font-semibold text-[#20242C] hover:text-[#C98298] flex items-center gap-1"
              >
                <span>Open Module</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Email Automation Card */}
          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E3EAF2] shadow-nexus-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5E8ED] flex items-center justify-center text-[#C98298]">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-xs bg-[#287A50]/10 text-[#287A50] font-semibold px-2.5 py-1 rounded-full">
                  {automations.email.filter(i => i.status === 'Active').length} Active
                </span>
              </div>
              <h4 className="font-bold text-[#20242C] text-base mb-1">Email Automation</h4>
              <p className="text-xs text-[#626B78] mb-4">Context-aware drip campaigns adapting dynamically.</p>

              <div className="space-y-2 bg-[#F2F7FC] p-3 rounded-2xl text-xs">
                {automations.email.slice(0, 1).map(e => (
                  <div key={e.id} className="flex items-center justify-between">
                    <span className="font-medium text-[#20242C] truncate max-w-[140px]">{e.name}</span>
                    <span className="text-[#287A50] font-semibold">{e.deliveryRate}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E3EAF2] flex items-center justify-between">
              <span className="text-[11px] text-[#87909D]">8,930 sent</span>
              <button
                onClick={() => onNavigate('emails')}
                className="text-xs font-semibold text-[#20242C] hover:text-[#C98298] flex items-center gap-1"
              >
                <span>Open Module</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Smart Scheduler Card */}
          <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E3EAF2] shadow-nexus-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#E8F1F8] flex items-center justify-center text-[#20242C]">
                  <Calendar className="w-5 h-5 text-[#C98298]" />
                </div>
                <span className="text-xs bg-[#287A50]/10 text-[#287A50] font-semibold px-2.5 py-1 rounded-full">
                  {automations.scheduler.filter(i => i.status === 'Active').length} Active
                </span>
              </div>
              <h4 className="font-bold text-[#20242C] text-base mb-1">Smart Scheduler</h4>
              <p className="text-xs text-[#626B78] mb-4">Automated calendar coordination eliminating ping-pong.</p>

              <div className="space-y-2 bg-[#F2F7FC] p-3 rounded-2xl text-xs">
                {automations.scheduler.slice(0, 1).map(s => (
                  <div key={s.id} className="flex items-center justify-between">
                    <span className="font-medium text-[#20242C] truncate max-w-[140px]">{s.name}</span>
                    <span className="text-[#287A50] font-semibold">{s.bookingRate}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E3EAF2] flex items-center justify-between">
              <span className="text-[11px] text-[#87909D]">342 booked</span>
              <button
                onClick={() => onNavigate('scheduler')}
                className="text-xs font-semibold text-[#20242C] hover:text-[#C98298] flex items-center gap-1"
              >
                <span>Open Module</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Recent Activity & Team Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Activity Timeline */}
        <div className="lg:col-span-8 bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#E3EAF2] shadow-nexus-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-base text-[#20242C]">Recent Activity Timeline</h3>
            <button onClick={() => onNavigate('activity')} className="text-xs text-[#C98298] font-semibold hover:underline">
              View all
            </button>
          </div>

          <div className="space-y-4">
            {activityEvents.slice(0, 4).map(evt => (
              <div key={evt.id} className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#F2F7FC] border border-[#E3EAF2]/60">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${evt.status === 'Success' ? 'bg-[#287A50]/10 text-[#287A50]' : 'bg-[#946018]/10 text-[#946018]'}`}>
                  {evt.status === 'Success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#20242C] truncate">{evt.type}</span>
                    <span className="text-[10px] text-[#87909D]">{evt.timestamp}</span>
                  </div>
                  <p className="text-xs text-[#626B78] mt-0.5 truncate">{evt.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-[#87909D]">
                    <span className="bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#E3EAF2]">{evt.module}</span>
                    <span>• {evt.client}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Activity & Status */}
        <div className="lg:col-span-4 bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#E3EAF2] shadow-nexus-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-base text-[#20242C]">Team Members</h3>
              <button onClick={() => onNavigate('team')} className="text-xs text-[#C98298] font-semibold hover:underline">
                Manage
              </button>
            </div>

            <div className="space-y-3">
              {teamMembers.map(member => (
                <div key={member.id} className="flex items-center justify-between p-3 rounded-2xl bg-[#F2F7FC] border border-[#E3EAF2]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E8F1F8] text-[#20242C] font-bold text-xs flex items-center justify-center">
                      {member.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-[#20242C]">{member.name}</div>
                      <div className="text-[10px] text-[#87909D]">{member.role}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${member.status === 'Active' ? 'bg-[#287A50]/10 text-[#287A50]' : 'bg-[#946018]/10 text-[#946018]'}`}>
                    {member.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E3EAF2]">
            <div className="bg-[#E8F1F8] p-3 rounded-2xl text-xs text-[#20242C] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#287A50] shrink-0" />
              <span>Enterprise workspace security rules active.</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// Sub-Component: Module Management View (AI Caller Bot, Email, Scheduler)
function ModuleManagementView({ title, moduleKey, items, onToggleStatus, onDuplicate, onDeleteRequest, onOpenCreate }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#20242C]">{title} Management</h2>
          <p className="text-xs text-[#87909D]">Configure rules, test flows, and monitor local demo state executions.</p>
        </div>
        <button
          onClick={onOpenCreate}
          className="bg-[#24242B] hover:bg-[#383841] text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-nexus-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New {title}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E3EAF2] shadow-nexus-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-base text-[#20242C]">{item.name}</h3>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${item.status === 'Active' ? 'bg-[#287A50]/10 text-[#287A50]' : item.status === 'Paused' ? 'bg-[#946018]/10 text-[#946018]' : 'bg-[#B93845]/10 text-[#B93845]'}`}>
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-[#626B78]">{item.description}</p>
              <div className="flex items-center gap-4 pt-2 text-[11px] text-[#87909D]">
                <span>Last run: {item.lastRun}</span>
                <span>• Health: <strong className="text-[#20242C]">{item.health}</strong></span>
                <span>• Success: <strong className="text-[#287A50]">{item.successRate || item.deliveryRate || item.bookingRate}</strong></span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onToggleStatus(moduleKey, item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border ${item.status === 'Active' ? 'bg-[#F5E8ED] text-[#C98298] border-[#C98298]/30' : 'bg-[#E8F1F8] text-[#20242C] border-[#E3EAF2]'}`}
              >
                {item.status === 'Active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{item.status === 'Active' ? 'Pause' : 'Resume'}</span>
              </button>

              <button
                onClick={() => onDuplicate(moduleKey, item)}
                className="px-3.5 py-2 rounded-xl border border-[#E3EAF2] bg-[#FFFFFF] hover:bg-[#F2F7FC] text-xs font-semibold text-[#626B78] flex items-center gap-1.5"
                title="Duplicate Automation"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Duplicate</span>
              </button>

              <button
                onClick={() => onDeleteRequest(item)}
                className="p-2 rounded-xl border border-[#E3EAF2] bg-[#FFFFFF] hover:bg-[#F5E8ED] text-[#87909D] hover:text-[#B93845]"
                title="Delete Automation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sub-Component: Activity Timeline View
function ActivityTimelineView({ events }) {
  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-[#20242C]">Activity & Execution Log</h2>
        <p className="text-xs text-[#87909D]">Chronological log of all simulated workflow events across the three modules.</p>
      </div>

      <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#E3EAF2] shadow-nexus-sm space-y-4">
        {events.map(evt => (
          <div key={evt.id} className="flex items-start gap-4 p-4 rounded-2xl bg-[#F2F7FC] border border-[#E3EAF2]">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${evt.status === 'Success' ? 'bg-[#287A50]/10 text-[#287A50]' : 'bg-[#946018]/10 text-[#946018]'}`}>
              {evt.status === 'Success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#20242C]">{evt.type}</span>
                <span className="text-xs text-[#87909D] font-mono">{evt.timestamp}</span>
              </div>
              <p className="text-xs text-[#626B78] mt-1">{evt.description}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-[#87909D]">
                <span className="bg-[#FFFFFF] px-2.5 py-0.5 rounded-full border border-[#E3EAF2] font-medium text-[#20242C]">{evt.module}</span>
                <span>Client/Target: <strong className="text-[#20242C]">{evt.client}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sub-Component: Analytics View
function AnalyticsView({ analyticsData }) {
  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-[#20242C]">Operational Analytics</h2>
        <p className="text-xs text-[#87909D]">Combined execution metrics across calling, email, and smart scheduling.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E3EAF2] shadow-nexus-sm">
          <div className="text-xs font-medium text-[#87909D]">Total Actions</div>
          <div className="text-2xl font-bold text-[#20242C] mt-2">{analyticsData.overviewMetrics.totalExecutions}</div>
        </div>
        <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E3EAF2] shadow-nexus-sm">
          <div className="text-xs font-medium text-[#87909D]">Success Rate</div>
          <div className="text-2xl font-bold text-[#20242C] mt-2">{analyticsData.overviewMetrics.successRate}</div>
        </div>
        <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E3EAF2] shadow-nexus-sm">
          <div className="text-xs font-medium text-[#87909D]">Active Workflows</div>
          <div className="text-2xl font-bold text-[#20242C] mt-2">{analyticsData.overviewMetrics.activeAutomationsCount}</div>
        </div>
        <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E3EAF2] shadow-nexus-sm">
          <div className="text-xs font-medium text-[#87909D]">Hours Saved</div>
          <div className="text-2xl font-bold text-[#20242C] mt-2">{analyticsData.overviewMetrics.hoursSaved}</div>
        </div>
      </div>

      {/* Usage Bar Chart Representation */}
      <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#E3EAF2] shadow-nexus-sm space-y-6">
        <h3 className="font-bold text-base text-[#20242C]">Weekly Module Usage Breakdown</h3>
        <div className="space-y-4">
          {analyticsData.usageChart.map((row, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-[#20242C]">
                <span>{row.day}</span>
                <span className="text-[#87909D]">{row.calls} calls • {row.emails} emails • {row.scheduler} meetings</span>
              </div>
              <div className="h-3 bg-[#F2F7FC] rounded-full overflow-hidden flex">
                <div style={{ width: `${(row.calls / 600) * 100}%` }} className="bg-[#C98298]" title="AI Caller Bot"></div>
                <div style={{ width: `${(row.emails / 2000) * 100}%` }} className="bg-[#D6E6F2]" title="Email Automation"></div>
                <div style={{ width: `${(row.scheduler / 200) * 100}%` }} className="bg-[#24242B]" title="Smart Scheduler"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6 pt-4 border-t border-[#E3EAF2] text-xs text-[#87909D]">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#C98298]"></div> AI Caller Bot</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#D6E6F2]"></div> Email Automation</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#24242B]"></div> Smart Scheduler</div>
        </div>
      </div>
    </div>
  );
}

// Sub-Component: Team Management View
function TeamManagementView({ teamMembers, setTeamMembers, onOpenInvite }) {
  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#20242C]">Team Management</h2>
          <p className="text-xs text-[#87909D]">Manage workspace members and role-based permissions.</p>
        </div>
        <button
          onClick={onOpenInvite}
          className="bg-[#24242B] hover:bg-[#383841] text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-nexus-sm flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#E3EAF2] shadow-nexus-sm space-y-4">
        {teamMembers.map(member => (
          <div key={member.id} className="flex items-center justify-between p-4 rounded-2xl bg-[#F2F7FC] border border-[#E3EAF2]">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E8F1F8] text-[#20242C] font-bold text-sm flex items-center justify-center">
                {member.avatar}
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#20242C]">{member.name}</h4>
                <p className="text-xs text-[#87909D]">{member.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium bg-[#FFFFFF] px-3 py-1 rounded-xl border border-[#E3EAF2] text-[#20242C]">
                {member.role}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${member.status === 'Active' ? 'bg-[#287A50]/10 text-[#287A50]' : 'bg-[#946018]/10 text-[#946018]'}`}>
                {member.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sub-Component: Settings View
function SettingsView({ showToast }) {
  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-[#20242C]">Workspace Settings</h2>
        <p className="text-xs text-[#87909D]">General workspace configuration and preferences.</p>
      </div>

      <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#E3EAF2] shadow-nexus-sm space-y-6">
        <div>
          <label className="block text-xs font-bold text-[#20242C] uppercase tracking-wider mb-2">Workspace Name</label>
          <input
            type="text"
            defaultValue="NEXUS AI Enterprise Workspace"
            className="w-full px-4 py-3 rounded-xl border border-[#E3EAF2] bg-[#F2F7FC] text-sm text-[#20242C] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#20242C] uppercase tracking-wider mb-2">Primary Telephony Gateway</label>
          <input
            type="text"
            defaultValue="nexus-sip-us-east-1.voice.io"
            className="w-full px-4 py-3 rounded-xl border border-[#E3EAF2] bg-[#F2F7FC] text-sm text-[#20242C] outline-none"
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-[#E3EAF2]">
          <button
            onClick={() => showToast('Settings saved successfully.')}
            className="bg-[#24242B] text-white text-xs font-semibold px-6 py-3 rounded-xl hover:bg-[#383841]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
