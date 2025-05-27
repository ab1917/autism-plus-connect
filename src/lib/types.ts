export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  gender: 'masculino' | 'feminino' | 'outro' | 'nao_informado';
  dateOfBirth: string;
  diagnoses: string[];
  avatar?: string;
  sensitivities: string[];
  preferences: string[];
  sensoryProfile: SensoryProfile;
  communicationLevel: CommunicationLevel;
  createdAt: string;
  updatedAt: string;
}

export interface SensoryProfile {
  auditory: {
    loudNoises: 'baixa' | 'media' | 'alta';
    specificSounds: string[];
    backgroundNoise: 'baixa' | 'media' | 'alta';
  };
  visual: {
    brightLights: 'baixa' | 'media' | 'alta';
    flashingLights: 'baixa' | 'media' | 'alta';
    visualPatterns: 'baixa' | 'media' | 'alta';
  };
  tactile: {
    clothingTextures: 'baixa' | 'media' | 'alta';
    lightTouch: 'baixa' | 'media' | 'alta';
    foodTextures: 'baixa' | 'media' | 'alta';
  };
  vestibular: {
    movement: 'baixa' | 'media' | 'alta';
    heights: 'baixa' | 'media' | 'alta';
    spinning: 'baixa' | 'media' | 'alta';
  };
}

export interface CommunicationLevel {
  verbalLevel: 'nao_verbal' | 'palavras_simples' | 'frases_curtas' | 'conversacao_completa';
  preferredMethods: string[];
  strategies: string[];
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
