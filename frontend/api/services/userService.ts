import api from '../index';
import { ENDPOINTS } from '../endpoints';
import { User } from '../interfaces/User';

export const userService = {
  async authenticate(email: string, password: string): Promise<{ token: string }> {
    return (await api.post<{ token: string }>(ENDPOINTS.USERS.AUTHENTICATE, { email, password }))
      .data;
  },

  async register(username: string, email: string, password: string): Promise<void> {
    await api.post(ENDPOINTS.USERS.REGISTER, { username, email, password });
  },

  async createAdmin(username: string, email: string, password: string): Promise<void> {
    await api.post(ENDPOINTS.USERS.REGISTER_ADMIN, { username, email, password });
  },

  async getProfile(): Promise<User> {
    return (await api.get<User>(ENDPOINTS.USERS.PROFILE)).data;
  },

  async getAllUsers(): Promise<User[]> {
    return (await api.get<User[]>(ENDPOINTS.USERS.GET_ALL)).data;
  },

  async updateUser(data: Partial<User>): Promise<void> {
    await api.put(ENDPOINTS.USERS.UPDATE, data);
  },

  async changePassword(email: string, newPassword: string): Promise<void> {
    await api.put(ENDPOINTS.USERS.CHANGE_PASSWORD, { email, new_password: newPassword });
  },

  async deleteUser(userId: number): Promise<void> {
    await api.delete(ENDPOINTS.USERS.DELETE, { data: { user_id: userId } });
  },

  async changeUserStatus(userId: number): Promise<void> {
    await api.patch(ENDPOINTS.USERS.CHANGE_STATUS, { user_id: userId });
  },
};
