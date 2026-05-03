import fs from 'fs';
import path from 'path';

// This script will read all txt files and create a full questions.json
function parse(rawText: string): any[] {
  const blocks = rawText.split('----------------------------------------------------------------------');
  return blocks
    .filter(block => block.includes('ID:'))
    .map(block => {
      const lines = block.split('\n');
      const getField = (prefix: string) => lines.find(line => line.includes(prefix))?.split(prefix)[1]?.trim();
      return {
        id: getField('ID:') || '',
        chapter: getField('章:') || '',
        content: getField('問:') || '',
        contentVi: '',
        answer: (getField('答:') || '') as '○' | '×',
        explanation: getField('解説:') || '',
        explanationVi: '',
        image: getField('画像:')
      };
    });
}

const data1 = fs.readFileSync('./src/data/data_1.txt', 'utf8');
const data2 = fs.readFileSync('./src/data/data_2.txt', 'utf8');
const data3 = fs.readFileSync('./src/data/data_3.txt', 'utf8');
const data4 = fs.readFileSync('./src/data/data_4.txt', 'utf8');
const data5 = fs.readFileSync('./src/data/data_5.txt', 'utf8');

const allQuestions = [...parse(data1), ...parse(data2), ...parse(data3), ...parse(data4), ...parse(data5)];
fs.writeFileSync('./src/data/questions.json', JSON.stringify(allQuestions, null, 2));
console.log('Done!');
