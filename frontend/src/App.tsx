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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500 flex items-center justify-center text-lg">🎙️</div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">Meeting Summarizer</h1>
            <p className="text-purple-300 text-xs">AI-Powered Meeting Intelligence</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <UploadZone onFileDrop={handleFileDrop} />
        <StatusCard status={status} />
        {status === 'done' && meeting && (
          <MeetingResults meeting={meeting} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}