import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Check, 
  X, 
  Timer,
  Award,
  AlertCircle,
  Flag
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ExamQuestion, ExamResults, Question, SituationQuestion } from '../types';
import { calculateScore } from '../utils/examUtils';
import QuestionNav from './QuestionNav';

interface MockExamProps {
  questions: ExamQuestion[];
  onExit: () => void;
  imageModules: Record<string, { default: string }>;
}

export default function MockExam({ questions, onExit, imageModules }: MockExamProps) {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, '○' | '×' | null>>({});
  const [timeLeft, setTimeLeft] = useState(3000); // 50 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<ExamResults | null>(null);
  const [visitedIndices, setVisitedIndices] = useState<Set<number>>(new Set([0]));

  // Timer logic
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  // Submit if time is over
  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  // Track visited indices
  useEffect(() => {
    setVisitedIndices(prev => new Set(prev).add(currentIndex));
  }, [currentIndex]);

  const reviewedAll = visitedIndices.size === questions.length;

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (questionId: string, answer: '○' | '×') => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    // Auto next logic for regular questions (not situations)
    if (!('subQuestions' in currentQuestion)) {
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(prev => prev + 1);
        }
      }, 300);
    }
  };

  const handleSubmit = () => {
    const res = calculateScore(questions, answers);
    setResults(res);
    setIsSubmitted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Status mapping for the grid
  const getStatusColor = (index: number) => {
    const q = questions[index];
    if (index === currentIndex) return 'ring-2 ring-yellow-400 scale-110 z-10';
    
    if ('subQuestions' in q) {
      const answeredSub = q.subQuestions.filter(sq => answers[sq.id]);
      if (answeredSub.length === q.subQuestions.length) return 'bg-green-500 text-white';
      if (answeredSub.length > 0) return 'bg-yellow-100 text-yellow-700';
      return 'bg-neutral-200 text-neutral-400';
    } else {
      if (answers[q.id]) return 'bg-green-500 text-white';
      return 'bg-neutral-200 text-neutral-400';
    }
  };

  if (isSubmitted && results) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col flex-1 min-h-0 space-y-4 pb-6 overflow-hidden"
      >
        <div className={`p-6 rounded-[2rem] text-center space-y-3 shadow-lg shrink-0 ${results.isPass ? 'bg-gradient-to-br from-green-400 to-green-600 text-white' : 'bg-gradient-to-br from-red-400 to-red-600 text-white'}`}>
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto backdrop-blur-md">
            {results.isPass ? <Award className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tight uppercase">
              {results.isPass ? t('pass') : t('fail')}
            </h2>
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm font-bold opacity-90">{t('score')}: {results.score} / {questions.length}</p>
              <p className="text-[0.625rem] font-medium bg-black/10 inline-block px-3 py-0.5 rounded-full">{t('passRequirement')}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0 space-y-3 overflow-hidden">
          <h3 className="text-lg font-black text-neutral-800 flex items-center gap-2 shrink-0">
            <Flag className="w-5 h-5 text-red-600" />
            {t('reviewAnswers')}
          </h3>
          
          <div className="flex-1 overflow-auto space-y-3 pr-1 scrollbar-hide">
            {results.wrongAnswers.map((wa, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-sm space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-[0.5rem] font-black uppercase tracking-widest">
                    {('subQuestions' in wa.question) ? 'Situation' : 'Regular'}
                  </span>
                </div>
                
                {'subQuestions' in wa.question ? (
                  <div className="space-y-4">
                    <p className="font-bold text-xs text-neutral-800 line-clamp-2">{language === 'vi' && wa.question.subQuestions[0].contentVi ? wa.question.subQuestions[0].contentVi.split(']')[0] + ']' : wa.question.subQuestions[0].content}</p>
                    {wa.question.subQuestions.map((sq, sIdx) => {
                      const isWrong = wa.userAnswers[sq.id] !== sq.answer;
                      return (
                        <div key={sq.id} className={`p-3 rounded-xl border ${isWrong ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
                           <p className="text-[0.625rem] font-bold mb-1">Q{sIdx + 1}: {language === 'vi' && sq.contentVi ? sq.contentVi : sq.content}</p>
                           <div className="flex gap-3 text-[0.625rem] font-black">
                             <div className="flex items-center gap-1">
                               <span className="text-neutral-400">Your:</span>
                               <span className={wa.userAnswers[sq.id] === sq.answer ? 'text-green-600' : 'text-red-600'}>{wa.userAnswers[sq.id] || '?'}</span>
                             </div>
                             <div className="flex items-center gap-1">
                               <span className="text-neutral-400">Correct:</span>
                               <span className="text-green-600">{sq.answer}</span>
                             </div>
                           </div>
                           <p className="mt-1.5 text-[0.625rem] text-neutral-600 leading-relaxed italic line-clamp-2">{language === 'vi' && sq.explanationVi ? sq.explanationVi : sq.explanation}</p>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="font-bold text-sm text-neutral-800 leading-snug">
                      {language === 'vi' && wa.question.contentVi ? wa.question.contentVi : wa.question.content}
                    </p>
                    <div className="flex gap-3 text-[0.625rem] font-black">
                      <div className="flex items-center gap-1">
                        <span className="text-neutral-400">Your:</span>
                        <span className="text-red-600">{wa.userAnswers[wa.question.id] || '?'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-neutral-400">Correct:</span>
                        <span className="text-green-600">{wa.question.answer}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 mt-1">
                       <p className="text-[0.625rem] text-blue-700 leading-relaxed font-medium">
                         {language === 'vi' && wa.question.explanationVi ? wa.question.explanationVi : wa.question.explanation}
                       </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={onExit}
          className="w-full bg-neutral-900 text-white p-4 rounded-2xl font-black text-base shadow-lg flex items-center justify-center gap-2 shrink-0"
        >
          {t('finish')}
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 space-y-3 pb-2">
      {/* Header Info */}
      <div className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm border border-neutral-100 shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-red-100 p-1.5 rounded-lg">
            <Timer className="w-4 h-4 text-red-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-[0.5rem] font-black text-neutral-400 uppercase tracking-widest leading-none">{t('timeRemaining')}</span>
            <span className={`text-base font-black tabular-nums transition-colors leading-tight ${timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-neutral-800'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        
        <button 
          onClick={handleSubmit}
          disabled={!reviewedAll}
          className={`px-4 py-2 rounded-xl font-black text-[0.625rem] uppercase tracking-wider shadow-md transition-all active:scale-95 ${
            reviewedAll 
              ? 'bg-neutral-900 text-white hover:bg-neutral-800' 
              : 'bg-neutral-100 text-neutral-400 cursor-not-allowed opacity-50'
          }`}
        >
          {t('submit')}
        </button>
      </div>

      {/* Question Navigation Drawer */}
      <QuestionNav 
        questions={questions}
        currentIndex={currentIndex}
        onSelect={setCurrentIndex}
        answers={answers}
      />

      {/* Question Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl p-4 shadow-lg border border-neutral-100 flex-1 flex flex-col min-h-0 space-y-4 overflow-hidden"
        >
          <div className="flex justify-between items-center shrink-0">
            <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-[0.5rem] font-black uppercase tracking-widest">
              {('subQuestions' in currentQuestion) ? 'Situation' : 'Regular'}
            </span>
            <span className="text-[0.625rem] font-bold text-neutral-300">#{currentIndex + 1}</span>
          </div>

          <div className="flex-1 flex flex-col min-h-0 space-y-4 overflow-auto scrollbar-hide">
            {'subQuestions' in currentQuestion ? (
              <>
                {currentQuestion.image && (
                  <div className="relative group shrink-0">
                    <img 
                      src={imageModules[`/src/uploads/image/${currentQuestion.image}`]?.default} 
                      alt="Situation" 
                      className="w-full h-24 object-contain bg-neutral-50 rounded-xl shadow-sm" 
                    />
                  </div>
                )}
                
                <div className="space-y-4">
                  {currentQuestion.subQuestions.map((sq, sIdx) => (
                    <div key={sq.id} className="space-y-2 border-t border-neutral-50 pt-3 first:border-0 first:pt-0">
                      <p className="text-xs font-bold leading-tight text-neutral-800">
                        <span className="text-red-500 mr-1">({sIdx + 1})</span>
                        {language === 'vi' && sq.contentVi ? sq.contentVi : sq.content}
                      </p>
                      
                      <div className="flex gap-4">
                        {['○', '×'].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleAnswer(sq.id, opt as '○' | '×')}
                            className={`relative rounded-2xl flex items-center justify-center text-6xl font-sans transition-all shadow-md ${
                              answers[sq.id]
                                ? (answers[sq.id] === opt 
                                    ? (opt === '○' ? 'bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white ring-4 ring-green-100 translate-y-[-2px]' : 'bg-gradient-to-br from-red-400 via-red-500 to-red-600 text-white ring-4 ring-red-100 translate-y-[-2px]')
                                    : 'bg-neutral-100 text-neutral-300 grayscale opacity-40')
                                : (opt === '○' ? 'bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white hover:shadow-green-300/50 hover:translate-y-[-2px]' : 'bg-gradient-to-br from-red-400 via-red-500 to-red-600 text-white hover:shadow-red-300/50 hover:translate-y-[-2px]')
                            }`}
                            style={{ 
                              width: '100px', 
                              height: '80px', 
                              flex: 'none',
                              marginLeft: opt === '×' ? '36px' : '0px',
                              marginTop: opt === '×' ? '1px' : '0px'
                            }}
                          >
                            {opt === '○' ? (
                              <span className="drop-shadow-lg" style={{ marginTop: '-9px', fontSize: '57px', lineHeight: '57px' }}>○</span>
                            ) : (
                              <span className="drop-shadow-lg" style={{ fontFamily: 'Courier New', height: '74px', fontSize: '80px', lineHeight: '80px', marginTop: '-1px' }}>×</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-4">
                {currentQuestion.image && (
                  <div className="relative group shrink-0">
                    <img 
                      src={imageModules[`/src/uploads/image/${currentQuestion.image}`]?.default} 
                      alt="Question visual" 
                      className="w-full h-32 object-contain bg-neutral-50 rounded-xl shadow-sm" 
                    />
                  </div>
                )}

                <p className="text-base font-bold leading-tight text-neutral-800 text-center py-2 flex items-center justify-center">
                  {language === 'vi' && currentQuestion.contentVi ? currentQuestion.contentVi : currentQuestion.content}
                </p>
              </div>
            )}
          </div>
          
          {!('subQuestions' in currentQuestion) && (
            <div className="flex justify-center shrink-0 pt-2 border-t border-neutral-100">
              <div className="flex gap-4" style={{ height: '84px', width: '254px' }}>
                {['○', '×'].map((opt) => (
                  <motion.button
                    key={opt}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAnswer(currentQuestion.id, opt as '○' | '×')}
                    className={`relative flex-1 rounded-2xl flex items-center justify-center text-6xl font-sans transition-all shadow-md ${
                      answers[currentQuestion.id]
                        ? (answers[currentQuestion.id] === opt 
                            ? (opt === '○' ? 'bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white ring-4 ring-green-100 translate-y-[-2px]' : 'bg-gradient-to-br from-red-400 via-red-500 to-red-600 text-white ring-4 ring-red-100 translate-y-[-2px]')
                            : 'bg-neutral-100 text-neutral-300 grayscale opacity-40')
                        : (opt === '○' ? 'bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white hover:shadow-green-300/50 hover:translate-y-[-2px]' : 'bg-gradient-to-br from-red-400 via-red-500 to-red-600 text-white hover:shadow-red-300/50 hover:translate-y-[-2px]')
                    }`}
                    style={{ 
                      width: '100px', 
                      height: '80px', 
                      flex: 'none',
                      marginLeft: opt === '×' ? '36px' : '0px',
                      marginTop: opt === '×' ? '1px' : '0px'
                    }}
                  >
                    {opt === '○' ? (
                      <span className="drop-shadow-lg" style={{ marginTop: '-9px', fontSize: '57px', lineHeight: '57px' }}>○</span>
                    ) : (
                      <span className="drop-shadow-lg" style={{ fontFamily: 'Courier New', height: '74px', fontSize: '80px', lineHeight: '80px', marginTop: '-1px' }}>×</span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex gap-3 shrink-0">
         <button 
           onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
           disabled={currentIndex === 0}
           className="flex-1 bg-white border border-neutral-200 p-3 rounded-xl font-bold text-neutral-800 shadow-sm flex items-center justify-center gap-1 hover:bg-neutral-50 transition-colors disabled:opacity-30"
         >
           <ChevronLeft className="w-4 h-4 text-red-600" />
           <span className="text-xs">{t('back')}</span>
         </button>
         <button 
           onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
           disabled={currentIndex === questions.length - 1}
           className="flex-1 bg-neutral-900 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-1 hover:bg-neutral-800 transition-colors disabled:opacity-30"
         >
           <span className="text-xs">{t('next')}</span>
           <ChevronRight className="w-4 h-4 text-red-600" />
         </button>
      </div>

      <div className="h-6" />
    </div>
  );
}
