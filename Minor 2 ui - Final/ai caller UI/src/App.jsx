import React, { useState } from 'react';
import { Navigation, Header } from './components/UIComponents';
import { WorkspacePage } from './pages/WorkspacePage';
import { HistoryPage } from './pages/HistoryPage';
import { ProfilePage } from './pages/ProfilePage';
import { ScriptsPage } from './pages/ScriptsPage';
import { LibraryPage } from './pages/LibraryPage';
import { ReportsPage } from './pages/ReportsPage';
import {
  initialCallHistory,
  initialAiProfile,
  initialScripts,
  initialFaqs,
  initialDocuments,
  reportMetrics
} from './data/mockData';

export function App() {
  const [activeTab, setActiveTab] = useState('workspace');
  const [callHistory, setCallHistory] = useState(initialCallHistory);
  const [aiProfile, setAiProfile] = useState(initialAiProfile);
  const [scripts, setScripts] = useState(initialScripts);
  const [faqs, setFaqs] = useState(initialFaqs);
  const [documents, setDocuments] = useState(initialDocuments);

  return (
    <div className="flex min-h-screen bg-pageBg text-bodyText font-sans selection:bg-dusty/25 selection:text-heading">
      {/* Sidebar Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header activeTab={activeTab} />

        <main className="flex-1 overflow-y-auto">
          {activeTab === 'workspace' && (
            <WorkspacePage callHistory={callHistory} setCallHistory={setCallHistory} />
          )}
          {activeTab === 'history' && (
            <HistoryPage callHistory={callHistory} setCallHistory={setCallHistory} />
          )}
          {activeTab === 'profile' && (
            <ProfilePage aiProfile={aiProfile} setAiProfile={setAiProfile} />
          )}
          {activeTab === 'scripts' && (
            <ScriptsPage scripts={scripts} setScripts={setScripts} />
          )}
          {activeTab === 'library' && (
            <LibraryPage
              faqs={faqs}
              setFaqs={setFaqs}
              documents={documents}
              setDocuments={setDocuments}
            />
          )}
          {activeTab === 'reports' && (
            <ReportsPage reportMetrics={reportMetrics} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
