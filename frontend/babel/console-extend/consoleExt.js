/**
 * 希望通过 babel 能够自动在 console.log 等 api 中插入文件名和行列号的参数，方便定位到代码
 */

const parser = require('@babel/parser');
const { isMemberExpression, stringLiteral } = require('@babel/types');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const sourceCode = `
    console.log(1);

    function func() {
        console.info(2);
    }

    export default class Clazz {
        say() {
            console.debug(3);
        }

        render() {
            return <div>{console.error(4)}</div>
        }
    }
`;

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous', // 代码是否包含 import/export，unambiguous 表示自动设置
    plugins: ['jsx']
});

const targetCalleeName = ['log', 'info', 'debug', 'error'].map(e => `console.${e}`);
traverse(ast, {
    CallExpression(path, state) {
        // if (
        //     isMemberExpression(path.node.callee)
        //     && path.node.callee.object.name === 'console'
        //     && ['log', 'info', 'debug', 'error'].includes(path.node.callee.property.name)
        // ) {
        // 使用 generator 模块精简代码
        const currentCalleeName = generate(path.node.callee).code;
        if (targetCalleeName.includes(currentCalleeName)) {
            const { line, column } = path.node.loc.start;
            path.node.arguments.unshift(stringLiteral(`filename: (${line}, ${column})`));
        }
    }
});

const { code, map } = generate(ast);
console.log(code);