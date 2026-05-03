import { Question } from '../types';

export const parseAllData = (
  data1: string,
  data2: string,
  data3: string,
  data4: string,
  data5: string
): Question[] => {
  const allText = [data1, data2, data3, data4, data5].join('\n');
  const blocks = allText.split('----------------------------------------------------------------------');
  return blocks
    .filter(block => block.includes('ID:'))
    .map(block => {
      const lines = block.split('\n');
      const getField = (prefix: string) => lines.find(line => line.includes(prefix))?.split(prefix)[1]?.trim();

      return {
        id: getField('ID:') || '',
        chapter: getField('章:') || '',
        content: getField('問:') || '',
        answer: (getField('答:') || '') as '○' | '×',
        explanation: getField('解説:') || '',
        image: getField('画像:')
      };
    });
};
