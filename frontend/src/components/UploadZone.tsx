import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  onFileDrop: (file: File) => void;
}

export default function UploadZone({ onFileDrop }: Props) {
  const onDrop = useCallback((files: File[]) => {
    if (files[0]) onFileDrop(files[0]);
  }, [onFileDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'audio/*': ['.mp3', '.mp4', '.m4a', '.wav'] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="relative cursor-pointer rounded-2xl p-12 text-center transition-all duration-300"
      style={{
        border: isDragActive ? '2px solid #00F5FF' : '2px dashed rgba(0,245,255,0.3)',
        background: isDragActive ? 'rgba(0,245,255,0.05)' : 'rgba(0,0,0,0.5)',
        boxShadow: isDragActive ? '0 0 30px rgba(0,245,255,0.2), inset 0 0 30px rgba(0,245,255,0.05)' : 'none',
        transform: isDragActive ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      <input {...getInputProps()} />

      {/* Corner decorations */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: '#00F5FF' }} />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: '#00F5FF' }} />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: '#00F5FF' }} />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: '#00F5FF' }} />

      <div className="text-5xl mb-4">{isDragActive ? '📂' : '🎵'}</div>
      <p className="text-lg font-medium mb-1 tracking-wide" style={{
        color: isDragActive ? '#00F5FF' : 'white',
        textShadow: isDragActive ? '0 0 10px #00F5FF' : 'none'
      }}>
        {isDragActive ? 'שחרר כאן!' : 'גרור קובץ אודיו לכאן'}
      </p>
      <p className="text-sm tracking-widest" style={{ color: 'rgba(0,245,255,0.4)' }}>
        MP3 · MP4 · M4A · WAV
      </p>
    </div>
  );
}