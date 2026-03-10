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
      className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
        ${isDragActive
          ? 'border-purple-400 bg-purple-500/20 scale-[1.02]'
          : 'border-white/20 bg-white/5 hover:border-purple-400 hover:bg-purple-500/10'
        }`}
    >
      <input {...getInputProps()} />
      <div className="text-5xl mb-4">{isDragActive ? '📂' : '🎵'}</div>
      <p className="text-white text-lg font-medium mb-1">
        {isDragActive ? 'שחרר כאן!' : 'גרור קובץ אודיו לכאן'}
      </p>
      <p className="text-white/50 text-sm">MP3, MP4, M4A, WAV • עד 100MB</p>
    </div>
  );
}