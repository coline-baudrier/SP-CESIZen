import api from '../index';
import { ENDPOINTS } from '../endpoints';
import { Emotion } from '../interfaces/Emotion';
import { EmotionTracker } from '../interfaces/EmotionTracker';

export const emotionService = {
  // 🟢 Gestion des émotions
  async getAllEmotions(): Promise<Emotion[]> {
    return (await api.get<Emotion[]>(ENDPOINTS.EMOTIONS.GET_ALL)).data;
  },

  async getEmotionById(id: number): Promise<Emotion> {
    return (await api.post<Emotion>(ENDPOINTS.EMOTIONS.GET_BY_ID, { id })).data;
  },

  async getEmotionsByBase(baseId: number): Promise<Emotion[]> {
    return (await api.post<Emotion[]>(ENDPOINTS.EMOTIONS.GET_BY_BASE, { base_id: baseId })).data;
  },

  async createEmotion(name: string, baseId: number): Promise<void> {
    await api.post(ENDPOINTS.EMOTIONS.CREATE, { name, base_id: baseId });
  },

  async updateEmotion(id: number, name: string): Promise<void> {
    await api.put(ENDPOINTS.EMOTIONS.UPDATE, { id, name });
  },

  async changeEmotionStatus(id: number): Promise<void> {
    await api.patch(ENDPOINTS.EMOTIONS.CHANGE_STATUS, { id });
  },

  // 🔵 Gestion du tracker d'émotions
  async getEmotionJournal(): Promise<EmotionTracker[]> {
    return (await api.get<EmotionTracker[]>(ENDPOINTS.EMOTION_TRACKER.GET_JOURNAL)).data;
  },

  async getJournalEntry(id: number): Promise<EmotionTracker> {
    return (await api.post<EmotionTracker>(ENDPOINTS.EMOTION_TRACKER.GET_ENTRY, { id })).data;
  },

  async getJournalByPeriod(period: string): Promise<EmotionTracker[]> {
    return (await api.post<EmotionTracker[]>(ENDPOINTS.EMOTION_TRACKER.GET_BY_PERIOD, { period }))
      .data;
  },

  async addEmotionEntry(emotionId: number, intensity: number, note?: string): Promise<void> {
    await api.post(ENDPOINTS.EMOTION_TRACKER.ADD_ENTRY, { emotion_id: emotionId, intensity, note });
  },

  async updateEmotionEntry(id: number, intensity: number): Promise<void> {
    await api.put(ENDPOINTS.EMOTION_TRACKER.UPDATE_ENTRY, { id, intensity });
  },

  async removeEmotionEntry(id: number): Promise<void> {
    await api.delete(ENDPOINTS.EMOTION_TRACKER.REMOVE_ENTRY, { data: { id } });
  },
};
