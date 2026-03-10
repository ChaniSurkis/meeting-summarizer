import { Status } from '../types/meeting';

interface Props {
  status: Status;
}

export default function StatusCard({ status }: Props) {
  if (status === 'uploading') return (
    <div className="mt-6 rounded-2xl p-6 text-center" style={{
      border: '1px solid rgba(59,130,246,0.4)',
      background: 'rgba(59,130,246,0.05)',
      boxShadow: '0 0 20px rgba(59,130,246,0.1)'
    }}>
      <div className="text-3xl mb-2 animate-bounce">⬆️</div>
      <p className="font-medium tracking-widest text-sm" style={{ color: '#60A5FA' }}>UPLOADING FILE...</p>
    </div>
  );

  if (status === 'processing') return (
    <div className="mt-6 rounded-2xl p-6 text-center" style={{
      border: '1px solid rgba(0,245,255,0.3)',
      background: 'rgba(0,245,255,0.03)',
      boxShadow: '0 0 20px rgba(0,245,255,0.1)'
    }}>
      <div className="text-3xl mb-3 animate-spin">⚙️</div>
      <p className="font-medium tracking-widest text-sm" style={{ color: '#00F5FF', textShadow: '0 0 8px #00F5FF' }}>
        PROCESSING WITH AI...
      </p>
      <p className="text-xs mt-2 tracking-widest" style={{ color: 'rgba(0,245,255,0.4)' }}>
        THIS MAY TAKE ~30 SECONDS
      </p>
    </div>
  );

  if (status === 'failed') return (
    <div className="mt-6 rounded-2xl p-6 text-center" style={{
      border: '1px solid rgba(239,68,68,0.4)',
      background: 'rgba(239,68,68,0.05)',
      boxShadow: '0 0 20px rgba(239,68,68,0.1)'
    }}>
      <div className="text-3xl mb-2">❌</div>
      <p className="font-medium tracking-widest text-sm" style={{ color: '#F87171' }}>
        PROCESSING FAILED — TRY AGAIN
      </p>
    </div>
  );

  return <div className="mt-6 h-[100px]" />;
}