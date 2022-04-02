
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const types = require('@babel/types');

module.exports = function killConsole(source) {
    const ast = parser.parse(source, { sourceType: 'module' });
    const res = source.replace(/console.log\(.*\);?/g, '');
    console.log(res);
    return res;
};