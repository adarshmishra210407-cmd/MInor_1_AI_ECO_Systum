import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Plus,
  FileText,
  Trash2,
  Edit3,
  CheckCircle2,
  Sparkles,
  Download
} from 'lucide-react';
import { Modal } from '../components/UIComponents';

export function LibraryPage({ faqs, setFaqs, documents, setDocuments }) {
  const [activeTab, setActiveTab] = useState('faqs');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // FAQ Modal state
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [faqCategory, setFaqCategory] = useState('General');

  // Document Modal state
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [docName, setDocName] = useState('');
  const [docType, setDocType] = useState('PDF Document');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const filteredFaqs = useMemo(() => {
    return faqs.filter(f =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [faqs, searchQuery]);

  const filteredDocs = useMemo(() => {
    return documents.filter(d =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [documents, searchQuery]);

  const handleSaveFaq = (e) => {
    e.preventDefault();
    if (!faqQuestion || !faqAnswer) return;

    if (editingFaq) {
      setFaqs(faqs.map(f => f.id === editingFaq.id ? { ...f, question: faqQuestion, answer: faqAnswer, category: faqCategory } : f));
      showToast('FAQ entry successfully updated!');
    } else {
      const newFaq = {
        id: `FAQ-${Date.now()}`,
        question: faqQuestion,
        answer: faqAnswer,
        category: faqCategory
      };
      setFaqs([newFaq, ...faqs]);
      showToast('New FAQ entry successfully added!');
    }

    setFaqModalOpen(false);
    setEditingFaq(null);
    setFaqQuestion('');
    setFaqAnswer('');
  };

  const handleDeleteFaq = (id) => {
    setFaqs(faqs.filter(f => f.id !== id));
    showToast('FAQ entry deleted.');
  };

  const handleAddDoc = (e) => {
    e.preventDefault();
    if (!docName) return;

    const newDoc = {
      id: `DOC-${Date.now()}`,
      name: docName,
      size: '1.4 MB',
      type: docType,
      updated: new Date().toISOString().substring(0, 10)
    };

    setDocuments([newDoc, ...documents]);
    setDocModalOpen(false);
    setDocName('');
    showToast('Reference document successfully uploaded (demo state)!');
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

      {/* Top Bar with Subtabs & Search */}
      <div className="bg-surface p-6 rounded-2xl border border-subtleBorder shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-6 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'faqs' ? 'bg-paleBlue text-heading shadow-sm' : 'text-muted hover:text-heading'
            }`}
          >
            FAQ Knowledge Base ({faqs.length})
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`px-6 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'docs' ? 'bg-paleBlue text-heading shadow-sm' : 'text-muted hover:text-heading'
            }`}
          >
            Reference Documents ({documents.length})
          </button>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder={activeTab === 'faqs' ? 'Search FAQs...' : 'Search documents...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-pageBg border border-subtleBorder rounded-xl text-xs text-heading focus:outline-none focus:border-dusty"
            />
          </div>
          <button
            onClick={() => {
              if (activeTab === 'faqs') {
                setEditingFaq(null);
                setFaqQuestion('');
                setFaqAnswer('');
                setFaqModalOpen(true);
              } else {
                setDocModalOpen(true);
              }
            }}
            className="flex items-center space-x-1.5 px-4 py-2.5 bg-charcoal text-white rounded-xl text-xs font-semibold hover:bg-hoverCharcoal transition-all shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{activeTab === 'faqs' ? 'Add FAQ' : 'Upload Document'}</span>
          </button>
        </div>
      </div>

      {/* FAQ Tab Content */}
      {activeTab === 'faqs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFaqs.length === 0 ? (
            <div className="col-span-2 p-12 text-center bg-surface rounded-2xl border border-subtleBorder text-muted text-xs">
              No FAQ entries found matching your search.
            </div>
          ) : (
            filteredFaqs.map((faq) => (
              <div key={faq.id} className="bg-surface p-6 rounded-2xl border border-subtleBorder shadow-subtle space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold bg-blush text-dusty px-2.5 py-0.5 rounded-full">
                      {faq.category}
                    </span>
                    <span className="text-[10px] font-mono text-muted">{faq.id}</span>
                  </div>
                  <h4 className="font-heading font-bold text-heading text-sm">{faq.question}</h4>
                  <p className="text-xs text-bodyText leading-relaxed">{faq.answer}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-subtleBorder flex items-center justify-end space-x-2">
                  <button
                    onClick={() => {
                      setEditingFaq(faq);
                      setFaqQuestion(faq.question);
                      setFaqAnswer(faq.answer);
                      setFaqCategory(faq.category);
                      setFaqModalOpen(true);
                    }}
                    className="p-2 bg-paleBlue text-heading rounded-lg hover:bg-dusty hover:text-white transition-all text-xs"
                    title="Edit FAQ"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteFaq(faq.id)}
                    className="p-2 bg-errorRed/10 text-errorRed rounded-lg hover:bg-errorRed hover:text-white transition-all text-xs"
                    title="Delete FAQ"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Documents Tab Content */}
      {activeTab === 'docs' && (
        <div className="bg-surface rounded-2xl border border-subtleBorder shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-paleBlue/40 border-b border-subtleBorder text-xs font-heading font-bold text-heading">
                  <th className="p-4 pl-6">Document Name</th>
                  <th className="p-4">File Type</th>
                  <th className="p-4">File Size</th>
                  <th className="p-4">Last Updated</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtleBorder text-xs text-bodyText">
                {filteredDocs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-12 text-center text-muted">
                      No reference documents found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-paleBlue/20 transition-colors">
                      <td className="p-4 pl-6 font-semibold text-heading flex items-center space-x-3">
                        <FileText className="w-4 h-4 text-dusty" />
                        <span>{doc.name}</span>
                      </td>
                      <td className="p-4">{doc.type}</td>
                      <td className="p-4 font-mono">{doc.size}</td>
                      <td className="p-4">{doc.updated}</td>
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => showToast(`Downloading ${doc.name} (Demo simulation)`)}
                            className="p-2 bg-paleBlue text-dusty rounded-lg hover:bg-dusty hover:text-white transition-all"
                            title="Download Demo File"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setDocuments(documents.filter(d => d.id !== doc.id));
                              showToast('Document removed successfully.');
                            }}
                            className="p-2 bg-errorRed/10 text-errorRed rounded-lg hover:bg-errorRed hover:text-white transition-all"
                            title="Delete Document"
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
      )}

      {/* FAQ Modal */}
      <Modal
        isOpen={faqModalOpen}
        onClose={() => setFaqModalOpen(false)}
        title={editingFaq ? 'Edit FAQ Entry' : 'Add New FAQ Entry'}
      >
        <form onSubmit={handleSaveFaq} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-heading mb-1">Category</label>
            <select
              value={faqCategory}
              onChange={(e) => setFaqCategory(e.target.value)}
              className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty"
            >
              <option value="Authentication">Authentication</option>
              <option value="API & Technical">API & Technical</option>
              <option value="Security & Compliance">Security & Compliance</option>
              <option value="Voice Customization">Voice Customization</option>
              <option value="General">General</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-heading mb-1">Question</label>
            <input
              type="text"
              placeholder="e.g. How do I upgrade my enterprise tier?"
              value={faqQuestion}
              onChange={(e) => setFaqQuestion(e.target.value)}
              className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-heading mb-1">Answer / Bot Knowledge Response</label>
            <textarea
              rows={4}
              placeholder="Provide clear, concise knowledge base answer for the AI bot..."
              value={faqAnswer}
              onChange={(e) => setFaqAnswer(e.target.value)}
              className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty resize-none"
              required
            ></textarea>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-subtleBorder">
            <button
              type="button"
              onClick={() => setFaqModalOpen(false)}
              className="px-4 py-2 bg-pageBg text-heading border border-subtleBorder rounded-xl font-semibold hover:bg-paleBlue"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-charcoal text-white rounded-xl font-semibold hover:bg-hoverCharcoal shadow-sm"
            >
              {editingFaq ? 'Save Changes' : 'Add FAQ'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Document Upload Modal */}
      <Modal
        isOpen={docModalOpen}
        onClose={() => setDocModalOpen(false)}
        title="Upload Reference Document"
      >
        <form onSubmit={handleAddDoc} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-heading mb-1">Document Name</label>
            <input
              type="text"
              placeholder="e.g. Q4_Billing_Policy_2026.pdf"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-heading mb-1">Document Type</label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full p-3 bg-pageBg border border-subtleBorder rounded-xl text-heading focus:outline-none focus:border-dusty"
            >
              <option value="PDF Document">PDF Document</option>
              <option value="Word Document">Word Document</option>
              <option value="Knowledge Base Article">Knowledge Base Article</option>
            </select>
          </div>

          <div className="p-4 bg-paleBlue/40 border border-subtleBorder rounded-xl text-center space-y-2">
            <span className="text-muted block">Simulated File Upload (Local Demo)</span>
            <span className="text-[11px] text-dusty font-semibold">Drop sample files or click to simulate upload</span>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-subtleBorder">
            <button
              type="button"
              onClick={() => setDocModalOpen(false)}
              className="px-4 py-2 bg-pageBg text-heading border border-subtleBorder rounded-xl font-semibold hover:bg-paleBlue"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-charcoal text-white rounded-xl font-semibold hover:bg-hoverCharcoal shadow-sm"
            >
              Upload Document
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
