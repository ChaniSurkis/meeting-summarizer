import { useState, useCallback } from 'react';
import { Status, Meeting } from './types/meeting';
import { uploadAudio, getMeeting } from './api/meetings';
import UploadZone from './components/UploadZone';
import StatusCard from './components/StatusCard';
import MeetingResults from './components/MeetingResults';

export default function App() {
  const [status, setStatus] = useState<Status>('idle');
  const [meeting, setMeeting] = useState<Meeting | null>(null);

  const pollMeeting = useCallback((id: string) => {
    const interval = setInterval(async () => {
      const data = await getMeeting(id);
      if (data.status === 'done') {
        clearInterval(interval);
        setMeeting(data);
        setStatus('done');
      } else if (data.status === 'failed') {
        clearInterval(interval);
        setStatus('failed');
      }
    }, 2000);
  }, []);

  const handleFileDrop = useCallback(async (file: File) => {
    setStatus('uploading');
    setMeeting(null);
    const meetingId = await uploadAudio(file);
    setStatus('processing');
    pollMeeting(meetingId);
  }, [pollMeeting]);

  const handleReset = () => {
    setStatus('idle');
    setMeeting(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Neon grid background */}
      <div className="fixed inset-0 bg-black">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-cyan-500/30" style={{
        boxShadow: '0 1px 20px rgba(0,245,255,0.1)'
      }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border border-cyan-500/50"
              style={{ boxShadow: '0 0 15px rgba(0,245,255,0.3)', background: 'rgba(0,245,255,0.05)' }}>
              🎙️
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-wider text-white">
                MEETING <span style={{ color: '#00F5FF', textShadow: '0 0 10px #00F5FF' }}>SUMMARIZER</span>
              </h1>
              <p className="text-xs tracking-widest" style={{ color: 'rgba(0,245,255,0.6)' }}>
                AI-POWERED MEETING INTELLIGENCE
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ boxShadow: '0 0 8px #00F5FF' }} />
            <span className="text-xs text-cyan-400/60 tracking-widest">ONLINE</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        <UploadZone onFileDrop={handleFileDrop} />
        <StatusCard status={status} />
        {status === 'done' && meeting && (
          <MeetingResults meeting={meeting} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}