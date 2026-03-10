import { useState } from 'react';
import { Meeting } from '../types/meeting';

interface Props {
  meeting: Meeting;
  onReset: () => void;
}

type Tab = 'summary' | 'keypoints' | 'actions' | 'transcript';

export default function MeetingResults({ meeting, onReset }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('summary');

  const tabs = [
    { id: 'summary', label: '📋 סיכום' },
    { id: 'keypoints', label: '✅ נקודות מפתח' },
    { id: 'actions', label: '🎯 משימות' },
    { id: 'transcript', label: '📝 תמלול' },
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <h2 className="text-white font-semibold text-lg">{meeting.filename}</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 bg-white/5 rounded-xl p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all
              ${activeTab === tab.id
                ? 'bg-purple-500 text-white shadow-lg'
                : 'text-white/50 hover:text-white'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

        {activeTab === 'summary' && (
          <p className="text-white/80 leading-relaxed">{meeting.summary.summary}</p>
        )}

        {activeTab === 'keypoints' && (
          <ul className="space-y-3">
            {meeting.summary.key_points.map((point, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-purple-500/30 text-purple-300 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-white/80">{point}</span>
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'actions' && (
          <ul className="space-y-3">
            {meeting.summary.action_items.map((item, i) => (
              <li key={i} className="bg-white/5 rounded-xl p-4 flex gap-4 items-start">
                <span className="text-xl">🎯</span>
                <div>
                  <p className="text-white font-medium">{item.task}</p>
                  <p className="text-purple-300 text-sm mt-1">👤 {item.owner}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'transcript' && (
          <p className="text-white/60 leading-relaxed text-sm">{meeting.transcript}</p>
        )}

      </div>

      {/* Export PDF Button */}
      <a
        href={`http://localhost:8000/api/meetings/${meeting.id}/export-pdf`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all text-sm flex items-center justify-center gap-2"
      >
        📄 Export PDF
      </a>

      {/* New Meeting Button */}
      <button
        onClick={onReset}
        className="mt-4 w-full py-3 rounded-xl border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all text-sm"
      >
        + פגישה חדשה
      </button>
    </div>
  );
}