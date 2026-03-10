import axios from 'axios';
import { Meeting } from '../types/meeting';

const API = 'http://localhost:8000/api';

export const uploadAudio = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await axios.post(`${API}/meetings/upload-audio`, formData);
  return res.data.meeting_id;
};

export const getMeeting = async (id: string): Promise<Meeting> => {
  const res = await axios.get(`${API}/meetings/${id}`);
  return res.data;
};