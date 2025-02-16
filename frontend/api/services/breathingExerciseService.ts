import api from '../index';
import { ENDPOINTS } from '../endpoints';
import { BreathingExercise } from '../interfaces/BreathingExercise';

export const breathingExerciseService = {
  async getAll(): Promise<BreathingExercise[]> {
    return (await api.get<BreathingExercise[]>(ENDPOINTS.BREATHING_EXERCISES.GET_ALL)).data;
  },

  async getOne(id: number): Promise<BreathingExercise> {
    return (await api.post<BreathingExercise>(ENDPOINTS.BREATHING_EXERCISES.GET_ONE, { id })).data;
  },

  async create(
    name: string,
    inhaleDuration: number,
    holdDuration: number,
    exhaleDuration: number
  ): Promise<void> {
    await api.post(ENDPOINTS.BREATHING_EXERCISES.CREATE, {
      name,
      inhale_duration: inhaleDuration,
      hold_duration: holdDuration,
      exhale_duration: exhaleDuration,
    });
  },

  async update(
    id: number,
    name: string,
    inhaleDuration: number,
    holdDuration: number,
    exhaleDuration: number
  ): Promise<void> {
    await api.put(ENDPOINTS.BREATHING_EXERCISES.UPDATE, {
      id,
      name,
      inhale_duration: inhaleDuration,
      hold_duration: holdDuration,
      exhale_duration: exhaleDuration,
    });
  },

  async delete(id: number): Promise<void> {
    await api.delete(ENDPOINTS.BREATHING_EXERCISES.DELETE, { data: { id } });
  },
};
