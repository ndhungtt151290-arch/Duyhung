import fs from 'fs';

const questions = JSON.parse(fs.readFileSync('./src/data/questions.json', 'utf8'));

const untranslated = questions.filter(q => !q.contentVi).slice(0, 50);

fs.writeFileSync('./scripts/untranslated_batch.json', JSON.stringify(untranslated, null, 2));
console.log('Exported 50 untranslated questions to scripts/untranslated_batch.json');
