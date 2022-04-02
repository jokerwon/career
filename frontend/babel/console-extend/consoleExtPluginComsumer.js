const { transformFileSync } = require('@babel/core');
const consoleExtPlugin = require('./consoleExtPlugin');
const path = require('path');

const { code } = transformFileSync(path.join(__dirname, './sourceCode.js'), {
    plugins: [consoleExtPlugin],
    parserOpts: {
        sourceType: 'unambiguous',
        plugins: ['jsx']
    }
});

console.log(code);