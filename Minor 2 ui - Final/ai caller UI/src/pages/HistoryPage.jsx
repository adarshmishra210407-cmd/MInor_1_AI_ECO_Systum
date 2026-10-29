import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  Trash2,
  FileText,
  Play,
  CheckSquare,
  ArrowUpDown,
  Sparkles,
  PhoneCall,
  Calendar,
  Clock,
  User,
  ShieldCheck
} from 'lucide-react';
import { OutcomeBadge, Modal } from '../components/UIComponents';

export function HistoryPage({ callHistory, setCallHistory }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [directionFilter, setDirectionFilter] = useState('All');
  const [outcomeFilter, setOutcomeFilter] = useState('All');
  const [selectedCall, setSelectedCall] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [callToDelete, setCallToDelete] = useState(null);
  const [playerModalOpen, setPlayerModalOpen] = useState(false);
  const [activeAudioCall, setActiveAudioCall] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Filter and search logic
  const filteredCalls = useMemo(() => {
    return callHistory.filter((call) => {
      const matchesSearch =
        call.callerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.transcript.some(t => t.text.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDirection = directionFilter === 'All' || call.direction === directionFilter;
      const matchesOutcome = outcomeFilter === 'All' || call.outcome === outcomeFilter;

      return matchesSearch && matchesDirection && matchesOutcome;
    });
  }, [callHistory, searchTerm, directionFilter, outcomeFilter]);

  const handleExportCSV = () => {
    const headers = ['ID', 'Caller Name', 'Phone Number', 'Direction', 'Duration', 'Date', 'Outcome', 'Agent', 'Notes'];
    const rows = filteredCalls.map(c => [
      c.id,
      `"${c.callerName}"`,
      c.phoneNumber,
      c.direction,
      c.duration,
      c.date,
      c.outcome,
      `"${c.agentName}"`,
      `"${c.notes.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nexus_ai_call_history_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmDelete = (call) => {
    setCallToDelete(call);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (callToDelete) {
      setCallHistory(callHistory.filter(c => c.id !== callToDelete.id));
      setDeleteModalOpen(false);
      setCallToDelete(null);
      if (selectedCall?.id === callToDelete.id) setSelectedCall(null);
    }
  };

  const openRecordingPlayer = (call) => {
    setActiveAudioCall(call);
    setIsPlayingAudio(true);
    setPlayerModalOpen(true);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Search & Filters Toolbar */}
      <div className="bg-surface p-6 rounded-2xl border border-subtleBorder shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search caller, phone, transcript, notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-pageBg border border-subtleBorder rounded-xl text-xs text-heading focus:outline-none focus:border-dusty transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted" />
            <select
              value={directionFilter}
              onChange={(e) => setDirectionFilter(e.target.value)}
              className="bg-pageBg border border-subtleBorder px-3 py-2.5 rounded-xl text-xs text-heading font-medium focus:outline-none focus:border-dusty"
            >
              <option value="All">All Directions</option>
              <option value="Incoming">Incoming</option>
              <option value="Outgoing">Outgoing</option>
            </select>
          </div>

          <select
            value={outcomeFilter}
            onChange={(e) => setOutcomeFilter(e.target.value)}
            className="bg-pageBg border border-subtleBorder px-3 py-2.5 rounded-xl text-xs text-heading font-medium focus:outline-none focus:border-dusty"
          >
            <option value="All">All Outcomes</option>
            <option value="Completed">Completed</option>
            <option value="Missed">Missed</option>
            <option value="Failed">Failed</option>
            <option value="Follow-up">Follow-up</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-4 py-2.5 bg-charcoal text-white rounded-xl text-xs font-semibold hover:bg-hoverCharcoal transition-all shadow-sm ml-auto md:ml-0"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Table View */}
      <div className="bg-surface rounded-2xl border border-subtleBorder shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-paleBlue/40 border-b border-subtleBorder text-xs font-heading font-bold text-heading">
                <th className="p-4 pl-6">Call ID & Caller</th>
                <th className="p-4">Direction</th>
                <th className="p-4">Duration & Time</th>
                <th className="p-4">Outcome</th>
                <th className="p-4">Assigned AI Agent</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtleBorder text-xs text-bodyText">
              {filteredCalls.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-muted">
                    No call history records found matching your search or filters.
                  </td>
                </tr>
              ) : (
                filteredCalls.map((call) => (
                  <tr key={call.id} className="hover:bg-paleBlue/20 transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="font-semibold text-heading text-sm">{call.callerName}</div>
                      <div className="text-muted text-[11px]">{call.phoneNumber} • <span className="font-mono">{call.id}</span></div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                        call.direction === 'Incoming' ? 'bg-paleBlue text-heading' : 'bg-blush text-dusty'
                      }`}>
                        {call.direction}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-heading">{call.duration}</div>
                      <div className="text-[11px] text-muted">{call.date}</div>
                    </td>
                    <td className="p-4">
                      <OutcomeBadge outcome={call.outcome} />
                    </td>
                    <td className="p-4 font-medium text-heading">
                      {call.agentName}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openRecordingPlayer(call)}
                          title="Play Simulated Audio Recording"
                          className="p-2 bg-paleBlue text-dusty rounded-lg hover:bg-dusty hover:text-white transition-all shadow-sm"
                        >
                          <Play className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setSelectedCall(call)}
                          title="View Details & Transcript"
                          className="p-2 bg-pageBg text-heading rounded-lg hover:bg-paleBlue transition-all shadow-sm"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => confirmDelete(call)}
                          title="Delete Record"
                          className="p-2 bg-errorRed/10 text-errorRed rounded-lg hover:bg-errorRed hover:text-white transition-all shadow-sm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Call Details Side Drawer */}
      {selectedCall && (
        <div className="fixed inset-0 z-50 flex justify-end bg-charcoal/40 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-surface h-full shadow-2xl border-l border-subtleBorder flex flex-col justify-between overflow-y-auto animate-slideInRight">
            <div className="p-6 border-b border-subtleBorder flex items-center justify-between bg-paleBlue/30">
              <div>
                <span className="text-xs font-mono text-dusty font-bold">{selectedCall.id}</span>
                <h3 className="font-heading font-bold text-heading text-lg">{selectedCall.callerName}</h3>
              </div>
              <button
                onClick={() => setSelectedCall(null)}
                className="text-muted hover:text-heading p-2 rounded-lg hover:bg-paleBlue transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 flex-1">
              {/* Meta Grid */}
              <div className="grid grid-cols-2 gap-4 bg-pageBg p-4 rounded-xl border border-subtleBorder">
                <div>
                  <span className="text-[11px] text-muted block">Phone Number</span>
                  <span className="text-xs font-semibold text-heading">{selectedCall.phoneNumber}</span>
                </div>
                <div>
                  <span className="text-[11px] text-muted block">Direction</span>
                  <span className="text-xs font-semibold text-heading">{selectedCall.direction}</span>
                </div>
                <div>
                  <span className="text-[11px] text-muted block">Duration</span>
                  <span className="text-xs font-semibold text-heading">{selectedCall.duration}</span>
                </div>
                <div>
                  <span className="text-[11px] text-muted block">Timestamp</span>
                  <span className="text-xs font-semibold text-heading">{selectedCall.date}</span>
                </div>
                <div>
                  <span className="text-[11px] text-muted block">Outcome</span>
                  <OutcomeBadge outcome={selectedCall.outcome} />
                </div>
                <div>
                  <span className="text-[11px] text-muted block">Assigned Agent</span>
                  <span className="text-xs font-semibold text-heading">{selectedCall.agentName}</span>
                </div>
              </div>

              {/* Notes Section */}
              <div className="space-y-2">
                <h4 className="font-heading font-bold text-heading text-xs uppercase tracking-wider">Call Notes & Summary</h4>
                <textarea
                  value={selectedCall.notes}
                  onChange={(e) => {
                    const updatedNotes = e.target.value;
                    setSelectedCall({ ...selectedCall, notes: updatedNotes });
                    setCallHistory(callHistory.map(c => c.id === selectedCall.id ? { ...c, notes: updatedNotes } : c));
                  }}
                  rows={3}
                  className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-xs text-heading focus:outline-none focus:border-dusty resize-none"
                ></textarea>
              </div>

              {/* Transcript Section */}
              <div className="space-y-3">
                <h4 className="font-heading font-bold text-heading text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>Full Transcript</span>
                  <span className="text-[11px] text-muted font-normal">{selectedCall.transcript.length} turns</span>
                </h4>
                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-2">
                  {selectedCall.transcript.map((t, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl text-xs ${
                        t.speaker === 'AI' ? 'bg-paleBlue/40 ml-4 border-l-2 border-dusty' : 'bg-pageBg mr-4 border-l-2 border-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold text-heading mb-1">
                        <span>{t.speaker === 'AI' ? '🤖 AI Bot' : '👤 Caller'}</span>
                        <span className="text-[10px] text-muted font-normal">{t.time}</span>
                      </div>
                      <p className="text-bodyText leading-relaxed">{t.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-subtleBorder bg-pageBg flex items-center justify-between">
              <button
                onClick={() => openRecordingPlayer(selectedCall)}
                className="flex items-center space-x-2 px-4 py-2.5 bg-paleBlue text-heading rounded-xl text-xs font-semibold hover:bg-dusty hover:text-white transition-all shadow-sm"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Simulated Audio Recording</span>
              </button>
              <button
                onClick={() => setSelectedCall(null)}
                className="px-6 py-2.5 bg-charcoal text-white rounded-xl text-xs font-semibold hover:bg-hoverCharcoal transition-all shadow-sm"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Call Record Deletion"
      >
        <div className="space-y-4">
          <p className="text-xs text-bodyText">
            Are you sure you want to delete call record <span className="font-semibold text-heading">{callToDelete?.id}</span> ({callToDelete?.callerName})? This action cannot be undone in this demo session.
          </p>
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-subtleBorder">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="px-4 py-2 bg-pageBg text-heading border border-subtleBorder rounded-xl text-xs font-semibold hover:bg-paleBlue transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-errorRed text-white rounded-xl text-xs font-semibold hover:bg-errorRed/90 transition-all shadow-sm"
            >
              Delete Record
            </button>
          </div>
        </div>
      </Modal>

      {/* Simulated Audio Recording Player Modal */}
      <Modal
        isOpen={playerModalOpen}
        onClose={() => setPlayerModalOpen(false)}
        title={`Simulated Audio Player — ${activeAudioCall?.id}`}
      >
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 rounded-2xl bg-paleBlue mx-auto flex items-center justify-center text-dusty">
            <PhoneCall className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-heading text-base">{activeAudioCall?.callerName}</h4>
            <p className="text-xs text-muted">{activeAudioCall?.phoneNumber} • {activeAudioCall?.duration}</p>
          </div>

          {/* Simulated Waveform Progress */}
          <div className="space-y-2">
            <div className="h-12 bg-paleBlue/50 rounded-xl flex items-center justify-center px-4 space-x-1 border border-subtleBorder">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all ${
                    i % 3 === 0 ? 'bg-dusty h-8' : i % 2 === 0 ? 'bg-heading h-5' : 'bg-muted h-3'
                  }`}
                ></div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] text-muted">
              <span>00:00</span>
              <span className="text-dusty font-semibold">[Simulated Audio Stream — Demo Only]</span>
              <span>{activeAudioCall?.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 pt-2">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="px-6 py-2.5 bg-charcoal text-white rounded-xl text-xs font-semibold hover:bg-hoverCharcoal transition-all shadow-sm flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>{isPlayingAudio ? 'Pause Simulation' : 'Play Simulation'}</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
