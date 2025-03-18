export interface StressTest {
    id: number;
    name: string;
    description: string;
  }
  
  export interface StressTestQuestion {
    id: number;
    stress_test_id: number;
    question: string;
    value: number;
  }