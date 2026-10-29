import React, { useState } from 'react';
import {
  PhoneCall,
  Mail,
  Calendar,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Clock,
  BarChart3,
  Lock,
  ExternalLink,
  Sparkles,
  Layers,
  LayoutDashboard
} from 'lucide-react';
import DashboardApp from './components/DashboardApp';

export default function App() {
  // Application view state: 'landing' or 'dashboard'
  const [currentView, setCurrentView] = useState('landing');

  // Landing page states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'getstarted'
  const [disabledModalMessage, setDisabledModalMessage] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleDisabledClick = (moduleName) => {
    setDisabledModalMessage(`The "${moduleName}" module is accessible in the Enterprise Dashboard.`);
    setTimeout(() => setDisabledModalMessage(null), 4000);
  };

  const faqs = [
    {
      q: "What is NEXUS AI and what does it automate?",
      a: "NEXUS AI is an intelligent workflow platform designed to streamline customer communications through three dedicated modules: AI Caller Bot, Email Automation, and Smart Scheduler."
    },
    {
      q: "How do I access the functional Enterprise Dashboard?",
      a: "You can instantly access the full Phase 2 Enterprise Dashboard by clicking 'View the Dashboard' or 'Sign In' to simulate authentication and open the complete workspace."
    },
    {
      q: "How does the Smart Scheduler coordinate appointments?",
      a: "Smart Scheduler integrates with verified calendar standards to automatically propose and book optimal meeting times based on your availability rules, eliminating back-and-forth emails."
    },
    {
      q: "Is my data secure when using NEXUS AI?",
      a: "We adhere to strict data privacy standards with enterprise-grade encryption in transit and at rest."
    }
  ];

  // If user navigated to Dashboard view
  if (currentView === 'dashboard') {
    return <DashboardApp onBackToLanding={() => setCurrentView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-[#F2F7FC] text-[#626B78] flex flex-col font-sans selection:bg-[#C98298]/20 selection:text-[#20242C]">

      {/* Top Banner */}
      <div className="bg-[#E8F1F8] border-b border-[#E3EAF2] px-4 py-2 text-center text-xs text-[#20242C] font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C98298]" />
        <span>NEXUS AI Phase 2 — Enterprise Dashboard & Workflow Automation Ready.</span>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E3EAF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#C98298] rounded-lg p-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C98298] to-[#D6E6F2] flex items-center justify-center shadow-nexus-sm group-hover:scale-105 transition-transform">
              <span className="text-[#24242B] font-bold text-xl tracking-tighter">N</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-[#20242C] tracking-tight">NEXUS AI</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-[#626B78] hover:text-[#20242C] transition-colors">Features</a>
            <a href="#workflow" className="text-sm font-medium text-[#626B78] hover:text-[#20242C] transition-colors">How it works</a>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="text-sm font-bold text-[#C98298] hover:text-[#20242C] transition-colors flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-4 h-4" />
              Enterprise Dashboard
            </button>
            <a href="#faq" className="text-sm font-medium text-[#626B78] hover:text-[#20242C] transition-colors">FAQ</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="text-sm font-medium text-[#20242C] hover:text-[#C98298] transition-colors px-3 py-2"
            >
              Sign in
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="bg-[#24242B] hover:bg-[#383841] text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-nexus-sm transition-all transform hover:-translate-y-0.5"
            >
              Get started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#20242C] hover:bg-[#E8F1F8]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FFFFFF] border-b border-[#E3EAF2] px-6 py-6 space-y-4 shadow-nexus animate-fadeIn">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-[#20242C]">Features</a>
            <a href="#workflow" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-[#20242C]">How it works</a>
            <button onClick={() => setCurrentView('dashboard')} className="block text-base font-bold text-[#C98298] text-left w-full">
              Enterprise Dashboard →
            </button>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-[#20242C]">FAQ</a>
            <div className="pt-4 border-t border-[#E3EAF2] flex flex-col gap-3">
              <button onClick={() => setCurrentView('dashboard')} className="w-full text-center py-2.5 bg-[#24242B] text-white font-medium rounded-xl">
                Open Dashboard Workspace
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Toast Notification */}
      {disabledModalMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#24242B] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Layers className="w-5 h-5 text-[#C98298]" />
          <span className="text-sm">{disabledModalMessage}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#D6E6F2]/40 rounded-full blur-3xl pointer-events-none animate-float-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C98298]/15 rounded-full blur-3xl pointer-events-none animate-float"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5E8ED] text-[#C98298] text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Phase 2: Enterprise Dashboard Ready</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#20242C] tracking-tight leading-[1.1]">
                Intelligent workflow automation for modern teams.
              </h1>

              <p className="text-lg sm:text-xl text-[#626B78] font-normal leading-relaxed max-w-xl">
                NEXUS AI orchestrates your customer communications, intelligent calls, and scheduling through a unified, elegant platform designed for clarity.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="bg-[#24242B] hover:bg-[#383841] text-white text-base font-semibold px-8 py-4 rounded-2xl shadow-nexus transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
                >
                  <span>Launch Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#features"
                  className="bg-[#FFFFFF] hover:bg-[#E8F1F8]/50 text-[#20242C] border border-[#E3EAF2] text-base font-semibold px-8 py-4 rounded-2xl transition-all text-center"
                >
                  Explore Modules
                </a>
              </div>

              <div className="pt-6 flex items-center gap-6 text-sm text-[#87909D]">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#287A50]" /><span>Secure & Private</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#287A50]" /><span>Real-time Sync</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#287A50]" /><span>Zero Bloat</span></div>
              </div>
            </div>

            {/* Right Product Preview Card */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#C98298] to-[#D6E6F2] rounded-3xl blur-xl opacity-30"></div>

              <div className="relative bg-[#FFFFFF] rounded-3xl border border-[#E3EAF2] p-6 shadow-nexus">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E3EAF2]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#B93845]/70"></div>
                    <div className="w-3 h-3 rounded-full bg-[#946018]/70"></div>
                    <div className="w-3 h-3 rounded-full bg-[#287A50]/70"></div>
                  </div>
                  <div className="text-xs text-[#87909D] font-mono bg-[#F2F7FC] px-3 py-1 rounded-full border border-[#E3EAF2]">
                    nexus-ai.app/dashboard
                  </div>
                  <div className="w-12"></div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#E8F1F8] p-3.5 rounded-2xl border border-[#E3EAF2]/60">
                      <div className="text-[11px] font-medium text-[#87909D]">Active Calls</div>
                      <div className="text-xl font-bold text-[#20242C] mt-1">1,428</div>
                      <div className="text-[10px] text-[#287A50] font-medium mt-1">↑ 12% this week</div>
                    </div>
                    <div className="bg-[#F5E8ED] p-3.5 rounded-2xl border border-[#E3EAF2]/60">
                      <div className="text-[11px] font-medium text-[#87909D]">Emails Sent</div>
                      <div className="text-xl font-bold text-[#20242C] mt-1">8,930</div>
                      <div className="text-[10px] text-[#287A50] font-medium mt-1">98.4% delivered</div>
                    </div>
                    <div className="bg-[#E8F1F8] p-3.5 rounded-2xl border border-[#E3EAF2]/60">
                      <div className="text-[11px] font-medium text-[#87909D]">Booked Meetings</div>
                      <div className="text-xl font-bold text-[#20242C] mt-1">342</div>
                      <div className="text-[10px] text-[#287A50] font-medium mt-1">Fully automated</div>
                    </div>
                  </div>

                  <div className="bg-[#F2F7FC] rounded-2xl p-4 border border-[#E3EAF2]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-[#20242C]">Live Workflow Activity</span>
                      <span className="text-[10px] bg-[#287A50]/10 text-[#287A50] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#287A50] animate-pulse"></span>
                        System Active
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="bg-[#FFFFFF] p-2.5 rounded-xl border border-[#E3EAF2] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-[#E8F1F8] flex items-center justify-center text-[#20242C]">
                            <PhoneCall className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-medium text-[#20242C]">AI Voice Bot completed outreach</div>
                            <div className="text-[10px] text-[#87909D]">Client: ACME Corp • 2m ago</div>
                          </div>
                        </div>
                        <span className="text-[10px] bg-[#E8F1F8] text-[#20242C] px-2 py-0.5 rounded font-medium">Completed</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E3EAF2] text-center">
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className="text-xs font-bold text-[#C98298] hover:underline"
                  >
                    Click to Open Full Interactive Dashboard →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Three Automation Modules Section */}
      <section id="features" className="py-20 bg-[#FFFFFF] border-y border-[#E3EAF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#20242C]">Three Core Automation Modules</h2>
            <p className="text-[#626B78] text-base">
              Built with precision to handle your daily communications without friction or manual overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div onClick={() => setCurrentView('dashboard')} className="bg-[#F2F7FC] hover:bg-[#E8F1F8]/60 border border-[#E3EAF2] rounded-3xl p-8 transition-all hover:shadow-nexus cursor-pointer group">
              <div className="w-14 h-14 rounded-2xl bg-[#FFFFFF] border border-[#E3EAF2] flex items-center justify-center text-[#20242C] shadow-nexus-sm mb-6">
                <PhoneCall className="w-6 h-6 text-[#C98298]" />
              </div>
              <h3 className="text-xl font-bold text-[#20242C] mb-3">AI Caller Bot</h3>
              <p className="text-sm text-[#626B78] leading-relaxed mb-6">Autonomous voice agents conducting natural outbound conversations and qualifying leads.</p>
              <div className="text-xs font-semibold text-[#C98298]">Launch in Dashboard →</div>
            </div>

            <div onClick={() => setCurrentView('dashboard')} className="bg-[#F2F7FC] hover:bg-[#E8F1F8]/60 border border-[#E3EAF2] rounded-3xl p-8 transition-all hover:shadow-nexus cursor-pointer group">
              <div className="w-14 h-14 rounded-2xl bg-[#FFFFFF] border border-[#E3EAF2] flex items-center justify-center text-[#20242C] shadow-nexus-sm mb-6">
                <Mail className="w-6 h-6 text-[#C98298]" />
              </div>
              <h3 className="text-xl font-bold text-[#20242C] mb-3">Email Automation</h3>
              <p className="text-sm text-[#626B78] leading-relaxed mb-6">Context-aware email campaigns adapting messaging dynamically based on prospect engagement.</p>
              <div className="text-xs font-semibold text-[#C98298]">Launch in Dashboard →</div>
            </div>

            <div onClick={() => setCurrentView('dashboard')} className="bg-[#F2F7FC] hover:bg-[#E8F1F8]/60 border border-[#E3EAF2] rounded-3xl p-8 transition-all hover:shadow-nexus cursor-pointer group">
              <div className="w-14 h-14 rounded-2xl bg-[#FFFFFF] border border-[#E3EAF2] flex items-center justify-center text-[#20242C] shadow-nexus-sm mb-6">
                <Calendar className="w-6 h-6 text-[#C98298]" />
              </div>
              <h3 className="text-xl font-bold text-[#20242C] mb-3">Smart Scheduler</h3>
              <p className="text-sm text-[#626B78] leading-relaxed mb-6">Intelligent calendar coordination eliminating email ping-pong by suggesting optimal appointment slots.</p>
              <div className="text-xs font-semibold text-[#C98298]">Launch in Dashboard →</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#20242C]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="bg-[#FFFFFF] border border-[#E3EAF2] rounded-2xl overflow-hidden shadow-nexus-sm">
                  <button onClick={() => toggleFaq(index)} className="w-full px-6 py-5 text-left flex items-center justify-between gap-4">
                    <span className="font-semibold text-[#20242C] text-base">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full bg-[#E8F1F8] flex items-center justify-center text-[#20242C] transition-transform ${isOpen ? 'rotate-180 bg-[#F5E8ED] text-[#C98298]' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  {isOpen && <div className="px-6 pb-5 text-sm text-[#626B78] border-t border-[#E3EAF2]/60 pt-4">{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FFFFFF] border-t border-[#E3EAF2] pt-16 pb-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#87909D] gap-4">
          <p>© {new Date().getFullYear()} NEXUS AI. All rights reserved.</p>
          <button onClick={() => setCurrentView('dashboard')} className="font-bold text-[#C98298] hover:underline">
            Launch Enterprise Dashboard →
          </button>
        </div>
      </footer>

    </div>
  );
}
