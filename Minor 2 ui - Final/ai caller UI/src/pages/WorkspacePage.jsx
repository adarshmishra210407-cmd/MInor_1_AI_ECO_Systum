import React, { useState, useEffect } from 'react';
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  FileText,
  UserCheck,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export function WorkspacePage({ callHistory, setCallHistory }) {
  const [activeSubTab, setActiveSubTab] = useState('incoming');

  // Simulated call state machine: 'idle' | 'ringing' | 'active' | 'paused' | 'ended'
  const [callState, setCallState] = useState('idle');
  const [callDirection, setCallDirection] = useState('Incoming');
  const [callerInfo, setCallerInfo] = useState({
    name: 'Sarah Jenkins',
    phone: '+1 (555) 789-0123',
    agent: 'Aria (Support Lead)',
    reason: 'Enterprise Billing & Invoice Clarification'
  });

  const [timer, setTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [callNotes, setCallNotes] = useState('Caller inquired about annual invoice proration.');
  const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(0);

  const activeCallTranscript = [
    { speaker: 'AI', text: 'Thank you for calling NEXUS AI Support. My name is Aria. How may I assist you today?', time: '00:02' },
    { speaker: 'Caller', text: 'Hi Aria, I am looking at our annual invoice and wanted to check if pro-rata credits were applied.', time: '00:12' },
    { speaker: 'AI', text: 'Let me look up your account billing ledger right away. Could you please provide your enterprise ID?', time: '00:20' },
    { speaker: 'Caller', text: 'Sure, it is ENT-9942-X.', time: '00:28' },
    { speaker: 'AI', text: 'Thank you Sarah. I see your account ledger. Yes, the pro-rata credit of $1,250 was successfully credited on October 15th.', time: '00:42' },
    { speaker: 'Caller', text: 'That is fantastic news. Thank you for clarifying so quickly!', time: '00:52' },
    { speaker: 'AI', text: 'You are very welcome! Is there anything else regarding your billing or subscription today?', time: '00:58' }
  ];

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (callState === 'active') {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
        // Advance transcript index gradually
        setCurrentTranscriptIndex((idx) =>
          idx < activeCallTranscript.length - 1 ? idx + 1 : idx
        );
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [callState, activeCallTranscript.length]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins}m ${remSecs < 10 ? '0' : ''}${remSecs}s`;
  };

  const handleStartCall = (direction = 'Incoming') => {
    setCallDirection(direction);
    setCallState('ringing');
    setTimer(0);
    setCurrentTranscriptIndex(0);
    setTimeout(() => {
      setCallState('active');
    }, 2000); // 2s ringing simulation
  };

  const handlePauseCall = () => {
    if (callState === 'active') setCallState('paused');
    else if (callState === 'paused') setCallState('active');
  };

  const handleResetCall = () => {
    setCallState('idle');
    setTimer(0);
    setCurrentTranscriptIndex(0);
    setIsMuted(false);
    setIsOnHold(false);
  };

  const handleEndCall = () => {
    const finalDuration = formatTime(timer);
    const newRecord = {
      id: `CALL-${Math.floor(1100 + Math.random() * 900)}`,
      callerName: callerInfo.name,
      phoneNumber: callerInfo.phone,
      direction: callDirection,
      duration: finalDuration,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      outcome: 'Completed',
      agentName: callerInfo.agent,
      transcript: activeCallTranscript.slice(0, currentTranscriptIndex + 1),
      notes: callNotes,
      followUpRequired: false
    };

    setCallHistory([newRecord, ...callHistory]);
    setCallState('ended');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Tabs: Incoming / Outgoing */}
      <div className="flex items-center justify-between bg-surface p-2 rounded-2xl border border-subtleBorder shadow-subtle">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveSubTab('incoming')}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeSubTab === 'incoming'
                ? 'bg-paleBlue text-heading shadow-sm'
                : 'text-muted hover:text-heading'
            }`}
          >
            <ArrowDownLeft className="w-4 h-4 text-dusty" />
            <span>Incoming Call Queue</span>
          </button>
          <button
            onClick={() => setActiveSubTab('outgoing')}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeSubTab === 'outgoing'
                ? 'bg-paleBlue text-heading shadow-sm'
                : 'text-muted hover:text-heading'
            }`}
          >
            <ArrowUpRight className="w-4 h-4 text-dusty" />
            <span>Outgoing Campaign Mode</span>
          </button>
        </div>

        {/* Manual Demo Controls Toolbar */}
        <div className="flex items-center space-x-3 px-4">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">Manual Demo:</span>
          <button
            onClick={() => handleStartCall(activeSubTab === 'incoming' ? 'Incoming' : 'Outgoing')}
            disabled={callState === 'active' || callState === 'ringing'}
            className="flex items-center space-x-1.5 px-4 py-2 bg-successGreen text-white rounded-xl text-xs font-semibold hover:bg-successGreen/90 transition-all shadow-sm disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Start Demo</span>
          </button>
          <button
            onClick={handlePauseCall}
            disabled={callState === 'idle' || callState === 'ended' || callState === 'ringing'}
            className="flex items-center space-x-1.5 px-4 py-2 bg-warningYellow text-white rounded-xl text-xs font-semibold hover:bg-warningYellow/90 transition-all shadow-sm disabled:opacity-50"
          >
            <Pause className="w-3.5 h-3.5" />
            <span>{callState === 'paused' ? 'Resume' : 'Pause'}</span>
          </button>
          <button
            onClick={handleResetCall}
            className="flex items-center space-x-1.5 px-4 py-2 bg-charcoal text-white rounded-xl text-xs font-semibold hover:bg-hoverCharcoal transition-all shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left 2 Cols: Active Call Monitor / Controls / Transcript */}
        <div className="lg:col-span-2 space-y-6">

          {/* Call Status Banner */}
          <div className="bg-surface rounded-2xl border border-subtleBorder p-6 shadow-subtle relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-paleBlue/40 rounded-full blur-2xl -mr-10 -mt-10"></div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3.5 h-3.5 rounded-full ${
                  callState === 'active' ? 'bg-successGreen animate-ping' :
                  callState === 'ringing' ? 'bg-warningYellow animate-bounce' :
                  callState === 'paused' ? 'bg-warningYellow' : 'bg-muted'
                }`}></div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Status: <span className="text-heading font-extrabold capitalize">{callState}</span>
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-paleBlue px-3 py-1 rounded-lg text-xs font-semibold text-heading">
                <Clock className="w-3.5 h-3.5 text-dusty" />
                <span>{formatTime(timer)}</span>
              </div>
            </div>

            {callState === 'idle' && (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-paleBlue mx-auto flex items-center justify-center text-dusty">
                  <Phone className="w-8 h-8 animate-pulse" />
                </div>
                <h3 className="font-heading font-bold text-heading text-lg">No Active Simulated Call</h3>
                <p className="text-xs text-muted max-w-sm mx-auto">
                  Click <span className="font-semibold text-heading">"Start Demo"</span> above to simulate an incoming or outgoing AI Caller Bot session.
                </p>
              </div>
            )}

            {callState === 'ringing' && (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-warningYellow/20 mx-auto flex items-center justify-center text-warningYellow animate-spin">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-heading text-lg">Ringing... Connecting AI Bot</h3>
                <p className="text-xs text-muted">Establishing secure WebRTC channel for {callerInfo.name}...</p>
              </div>
            )}

            {(callState === 'active' || callState === 'paused') && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-subtleBorder pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-paleBlue text-dusty font-bold text-lg flex items-center justify-center border border-subtleBorder">
                      {callerInfo.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-heading text-base">{callerInfo.name}</h3>
                      <p className="text-xs text-muted">{callerInfo.phone} • Assigned: <span className="text-dusty font-medium">{callerInfo.agent}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-blush text-dusty px-2.5 py-1 rounded-md font-semibold border border-dusty/20">
                      {callDirection} Session
                    </span>
                  </div>
                </div>

                {/* Simulated Call Control Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      isMuted ? 'bg-errorRed text-white border-errorRed' : 'bg-surface text-heading border-subtleBorder hover:bg-paleBlue'
                    }`}
                  >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span>{isMuted ? 'Muted' : 'Mute'}</span>
                  </button>

                  <button
                    onClick={() => setIsOnHold(!isOnHold)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      isOnHold ? 'bg-warningYellow text-white border-warningYellow' : 'bg-surface text-heading border-subtleBorder hover:bg-paleBlue'
                    }`}
                  >
                    <span>{isOnHold ? 'On Hold' : 'Hold'}</span>
                  </button>

                  <button
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="flex items-center space-x-2 px-4 py-2.5 bg-surface text-heading border border-subtleBorder rounded-xl text-xs font-semibold hover:bg-paleBlue transition-all"
                  >
                    <FileText className="w-4 h-4 text-dusty" />
                    <span>{showTranscript ? 'Hide Transcript' : 'Show Transcript'}</span>
                  </button>

                  <button
                    onClick={handleEndCall}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-errorRed text-white rounded-xl text-xs font-semibold hover:bg-errorRed/90 transition-all shadow-sm"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>End Call</span>
                  </button>
                </div>
              </div>
            )}

            {callState === 'ended' && (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-successGreen/10 mx-auto flex items-center justify-center text-successGreen">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-heading text-lg">Call Successfully Completed</h3>
                <p className="text-xs text-muted max-w-sm mx-auto">
                  Summary saved to Call History. Duration: <span className="font-semibold text-heading">{formatTime(timer)}</span>. Outcome: <span className="font-semibold text-successGreen">Completed</span>.
                </p>
                <button
                  onClick={handleResetCall}
                  className="px-6 py-2.5 bg-charcoal text-white rounded-xl text-xs font-semibold hover:bg-hoverCharcoal transition-all shadow-sm"
                >
                  Start New Demo Call
                </button>
              </div>
            )}
          </div>

          {/* Live Transcript Panel */}
          {callState !== 'idle' && showTranscript && (
            <div className="bg-surface rounded-2xl border border-subtleBorder p-6 shadow-subtle space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-subtleBorder pb-3">
                <h4 className="font-heading font-bold text-heading text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-dusty" />
                  <span>Real-Time AI Conversation Transcript</span>
                </h4>
                <span className="text-xs text-muted">Simulated live feed</span>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                {activeCallTranscript.slice(0, currentTranscriptIndex + 1).map((t, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col space-y-1 p-3 rounded-xl text-xs transition-all ${
                      t.speaker === 'AI' ? 'bg-paleBlue/50 ml-4 border-l-2 border-dusty' : 'bg-pageBg mr-4 border-l-2 border-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold text-heading">
                      <span>{t.speaker === 'AI' ? '🤖 NEXUS AI Bot (Aria)' : '👤 Caller (' + callerInfo.name + ')'}</span>
                      <span className="text-[10px] text-muted font-normal">{t.time}</span>
                    </div>
                    <p className="text-bodyText leading-relaxed">{t.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Quick Info, Caller Details & Notes */}
        <div className="space-y-6">

          {/* Incoming Call Queue Preview Panel */}
          <div className="bg-surface rounded-2xl border border-subtleBorder p-6 shadow-subtle space-y-4">
            <h4 className="font-heading font-bold text-heading text-sm flex items-center justify-between">
              <span>Incoming Queue</span>
              <span className="text-xs bg-paleBlue text-dusty px-2.5 py-0.5 rounded-full font-semibold">3 Waiting</span>
            </h4>

            <div className="space-y-3">
              {[
                { name: 'Arthur Pendelton', phone: '+1 (555) 111-2233', intent: 'API Rate Limit Increase', time: '1m ago' },
                { name: 'Elena Rostova', phone: '+1 (555) 444-5566', intent: 'Enterprise SSO Setup', time: '4m ago' },
                { name: 'David Kim', phone: '+1 (555) 777-8899', intent: 'Billing Dispute', time: '9m ago' }
              ].map((q, idx) => (
                <div key={idx} className="p-3 bg-paleBlue/30 rounded-xl border border-subtleBorder hover:bg-paleBlue/60 transition-all flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-heading text-xs">{q.name}</h5>
                    <p className="text-[11px] text-muted">{q.intent}</p>
                  </div>
                  <button
                    onClick={() => {
                      setCallerInfo({ name: q.name, phone: q.phone, agent: 'Aria (Support Lead)', reason: q.intent });
                      handleStartCall('Incoming');
                    }}
                    className="px-3 py-1.5 bg-charcoal text-white rounded-lg text-xs font-semibold hover:bg-hoverCharcoal transition-all shadow-sm"
                  >
                    Answer
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Live Call Notes Editor */}
          <div className="bg-surface rounded-2xl border border-subtleBorder p-6 shadow-subtle space-y-4">
            <h4 className="font-heading font-bold text-heading text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-dusty" />
              <span>Session Notes & CRM Sync</span>
            </h4>
            <textarea
              value={callNotes}
              onChange={(e) => setCallNotes(e.target.value)}
              rows={4}
              className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-xs text-heading focus:outline-none focus:border-dusty transition-colors resize-none"
              placeholder="Record live notes, follow-up items, or CRM tags..."
            ></textarea>
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Auto-saved to local state</span>
              <span className="text-successGreen font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Synced
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
