import api from '../index.ts';
import { ENDPOINTS } from '../endpoints.ts';
import { StressTest, StressTestQuestion } from '../interfaces/StressTest.ts';
import { StressDiagnostic } from '../interfaces/StressDiagnostic.ts';

export const stressService = {
  async getAllTests(): Promise<StressTest[]> {
    return (await api.get<StressTest[]>(ENDPOINTS.STRESS_DIAGNOSIS.GET_ALL_TESTS)).data;
  },

  async getTestQuestions(testId: number): Promise<StressTestQuestion[]> {
    return (
      await api.post<StressTestQuestion[]>(ENDPOINTS.STRESS_DIAGNOSIS.GET_TEST_QUESTIONS, {
        test_id: testId,
      })
    ).data;
  },

  async createTest(name: string, description: string): Promise<void> {
    await api.post(ENDPOINTS.STRESS_DIAGNOSIS.CREATE_TEST, { name, description });
  },

  async addQuestion(testId: number, question: string, value: number): Promise<void> {
    await api.post(ENDPOINTS.STRESS_DIAGNOSIS.ADD_QUESTION, { test_id: testId, question, value });
  },

  async updateQuestion(questionId: number, question: string, value: number): Promise<void> {
    await api.put(ENDPOINTS.STRESS_DIAGNOSIS.UPDATE_QUESTION, {
      question_id: questionId,
      question,
      value,
    });
  },

  async deleteQuestion(questionId: number): Promise<void> {
    await api.delete(ENDPOINTS.STRESS_DIAGNOSIS.DELETE_QUESTION, {
      data: { question_id: questionId },
    });
  },

  async getAllDiagnostics(): Promise<StressDiagnostic[]> {
    return (await api.get<StressDiagnostic[]>(ENDPOINTS.STRESS_DIAGNOSIS.GET_ALL_DIAGNOSTICS)).data;
  },

  async getUserDiagnostics(): Promise<StressDiagnostic[]> {
    return (await api.get<StressDiagnostic[]>(ENDPOINTS.STRESS_DIAGNOSIS.GET_DIAGNOSTICS)).data;
  },

  async submitTest(testId: number, score: number): Promise<void> {
    await api.post(ENDPOINTS.STRESS_DIAGNOSIS.SUBMIT_TEST, { test_id: testId, score });
  },
};
