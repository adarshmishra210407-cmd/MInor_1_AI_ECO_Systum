import React, { useState } from 'react';
import {
  Bot,
  Sliders,
  Sparkles,
  CheckCircle2,
  Volume2,
  ArrowRight,
  ArrowLeft,
  Save,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { Modal } from '../components/UIComponents';

export function ProfilePage({ aiProfile, setAiProfile }) {
  const [profile, setProfile] = useState(aiProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [toastMessage, setToastMessage] = useState('');
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  // Wizard state
  const [wizardData, setWizardData] = useState({
    profileName: profile.profileName,
    description: profile.description,
    persona: profile.persona,
    voicePreset: profile.voicePreset
  });

  const handleSave = (e) => {
    e.preventDefault();
    setAiProfile(profile);
    setIsEditing(false);
    showToast('AI Profile successfully updated!');
  };

  const handleWizardComplete = () => {
    const updated = {
      ...profile,
      profileName: wizardData.profileName,
      description: wizardData.description,
      persona: wizardData.persona,
      voicePreset: wizardData.voicePreset
    };
    setProfile(updated);
    setAiProfile(updated);
    setWizardOpen(false);
    setWizardStep(1);
    showToast('AI Profile created/updated via Wizard successfully!');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const voicePresets = [
    { name: 'Nova (Warm, Natural US Female)', desc: 'Optimized for empathetic customer support and warm greetings.' },
    { name: 'Orion (Authoritative US Male)', desc: 'Deep, confident tone tailored for outbound sales and executive outreach.' },
    { name: 'Echo (Calm British Neutral)', desc: 'Clear, polite, and articulate for technical troubleshooting.' },
    { name: 'Astra (Energetic & Friendly)', desc: 'Upbeat and engaging persona for onboarding and product tours.' }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-charcoal text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-successGreen" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex items-center justify-between bg-surface p-6 rounded-2xl border border-subtleBorder shadow-subtle">
        <div>
          <h3 className="font-heading font-bold text-heading text-lg">AI Caller Agent Profile</h3>
          <p className="text-xs text-muted">Manage voice personas, speech parameters, and default bot configuration.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setWizardOpen(true)}
            className="flex items-center space-x-2 px-4 py-2.5 bg-paleBlue text-heading rounded-xl text-xs font-semibold hover:bg-dusty hover:text-white transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-dusty" />
            <span>Launch Setup Wizard</span>
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-5 py-2.5 bg-charcoal text-white rounded-xl text-xs font-semibold hover:bg-hoverCharcoal transition-all shadow-sm"
          >
            <Sliders className="w-4 h-4" />
            <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>

      {/* Main Profile Card & Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Profile Overview Card */}
        <div className="bg-surface rounded-2xl border border-subtleBorder p-6 shadow-subtle space-y-6 lg:col-span-1">
          <div className="flex items-center space-x-4 border-b border-subtleBorder pb-4">
            <div className="w-14 h-14 rounded-2xl bg-paleBlue text-dusty flex items-center justify-center font-bold text-xl border border-subtleBorder shadow-sm">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-heading text-base">{profile.profileName}</h4>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-successGreen/10 text-successGreen mt-1">
                {profile.status}
              </span>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <span className="text-muted block mb-1">Description</span>
              <p className="text-bodyText leading-relaxed">{profile.description}</p>
            </div>
            <div>
              <span className="text-muted block mb-1">Selected Persona</span>
              <span className="font-semibold text-heading">{profile.persona}</span>
            </div>
            <div>
              <span className="text-muted block mb-1">Voice Preset</span>
              <span className="font-semibold text-dusty">{profile.voicePreset}</span>
            </div>
            <div>
              <span className="text-muted block mb-1">Default Script</span>
              <span className="font-semibold text-heading">{profile.defaultScript}</span>
            </div>
          </div>

          {/* Simulated Voice Preview Box */}
          <div className="p-4 bg-paleBlue/40 rounded-xl border border-subtleBorder space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-bold text-heading flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-dusty" />
                <span>Simulated Voice Preview</span>
              </span>
              <span className="text-[10px] text-muted">Demo Audio</span>
            </div>
            <p className="text-[11px] text-muted italic">"Hello! This is Aria from NEXUS AI support. How may I assist you securely today?"</p>
            <button
              onClick={() => setIsPlayingPreview(!isPlayingPreview)}
              className="w-full py-2 bg-charcoal text-white rounded-lg text-xs font-semibold hover:bg-hoverCharcoal transition-all shadow-sm"
            >
              {isPlayingPreview ? 'Pause Audio Simulation' : 'Play Voice Preview'}
            </button>
          </div>
        </div>

        {/* Edit Form or Settings Breakdown */}
        <div className="bg-surface rounded-2xl border border-subtleBorder p-6 shadow-subtle lg:col-span-2">
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-6">
              <h4 className="font-heading font-bold text-heading text-base border-b border-subtleBorder pb-3">Edit AI Profile Configuration</h4>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-heading mb-1">Profile Name</label>
                  <input
                    type="text"
                    value={profile.profileName}
                    onChange={(e) => setProfile({ ...profile, profileName: e.target.value })}
                    className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-heading mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={profile.description}
                    onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                    className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-heading mb-1">Persona Tone</label>
                    <select
                      value={profile.persona}
                      onChange={(e) => setProfile({ ...profile, persona: e.target.value })}
                      className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty"
                    >
                      <option value="Professional, Empathetic, Concise & Secure">Professional, Empathetic, Concise & Secure</option>
                      <option value="Upbeat, Sales-Oriented & Persuasive">Upbeat, Sales-Oriented & Persuasive</option>
                      <option value="Direct, Calm & Technical">Direct, Calm & Technical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-heading mb-1">Voice Preset</label>
                    <select
                      value={profile.voicePreset}
                      onChange={(e) => setProfile({ ...profile, voicePreset: e.target.value })}
                      className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty"
                    >
                      {voicePresets.map((vp, idx) => (
                        <option key={idx} value={vp.name}>{vp.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-heading mb-1">Speech Rate</label>
                    <select
                      value={profile.speechRate}
                      onChange={(e) => setProfile({ ...profile, speechRate: e.target.value })}
                      className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty"
                    >
                      <option value="0.9x (Relaxed)">0.9x (Relaxed)</option>
                      <option value="1.0x (Standard)">1.0x (Standard)</option>
                      <option value="1.1x (Quick)">1.1x (Quick)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-heading mb-1">Pitch</label>
                    <select
                      value={profile.pitch}
                      onChange={(e) => setProfile({ ...profile, pitch: e.target.value })}
                      className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty"
                    >
                      <option value="Low (Authoritative)">Low (Authoritative)</option>
                      <option value="Medium-High (Calm)">Medium-High (Calm)</option>
                      <option value="High (Energetic)">High (Energetic)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-heading mb-1">Interrupt Sensitivity</label>
                    <select
                      value={profile.interruptSensitivity}
                      onChange={(e) => setProfile({ ...profile, interruptSensitivity: e.target.value })}
                      className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty"
                    >
                      <option value="Low (Patient)">Low (Patient)</option>
                      <option value="Medium (Smart Pause Detection)">Medium (Smart Pause Detection)</option>
                      <option value="High (Responsive)">High (Responsive)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-subtleBorder">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 bg-pageBg text-heading border border-subtleBorder rounded-xl text-xs font-semibold hover:bg-paleBlue transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-2.5 bg-successGreen text-white rounded-xl text-xs font-semibold hover:bg-successGreen/90 transition-all shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <h4 className="font-heading font-bold text-heading text-base border-b border-subtleBorder pb-3">Voice & Persona Technical Parameters</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="p-4 bg-pageBg rounded-xl border border-subtleBorder space-y-2">
                  <span className="text-muted block">Speech Rate Configuration</span>
                  <span className="text-sm font-semibold text-heading">{profile.speechRate}</span>
                  <p className="text-[11px] text-muted">Controls phoneme generation cadence for natural conversation flow.</p>
                </div>

                <div className="p-4 bg-pageBg rounded-xl border border-subtleBorder space-y-2">
                  <span className="text-muted block">Voice Pitch & Modulation</span>
                  <span className="text-sm font-semibold text-heading">{profile.pitch}</span>
                  <p className="text-[11px] text-muted">Adjusts foundational acoustic frequency profile.</p>
                </div>

                <div className="p-4 bg-pageBg rounded-xl border border-subtleBorder space-y-2">
                  <span className="text-muted block">Interruption Sensitivity</span>
                  <span className="text-sm font-semibold text-heading">{profile.interruptSensitivity}</span>
                  <p className="text-[11px] text-muted">Determines how quickly the AI pauses when the caller speaks.</p>
                </div>

                <div className="p-4 bg-pageBg rounded-xl border border-subtleBorder space-y-2">
                  <span className="text-muted block">Compliance & Security Mode</span>
                  <span className="text-sm font-semibold text-successGreen flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> HIPAA & SOC 2 Guardrails Active
                  </span>
                  <p className="text-[11px] text-muted">Automatically redacts PII and validates secure OTP tokens.</p>
                </div>
              </div>

              <div className="p-4 bg-paleBlue/30 rounded-xl border border-subtleBorder flex items-center justify-between">
                <div>
                  <h5 className="font-semibold text-heading text-xs">Selectable Voice Preset Library</h5>
                  <p className="text-[11px] text-muted">Choose from 4 pre-trained ultra-realistic neural voice models.</p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-charcoal text-white rounded-xl text-xs font-semibold hover:bg-hoverCharcoal transition-all shadow-sm"
                >
                  Configure Presets
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Setup Wizard Modal */}
      <Modal
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
        title="AI Profile Setup Wizard"
      >
        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center space-x-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  wizardStep === step ? 'bg-dusty text-white' : wizardStep > step ? 'bg-successGreen text-white' : 'bg-paleBlue text-muted'
                }`}>
                  {wizardStep > step ? '✓' : step}
                </div>
                <span className="text-xs font-semibold text-heading hidden sm:inline">
                  {step === 1 ? 'Identity' : step === 2 ? 'Persona' : 'Review'}
                </span>
              </div>
            ))}
          </div>

          {wizardStep === 1 && (
            <div className="space-y-4 text-xs animate-fadeIn">
              <h5 className="font-heading font-bold text-heading text-sm">Step 1: Profile Identity</h5>
              <div>
                <label className="block font-semibold text-heading mb-1">Bot Profile Name</label>
                <input
                  type="text"
                  value={wizardData.profileName}
                  onChange={(e) => setWizardData({ ...wizardData, profileName: e.target.value })}
                  className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty"
                />
              </div>
              <div>
                <label className="block font-semibold text-heading mb-1">Bot Description & Purpose</label>
                <textarea
                  rows={3}
                  value={wizardData.description}
                  onChange={(e) => setWizardData({ ...wizardData, description: e.target.value })}
                  className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty resize-none"
                ></textarea>
              </div>
            </div>
          )}

          {wizardStep === 2 && (
            <div className="space-y-4 text-xs animate-fadeIn">
              <h5 className="font-heading font-bold text-heading text-sm">Step 2: Persona & Voice</h5>
              <div>
                <label className="block font-semibold text-heading mb-1">Select Persona Tone</label>
                <select
                  value={wizardData.persona}
                  onChange={(e) => setWizardData({ ...wizardData, persona: e.target.value })}
                  className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty"
                >
                  <option value="Professional, Empathetic, Concise & Secure">Professional, Empathetic, Concise & Secure</option>
                  <option value="Upbeat, Sales-Oriented & Persuasive">Upbeat, Sales-Oriented & Persuasive</option>
                  <option value="Direct, Calm & Technical">Direct, Calm & Technical</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-heading mb-1">Select Voice Preset</label>
                <select
                  value={wizardData.voicePreset}
                  onChange={(e) => setWizardData({ ...wizardData, voicePreset: e.target.value })}
                  className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty"
                >
                  {voicePresets.map((vp, idx) => (
                    <option key={idx} value={vp.name}>{vp.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {wizardStep === 3 && (
            <div className="space-y-4 text-xs animate-fadeIn">
              <h5 className="font-heading font-bold text-heading text-sm">Step 3: Review Configuration</h5>
              <div className="p-4 bg-pageBg rounded-xl border border-subtleBorder space-y-2">
                <div><span className="text-muted">Name:</span> <span className="font-semibold text-heading">{wizardData.profileName}</span></div>
                <div><span className="text-muted">Description:</span> <span className="font-semibold text-heading">{wizardData.description}</span></div>
                <div><span className="text-muted">Persona:</span> <span className="font-semibold text-heading">{wizardData.persona}</span></div>
                <div><span className="text-muted">Voice:</span> <span className="font-semibold text-dusty">{wizardData.voicePreset}</span></div>
              </div>
            </div>
          )}

          {/* Wizard Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-subtleBorder">
            {wizardStep > 1 ? (
              <button
                onClick={() => setWizardStep(wizardStep - 1)}
                className="flex items-center space-x-1 px-4 py-2 bg-pageBg text-heading border border-subtleBorder rounded-xl text-xs font-semibold hover:bg-paleBlue"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div></div>
            )}

            {wizardStep < 3 ? (
              <button
                onClick={() => setWizardStep(wizardStep + 1)}
                className="flex items-center space-x-1 px-5 py-2 bg-charcoal text-white rounded-xl text-xs font-semibold hover:bg-hoverCharcoal shadow-sm"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleWizardComplete}
                className="flex items-center space-x-1 px-6 py-2 bg-successGreen text-white rounded-xl text-xs font-semibold hover:bg-successGreen/90 shadow-sm"
              >
                <span>Complete Setup</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
