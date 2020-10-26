const stdin = process.stdin;
const readline = require('readline');

const MainCode = require('./src/main');
const WELCOME_TEXT = require('./src/constants').TEXT.WELCOME_TEXT;

readline.emitKeypressEvents(stdin);
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

process.stdout.write(WELCOME_TEXT[0]);
