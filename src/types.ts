
export interface Question {
  id: string;
  chapter: string;
  content: string;
  contentVi?: string;
  answer: '○' | '×';
  explanation: string;
  explanationVi?: string;
  image?: string;
}

export interface SituationQuestion {
  id: string;
  chapter: string;
  image: string;
  subQuestions: Question[];
}

export type ExamQuestion = Question | SituationQuestion;

export interface ExamResults {
  totalScore: number;
  isPass: boolean;
  wrongAnswers: {
    question: ExamQuestion;
    userAnswers: Record<string, '○' | '×' | null>;
  }[];
}
