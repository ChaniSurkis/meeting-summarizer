export interface ActionItem {
  task: string;
  owner: string;
}

export interface Summary {
  summary: string;
  key_points: string[];
  action_items: ActionItem[];
}

export interface Meeting {
  id: string;
  filename: string;
  status: string;
  transcript: string;
  summary: Summary;
}

export type Status = 'idle' | 'uploading' | 'processing' | 'done' | 'failed';