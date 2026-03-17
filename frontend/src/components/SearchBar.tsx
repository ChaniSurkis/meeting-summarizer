import { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:8000/api';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  
const handleSearch = async () => {
  if (!query.trim()) return;
  setLoading(true);
  setAnswer('');
  try {
    const res = await axios.get(`${API}/meetings/search`, { params: { query } });
    
    setAnswer(res.data.answer);
  } catch (err) {
    setAnswer('שגיאה בחיפוש — נסי שוב');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-px h-8 " style={{ background: 'rgba(0,245,255,0.3)' }} />
        <h2 className="text-sm font-medium tracking-widest" style={{ color: 'rgba(0,245,255,0.7)' }}>
          SEARCH ACROSS ALL MEETINGS
        </h2>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="שאל שאלה על הפגישות שלך..."
          className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
          style={{
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(0,245,255,0.2)',
            color: 'white',
          }}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-5 py-3 rounded-xl text-sm font-medium tracking-widest transition-all"
          style={{
            background: loading ? 'rgba(0,245,255,0.05)' : 'rgba(0,245,255,0.1)',
            border: '1px solid rgba(0,245,255,0.3)',
            color: '#00F5FF',
            textShadow: '0 0 8px #00F5FF',
          }}
        >
          {loading ? '...' : '🔍'}
        </button>
      </div>

      {answer && (
        <div className="mt-4 p-5 rounded-xl text-sm leading-relaxed"
          style={{
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(0,245,255,0.15)',
            color: 'rgba(255,255,255,0.75)',
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}