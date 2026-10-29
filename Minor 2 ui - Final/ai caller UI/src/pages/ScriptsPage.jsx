import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Save,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  GitBranch,
  Layers,
  Edit3
} from 'lucide-react';
import { Modal } from '../components/UIComponents';

export function ScriptsPage({ scripts, setScripts }) {
  const [selectedScriptId, setSelectedScriptId] = useState(scripts[0]?.id || 'SCRIPT-01');
  const [editableScripts, setEditableScripts] = useState(scripts);
  const [toastMessage, setToastMessage] = useState('');
  const [newStepModalOpen, setNewStepModalOpen] = useState(false);
  const [newStepName, setNewStepName] = useState('');
  const [newStepAction, setNewStepAction] = useState('');

  const currentScript = editableScripts.find(s => s.id === selectedScriptId) || editableScripts[0];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSaveScript = () => {
    setScripts(editableScripts);
    showToast('Call script template updated successfully!');
  };

  const handleResetScript = () => {
    setEditableScripts(scripts);
    showToast('Script reverted to last saved state.');
  };

  const handleAddStep = (e) => {
    e.preventDefault();
    if (!newStepName || !newStepAction) return;

    const updatedSteps = [
      ...currentScript.steps,
      { step: currentScript.steps.length + 1, name: newStepName, action: newStepAction }
    ];

    const updatedList = editableScripts.map(s => s.id === currentScript.id ? { ...s, steps: updatedSteps } : s);
    setEditableScripts(updatedList);
    setNewStepName('');
    setNewStepAction('');
    setNewStepModalOpen(false);
    showToast('New conversation step added successfully!');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-charcoal text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-successGreen" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar */}
      <div className="flex items-center justify-between bg-surface p-6 rounded-2xl border border-subtleBorder shadow-subtle">
        <div>
          <h3 className="font-heading font-bold text-heading text-lg">Call Script Manager & Conversation Flow</h3>
          <p className="text-xs text-muted">Customize dynamic branching logic, prompts, and escalation triggers for your AI bots.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleResetScript}
            className="flex items-center space-x-1.5 px-4 py-2.5 bg-pageBg text-heading border border-subtleBorder rounded-xl text-xs font-semibold hover:bg-paleBlue transition-all shadow-sm"
          >
            <RotateCcw className="w-4 h-4 text-muted" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSaveScript}
            className="flex items-center space-x-1.5 px-5 py-2.5 bg-successGreen text-white rounded-xl text-xs font-semibold hover:bg-successGreen/90 transition-all shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Script</span>
          </button>
        </div>
      </div>

      {/* Script Selector Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {editableScripts.map((script) => {
          const isSelected = script.id === selectedScriptId;
          return (
            <div
              key={script.id}
              onClick={() => setSelectedScriptId(script.id)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all shadow-subtle flex flex-col justify-between ${
                isSelected ? 'bg-paleBlue/60 border-dusty shadow-md' : 'bg-surface border-subtleBorder hover:border-dusty/50'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-dusty bg-blush px-2.5 py-0.5 rounded-full">
                    {script.category}
                  </span>
                  <span className={`w-2.5 h-2.5 rounded-full ${script.active ? 'bg-successGreen' : 'bg-muted'}`}></span>
                </div>
                <h4 className="font-heading font-bold text-heading text-base">{script.title}</h4>
                <p className="text-xs text-bodyText leading-relaxed">{script.description}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-subtleBorder flex items-center justify-between text-xs text-muted">
                <span>{script.steps.length} Conversation Steps</span>
                <span className={`font-semibold ${isSelected ? 'text-dusty' : 'text-heading'}`}>
                  {isSelected ? 'Active Template' : 'Select'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Editor & Visual Flow Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Script Content Editor */}
        <div className="bg-surface rounded-2xl border border-subtleBorder p-6 shadow-subtle space-y-6">
          <div className="flex items-center justify-between border-b border-subtleBorder pb-3">
            <h4 className="font-heading font-bold text-heading text-sm flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-dusty" />
              <span>Edit Script Details — {currentScript.title}</span>
            </h4>
            <button
              onClick={() => setNewStepModalOpen(true)}
              className="flex items-center space-x-1 px-3 py-1.5 bg-paleBlue text-heading rounded-lg text-xs font-semibold hover:bg-dusty hover:text-white transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Step</span>
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-heading mb-1">Script Title</label>
              <input
                type="text"
                value={currentScript.title}
                onChange={(e) => {
                  const val = e.target.value;
                  setEditableScripts(editableScripts.map(s => s.id === currentScript.id ? { ...s, title: val } : s));
                }}
                className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty"
              />
            </div>

            <div>
              <label className="block font-semibold text-heading mb-1">Description</label>
              <textarea
                rows={2}
                value={currentScript.description}
                onChange={(e) => {
                  const val = e.target.value;
                  setEditableScripts(editableScripts.map(s => s.id === currentScript.id ? { ...s, description: val } : s));
                }}
                className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty resize-none"
              ></textarea>
            </div>

            <div className="space-y-3 pt-2">
              <h5 className="font-heading font-bold text-heading text-xs uppercase tracking-wider">Conversation Steps ({currentScript.steps.length})</h5>
              {currentScript.steps.map((stepObj, idx) => (
                <div key={idx} className="p-4 bg-pageBg rounded-xl border border-subtleBorder space-y-2">
                  <div className="flex items-center justify-between font-semibold text-heading">
                    <span>Step {stepObj.step}: {stepObj.name}</span>
                    <span className="text-[10px] text-muted">Node #{idx + 1}</span>
                  </div>
                  <input
                    type="text"
                    value={stepObj.action}
                    onChange={(e) => {
                      const val = e.target.value;
                      const updatedSteps = currentScript.steps.map((st, i) => i === idx ? { ...st, action: val } : st);
                      setEditableScripts(editableScripts.map(s => s.id === currentScript.id ? { ...s, steps: updatedSteps } : s));
                    }}
                    className="w-full p-2.5 bg-surface border border-subtleBorder rounded-lg text-xs text-bodyText focus:outline-none focus:border-dusty"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Conversation Flow Preview */}
        <div className="bg-surface rounded-2xl border border-subtleBorder p-6 shadow-subtle space-y-6">
          <div className="flex items-center justify-between border-b border-subtleBorder pb-3">
            <h4 className="font-heading font-bold text-heading text-sm flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-dusty" />
              <span>Visual Conversation Flow Preview</span>
            </h4>
            <span className="text-xs bg-paleBlue text-dusty px-2.5 py-0.5 rounded-full font-semibold">Branching Engine</span>
          </div>

          <div className="space-y-4 py-2">
            {currentScript.steps.map((stepObj, idx) => (
              <div key={idx} className="relative">
                {idx > 0 && (
                  <div className="absolute -top-4 left-6 w-0.5 h-4 bg-dusty/40"></div>
                )}
                <div className="p-4 bg-paleBlue/40 rounded-2xl border border-subtleBorder space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-heading text-xs flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-dusty text-white flex items-center justify-center text-[10px] font-bold">
                        {stepObj.step}
                      </span>
                      {stepObj.name}
                    </span>
                    <span className="text-[10px] bg-successGreen/10 text-successGreen px-2 py-0.5 rounded font-semibold">Active Node</span>
                  </div>
                  <p className="text-xs text-bodyText leading-relaxed pl-7">{stepObj.action}</p>
                </div>
              </div>
            ))}

            <div className="p-4 bg-pageBg rounded-2xl border border-dashed border-subtleBorder text-center text-xs text-muted">
              ✨ End of Script Branching • Automated Handoff / Success Resolution
            </div>
          </div>
        </div>

      </div>

      {/* Add Step Modal */}
      <Modal
        isOpen={newStepModalOpen}
        onClose={() => setNewStepModalOpen(false)}
        title="Add New Conversation Step"
      >
        <form onSubmit={handleAddStep} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-heading mb-1">Step Name</label>
            <input
              type="text"
              placeholder="e.g. Security Pin Verification"
              value={newStepName}
              onChange={(e) => setNewStepName(e.target.value)}
              className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-heading mb-1">Action / Bot Instruction</label>
            <textarea
              rows={3}
              placeholder="Describe what the AI bot should say or verify during this step..."
              value={newStepAction}
              onChange={(e) => setNewStepAction(e.target.value)}
              className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty resize-none"
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-subtleBorder">
            <button
              type="button"
              onClick={() => setNewStepModalOpen(false)}
              className="px-4 py-2 bg-pageBg text-heading border border-subtleBorder rounded-xl font-semibold hover:bg-paleBlue"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-charcoal text-white rounded-xl font-semibold hover:bg-hoverCharcoal shadow-sm"
            >
              Add Step
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
