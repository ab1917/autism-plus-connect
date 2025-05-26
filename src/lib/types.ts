
export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  dateOfBirth: string;
  diagnoses: string[];
  avatar?: string;
  sensitivities: string[];
  preferences: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DiaryEntry {
  id: string;
  childId: string;
  date: string;
  category: 'escola' | 'terapia' | 'medico' | 'cotidiano';
  title: string;
  content: string;
  mood: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  createdAt: string;
}

export interface BehaviorEntry {
  id: string;
  childId: string;
  date: string;
  behavior: string;
  intensity: number; // 1-10
  duration: number; // em minutos
  antecedents: string;
  consequences: string;
  interventions: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
