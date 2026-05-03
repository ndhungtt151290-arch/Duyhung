import fs from 'fs';

const questions = JSON.parse(fs.readFileSync('./src/data/questions.json', 'utf8'));

// Dịch 50 câu từ câu 2400 trở đi (index 2399)
// Câu 2400 là question[2399]
const startIndex = 2399;
const endIndex = Math.min(startIndex + 50, questions.length);

for (let i = startIndex; i < endIndex; i++) {
  if (!questions[i].contentVi) {
    // Logic: In a real scenario, call Gemini API here.
    // For now, I will manually provide translations in the next step.
    console.log(`Cần dịch câu: ${questions[i].content}`);
  }
}
fs.writeFileSync('./src/data/questions.json', JSON.stringify(questions, null, 2));
console.log('Done!');
