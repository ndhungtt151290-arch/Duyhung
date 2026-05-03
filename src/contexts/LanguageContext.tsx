import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'vi' | 'ja';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  vi: {
    appTitle: 'Gentsuki Master',
    startPractice: 'Bắt đầu thi thử',
    nextQuestion: 'Câu tiếp theo',
    completeChapter: 'Hoàn thành chương',
    backToHome: 'Quay lại trang chủ',
    explanation: 'Giải thích:',
    startExam: 'Bắt đầu thi thử',
    back: 'Quay lại',
    next: 'Tiếp theo',
    finish: 'Kết thúc',
    questionCount: 'Câu hỏi',
    correct: 'Chính xác!',
    incorrect: 'Sai rồi!',
    langName: 'Tiếng Việt',
    mockExam: 'Thi thử',
    submit: 'Nộp bài',
    examResult: 'Kết quả thi',
    pass: 'ĐỖ',
    fail: 'TRƯỢT',
    score: 'Điểm số',
    passRequirement: 'Yêu cầu: 45/48 điểm',
    reviewAnswers: 'Xem lại câu trả lời',
    questionList: 'Danh sách câu hỏi',
    close: 'Đóng',
    unanswered: 'Chưa trả lời',
    timeRemaining: 'Thời gian',
    timeOver: 'Hết giờ!',
    '運転の基礎知識': 'Kiến thức cơ bản về lái xe',
    '標識・標示・信号': 'Biển báo, vạch kẻ và tín hiệu',
    '道路の走行方法': 'Cách đi trên đường',
    '追い越し・駐停車': 'Vượt xe, dừng và đỗ xe',
    '危険な状況での運転': 'Lái xe trong tình huống nguy hiểm',
    '総合演習1': 'Luyện tập tổng hợp 1',
    '総合演習2': 'Luyện tập tổng hợp 2',
    '総合演習3': 'Luyện tập tổng hợp 3',
    '総合演習4': 'Luyện tập tổng hợp 4',
    '総合演習5': 'Luyện tập tổng hợp 5',
    '危険予測【イラスト問題】': 'Dự đoán nguy hiểm (Hình ảnh)',
    '総合演習6【イラスト問題】': 'Luyện tập tổng hợp 6 (Hình ảnh)',
  },
  ja: {
    appTitle: '原付マスター',
    startPractice: '模擬試験を開始',
    nextQuestion: '次の問題',
    completeChapter: '章を完了',
    backToHome: 'ホームに戻る',
    explanation: '解説:',
    startExam: '模擬試験を開始',
    back: '戻る',
    next: '次へ',
    finish: '終了',
    questionCount: '問題',
    correct: '正解！',
    incorrect: '不正解...',
    langName: '日本語',
    mockExam: '模擬試験',
    submit: '終了',
    examResult: '試験結果',
    pass: '合格',
    fail: '不合格',
    score: '得点',
    passRequirement: '合格基準: 45/48 点',
    reviewAnswers: '回答を確認',
    questionList: '問題一覧',
    close: '閉じる',
    unanswered: '未回答',
    timeRemaining: '残り時間',
    timeOver: '終了！',
    '運転の基礎知識': '運転の基礎知識',
    '標識・標示・信号': '標識・標示・信号',
    '道路の走行方法': '道路の走行方法',
    '追い越し・駐停車': '追い越し・駐停車',
    '危険な状況での運転': '危険な状況での運転',
    '総合演習1': '総合演習1',
    '総合演習2': '総合演習2',
    '総合演習3': '総合演習3',
    '総合演習4': '総合演習4',
    '総合演習5': '総合演習5',
    '危険予測【イラスト問題】': '危険予測【イラスト問題】',
    '総合演習6【イラスト問題】': '総合演習6【イラスト問題】',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('vi');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'vi' ? 'ja' : 'vi');
  };

  const t = (key: string) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
