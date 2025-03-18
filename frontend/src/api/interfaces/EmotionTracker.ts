import { Emotion } from './Emotion';

export interface EmotionTracker {
  id: number;
  user_id: number;
  emotion_id: number;
  intensity: number; // Entre 1 et 10
  note?: string;
  created_at: string;
  updated_at: string;
  emotion?: Emotion;
}