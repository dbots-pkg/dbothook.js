const fs = require('fs');
const { join: path } = require('path');

// TypeScript-only types need to be replaced with JSDoc types
const replaceMap = {
  // Replace TS Record<> type with regular Object.<>
  'Record': 'Object',
  'NodeJS.Timeout': 'Interval',
  'http.Server': 'Server'
};

const docsPath = path(__dirname, '../docs/docs.json');
const originalDocs = fs.readFileSync(docsPath, { encoding: 'utf8' });

var docs = originalDocs;

for (const key in replaceMap) {
  const regex = new RegExp(key, 'g');
  docs = docs.replace(regex, replaceMap[key]);
}

fs.writeFileSync(docsPath, docs);
