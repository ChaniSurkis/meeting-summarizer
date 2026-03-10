import { useState } from 'react';
import { Meeting } from '../types/meeting';

interface Props {
  meeting: Meeting;
  onReset: () => void;
}

type Tab = 'summary' | 'keypoints' | 'actions' | 'transcript';

export default function MeetingResults({ meeting, onReset }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('summary');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'summary', label: '📋 סיכום' },
    { id: 'keypoints', label: '✅ נקודות מפתח' },
    { id: 'actions', label: '🎯 משימות' },
    { id: 'transcript', label: '📝 תמלול' },
  ];

  const neon = '#00F5FF';
  const neonDim = 'rgba(0,245,255,0.15)';
  const neonGlow = '0 0 15px rgba(0,245,255,0.2)';

  return (
    <div className="mt-8">

      {/* File name */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: neon, boxShadow: neonGlow }}
        />
        <h2
          className="font-medium tracking-wider text-sm"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          {meeting.filename}
        </h2>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-2 mb-4 p-1 rounded-xl"
        style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,245,255,0.1)' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200"
            style={
              activeTab === tab.id
                ? {
                    background: 'rgba(0,245,255,0.1)',
                    color: neon,
                    border: '1px solid rgba(0,245,255,0.3)',
                    boxShadow: neonGlow,
                    textShadow: '0 0 8px #00F5FF',
                  }
                : {
                    color: 'rgba(255,255,255,0.3)',
                    border: '1px solid transparent',
                  }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(0,245,255,0.15)',
          boxShadow: '0 0 30px rgba(0,245,255,0.05)',
        }}
      >
        {activeTab === 'summary' && (
          <p className="leading-relaxed text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {meeting.summary.summary}
          </p>
        )}

        {activeTab === 'keypoints' && (
          <ul className="space-y-3">
            {meeting.summary.key_points.map((point, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span
                  className="w-6 h-6 rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold"
                  style={{
                    background: neonDim,
                    color: neon,
                    border: '1px solid rgba(0,245,255,0.3)',
                    textShadow: '0 0 6px #00F5FF',
                  }}
                >
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {point}
                </span>
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'actions' && (
          <ul className="space-y-3">
            {meeting.summary.action_items.map((item, i) => (
              <li
                key={i}
                className="rounded-xl p-4 flex gap-4 items-start"
                style={{
                  background: 'rgba(0,245,255,0.03)',
                  border: '1px solid rgba(0,245,255,0.1)',
                }}
              >
                <span className="text-xl">🎯</span>
                <div>
                  <p className="font-medium text-sm text-white">{item.task}</p>
                  <p className="text-xs mt-1 tracking-wide" style={{ color: 'rgba(0,245,255,0.6)' }}>
                    👤 {item.owner}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'transcript' && (
          <p className="leading-relaxed text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {meeting.transcript}
          </p>
        )}
      </div>

      {/* Export PDF */}
      <a
        href={`http://localhost:8000/api/meetings/${meeting.id}/export-pdf`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 tracking-widest"
        style={{
          background: 'rgba(0,245,255,0.05)',
          border: '1px solid rgba(0,245,255,0.3)',
          color: neon,
          textShadow: '0 0 8px #00F5FF',
          boxShadow: neonGlow,
        }}
      >
        📄 EXPORT PDF
      </a>

      {/* New Meeting */}
      <button
        onClick={onReset}
        className="mt-3 w-full py-3 rounded-xl text-sm transition-all duration-200 tracking-widest"
        style={{
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.3)',
        }}
      >
        + NEW MEETING
      </button>

    </div>
  );
}