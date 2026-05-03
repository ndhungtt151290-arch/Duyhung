import fs from 'fs';

const questions = JSON.parse(fs.readFileSync('./src/data/questions.json', 'utf8'));

const untranslatedIndices = questions
  .map((q, index) => ({ q, index }))
  .filter(item => !item.q.contentVi || item.q.contentVi === "")
  .map(item => item.index);

if (untranslatedIndices.length > 0) {
  console.log(`Còn ${untranslatedIndices.length} câu chưa dịch.`);
  console.log(`Câu chưa dịch đầu tiên là câu số: ${untranslatedIndices[0] + 1}`);
  console.log(`Các câu từ ${untranslatedIndices[0] + 1} đến ${Math.min(untranslatedIndices[0] + 50, questions.length)} cần được dịch.`);
} else {
  console.log("Đã dịch hết tất cả các câu!");
}
