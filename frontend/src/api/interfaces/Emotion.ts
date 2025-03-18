export interface Emotion {
    id: number;
    name: string;
    is_active: boolean;
    base_emotion_id: number;
    base_emotion?: BaseEmotion;
  }
  
  export interface BaseEmotion {
    id: number;
    name: string;
  }