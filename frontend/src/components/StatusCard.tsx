import { Status } from '../types/meeting';

interface Props {
  status: Status;
}

export default function StatusCard({ status }: Props) {
  if (status === 'uploading') return (
    <div className="mt-6 bg-blue-500/20 border border-blue-400/30 rounded-2xl p-6 text-center">
      <div className="text-3xl mb-2 animate-bounce">⬆️</div>
      <p className="text-blue-300 font-medium">מעלה קובץ...</p>
    </div>
  );

  if (status === 'processing') return (
    <div className="mt-6 bg-purple-500/20 border border-purple-400/30 rounded-2xl p-6 text-center">
      <div className="text-3xl mb-2 animate-spin">⚙️</div>
      <p className="text-purple-300 font-medium">מעבד את הפגישה עם AI...</p>
      <p className="text-purple-400/60 text-sm mt-1">זה יכול לקחת כ-30 שניות</p>
    </div>
  );

  if (status === 'failed') return (
    <div className="mt-6 bg-red-500/20 border border-red-400/30 rounded-2xl p-6 text-center">
      <div className="text-3xl mb-2">❌</div>
      <p className="text-red-300 font-medium">משהו השתבש — נסי שוב</p>
    </div>
  );
return <div className="mt-6 h-[120px]" />;
}