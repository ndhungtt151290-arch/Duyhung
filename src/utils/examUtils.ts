import { Question, SituationQuestion, ExamQuestion } from '../types';

export const generateExam = (allQuestions: Question[]): ExamQuestion[] => {
  const regularPool = allQuestions.filter(q => !q.chapter.includes('イラスト問題'));
  const situationPool = allQuestions.filter(q => q.chapter.includes('イラスト問題'));

  // Logic to group situation questions
  // We assume consecutive 3 questions with same prefix/content are a situation
  const situationGroups: SituationQuestion[] = [];
  for (let i = 0; i < situationPool.length; i += 3) {
    if (i + 2 < situationPool.length) {
      const q1 = situationPool[i];
      const q2 = situationPool[i+1];
      const q3 = situationPool[i+2];
      
      situationGroups.push({
        id: `situation_${q1.id}`,
        chapter: q1.chapter,
        image: q1.image || '', // Usually all 3 have similar or same image, we use the first one
        subQuestions: [q1, q2, q3]
      });
    }
  }

  const shuffledRegular = [...regularPool].sort(() => 0.5 - Math.random());
  const shuffledSituations = [...situationGroups].sort(() => 0.5 - Math.random());

  const exam: ExamQuestion[] = [
    ...shuffledRegular.slice(0, 45),
    ...shuffledSituations.slice(0, 3)
  ];

  return exam;
};

export const calculateScore = (questions: ExamQuestion[], answers: Record<string, '○' | '×' | null>) => {
  let score = 0;
  const wrongAnswers: { question: ExamQuestion; userAnswers: Record<string, '○' | '×' | null> }[] = [];

  questions.forEach((q) => {
    if ('subQuestions' in q) {
      // Situation question
      const allCorrect = q.subQuestions.every(sq => answers[sq.id] === sq.answer);
      if (allCorrect) {
        score += 1; // 1 point per situation block? The user said 45+3=48. So 1 point for the big question.
      } else {
        const userAnswersForSituation: Record<string, '○' | '×' | null> = {};
        q.subQuestions.forEach(sq => {
          userAnswersForSituation[sq.id] = answers[sq.id] || null;
        });
        wrongAnswers.push({
          question: q,
          userAnswers: userAnswersForSituation
        });
      }
    } else {
      // Regular question
      if (answers[q.id] === q.answer) {
        score += 1;
      } else {
        wrongAnswers.push({
          question: q,
          userAnswers: { [q.id]: answers[q.id] || null }
        });
      }
    }
  });

  return {
    score,
    isPass: score >= 45,
    wrongAnswers
  };
};
