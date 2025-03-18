import api from '../index';
import { ENDPOINTS } from '../endpoints';
import { StressTest, StressTestQuestion } from '../interfaces/StressTest';
import { StressDiagnostic } from '../interfaces/StressDiagnostic';

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

  // 🔹 Ajouter un résultat de test
  async addTestResult(
    testId: number,
    minScore: number,
    maxScore: number,
    interpretation: string
  ): Promise<void> {
    await api.post(ENDPOINTS.STRESS_DIAGNOSIS.ADD_TEST_RESULT, {
      test_id: testId,
      min_score: minScore,
      max_score: maxScore,
      interpretation: interpretation,
    });
  },

  // 🔹 Modifier un résultat de test
  async updateTestResult(
    resultId: number,
    minScore: number,
    maxScore: number,
    interpretation: string
  ): Promise<void> {
    await api.put(ENDPOINTS.STRESS_DIAGNOSIS.UPDATE_TEST_RESULT, {
      result_id: resultId,
      min_score: minScore,
      max_score: maxScore,
      interpretation: interpretation,
    });
  },

  // 🔹 Supprimer un résultat de test
  async deleteTestResult(resultId: number): Promise<void> {
    await api.delete(ENDPOINTS.STRESS_DIAGNOSIS.DELETE_TEST_RESULT, {
      data: { result_id: resultId },
    });
  },

  // 🔹 Obtenir l’interprétation d’un score
  async getScoreInterpretation(testId: number, score: number): Promise<string> {
    return (
      await api.get<{ interpretation: string }>(
        ENDPOINTS.STRESS_DIAGNOSIS.GET_SCORE_INTERPRETATION,
        {
          params: { test_id: testId, score: score },
        }
      )
    ).data.interpretation;
  },
};