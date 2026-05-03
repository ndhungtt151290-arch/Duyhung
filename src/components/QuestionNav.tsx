import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ExamQuestion } from '../types';
import { useState } from 'react';

interface QuestionNavProps {
  questions: ExamQuestion[];
  currentIndex: number;
  onSelect: (index: number) => void;
  answers: Record<string, '○' | '×' | null>;
}

export default function QuestionNav({ questions, currentIndex, onSelect, answers }: QuestionNavProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const doneCount = questions.reduce((count, q) => {
    if ('subQuestions' in q) {
      const allAnswered = q.subQuestions.every(sq => answers[sq.id]);
      return allAnswered ? count + 1 : count;
    } else {
      return answers[q.id] ? count + 1 : count;
    }
  }, 0);

  const getStatusColor = (index: number) => {
    const q = questions[index];
    const isCurrent = index === currentIndex;
    
    let baseColor = '';
    let textColor = '';

    if ('subQuestions' in q) {
      const answeredSub = q.subQuestions.filter(sq => answers[sq.id]);
      if (answeredSub.length === q.subQuestions.length) {
        baseColor = 'bg-green-500';
        textColor = 'text-white';
      } else if (answeredSub.length > 0) {
        baseColor = 'bg-yellow-100';
        textColor = 'text-yellow-700';
      } else {
        baseColor = 'bg-neutral-100';
        textColor = 'text-neutral-400';
      }
    } else {
      if (answers[q.id]) {
        baseColor = 'bg-green-500';
        textColor = 'text-white';
      } else {
        baseColor = 'bg-neutral-100';
        textColor = 'text-neutral-400';
      }
    }

    return `${baseColor} ${textColor} ${isCurrent ? 'ring-2 ring-yellow-400 ring-offset-2 scale-105 z-10' : ''}`;
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        id="question-nav-btn"
        className="flex justify-between items-center bg-white border border-neutral-200 rounded-2xl shadow-sm active:bg-neutral-50 active:scale-[0.98] transition-all shrink-0"
        style={{ paddingLeft: '6px', marginTop: '-5px', width: '343px', marginLeft: '0px', height: '45px' }}
      >
        <div className="flex items-center gap-3 font-extrabold text-neutral-700 text-sm">
          <div className="bg-neutral-100 p-1.5 rounded-lg">
            <LayoutGrid className="w-5 h-5 text-neutral-500" />
          </div>
          <span>{t('questionList')}</span>
        </div>
        <div className="bg-[#FFFBEB] px-3 py-1.5 rounded-full border border-[#FEF3C7] text-sm font-black flex items-center gap-1 shadow-sm" style={{ fontSize: '20px', lineHeight: '15px', textAlign: 'center', fontStyle: 'italic', marginRight: '13px' }}>
          <span className="text-[#D97706]">{doneCount}</span>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-400">{questions.length}</span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-neutral-900/60 z-[60] backdrop-blur-[4px]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[3rem] z-[70] shadow-2xl overflow-hidden flex flex-col safe-pb"
              style={{ maxHeight: '85vh' }}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mb-6 shrink-0" />
                
                <div className="flex justify-between items-center mb-6 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-6 bg-red-600 rounded-full" />
                    <h3 className="text-xl font-black text-neutral-800 tracking-tight uppercase">{t('questionList')}</h3>
                  </div>
                  <div className="bg-neutral-50 px-4 py-2 rounded-2xl border border-neutral-100">
                    <span className="text-sm font-black text-neutral-400">
                      <span className="text-[#D97706] text-lg">{doneCount}</span> / {questions.length}
                    </span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide pb-8">
                  <div className="grid grid-cols-5 sm:grid-cols-6 gap-3">
                    {questions.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => {
                          onSelect(idx);
                          setIsOpen(false);
                        }}
                        className={`aspect-square rounded-2xl text-sm font-black flex items-center justify-center transition-all shadow-sm active:scale-90 ${getStatusColor(idx)}`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-neutral-900 text-white p-4 rounded-2xl font-black text-base shadow-lg shadow-neutral-200 active:scale-95 transition-all mt-4 shrink-0"
                >
                  {t('close')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
