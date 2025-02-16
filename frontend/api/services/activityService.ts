import api from '../index.ts';
import { ENDPOINTS } from '../endpoints.ts';
import { RelaxationActivity } from '../interfaces/RelaxationActivity.ts';
import { UserFavoriteActivity } from '../interfaces/UserFavoriteActivity.ts';

export const activityService = {
  async getAllActivities(): Promise<RelaxationActivity[]> {
    return (await api.get<RelaxationActivity[]>(ENDPOINTS.RELAXATION_ACTIVITIES.GET_ALL)).data;
  },

  async getActivity(id: number): Promise<RelaxationActivity> {
    return (await api.post<RelaxationActivity>(ENDPOINTS.RELAXATION_ACTIVITIES.GET_ONE, { id }))
      .data;
  },

  async createActivity(name: string, description: string): Promise<void> {
    await api.post(ENDPOINTS.RELAXATION_ACTIVITIES.CREATE, { name, description });
  },

  async updateActivity(id: number, name: string, description: string): Promise<void> {
    await api.put(ENDPOINTS.RELAXATION_ACTIVITIES.UPDATE, { id, name, description });
  },

  async toggleActivity(id: number): Promise<void> {
    await api.patch(ENDPOINTS.RELAXATION_ACTIVITIES.TOGGLE, { id });
  },

  async getUserFavorites(): Promise<UserFavoriteActivity[]> {
    return (await api.get<UserFavoriteActivity[]>(ENDPOINTS.FAVORITE_ACTIVITIES.GET_ALL)).data;
  },

  async addFavorite(activityId: number): Promise<void> {
    await api.post(ENDPOINTS.FAVORITE_ACTIVITIES.ADD, { activity_id: activityId });
  },

  async removeFavorite(activityId: number): Promise<void> {
    await api.delete(ENDPOINTS.FAVORITE_ACTIVITIES.REMOVE, { data: { activity_id: activityId } });
  },
};
