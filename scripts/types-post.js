const fs = require('fs');
const { join: path } = require('path');

const replaceMap = {
  'declare': 'export',
  'eventHandler = \\(result: any \\| object\\[\\]\\) => void':
    'eventHandler = (result: object | object[]) => void'
};
const imports = `
import { Express, Request } from 'express'
import * as http from 'http'
`.trim() + '\n\n';

const typesPath = path(__dirname, '../typings/index.d.ts');
const originalTypes = fs.readFileSync(typesPath, { encoding: 'utf8' });

var docs = imports + originalTypes;

for (const key in replaceMap) {
  const regex = new RegExp(key, 'g');
  docs = docs.replace(regex, replaceMap[key]);
}

// docs = `declare module 'dbots' {
// ${docs.trim()}
// }`;

fs.writeFileSync(typesPath, docs);
