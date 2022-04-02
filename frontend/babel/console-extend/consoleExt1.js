/**
 * 觉得在同一行打印会影响原本的参数的展示，所以想改为在 console.xx 节点之前打印的方式
 */
const parser = require('@babel/parser');
const { arrayExpression } = require('@babel/types');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const template = require('@babel/template').default;

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
        // 如果是新替换的节点就不处理
        if (path.node.isNew) {
            return;
        }
        const currentCalleeName = generate(path.node.callee).code;
        if (targetCalleeName.includes(currentCalleeName)) {
            const { line, column } = path.node.loc.start;
            const newNode = template.expression(`console.log("filename: (${line}, ${column})")`)();
            newNode.isNew = true;

            if (path.findParent(path => path.isJSXElement())) {
                path.replaceWith(arrayExpression([newNode, path.node]));
                path.skip();
            } else {
                path.insertBefore(newNode);
            }
        }
    }
});

const { code, map } = generate(ast);
console.log(code);