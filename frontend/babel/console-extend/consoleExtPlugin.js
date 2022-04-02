
const generate = require('@babel/generator').default;

const targetCalleeName = ['log', 'info', 'debug', 'error'].map(e => `console.${e}`);

module.exports = function ({ types, template }) {
    return {
        visitor: {
            CallExpression(path, state) {
                console.log('ddddddd');
                // 如果是新替换的节点就不处理
                if (path.node.isNew) {
                    return;
                }
                const currentCalleeName = generate(path.node.callee).code;
                if (targetCalleeName.includes(currentCalleeName)) {
                    const { line, column } = path.node.loc.start;
                    const filename = state.filename || 'unknown filename';
                    const newNode = template.expression(`console.log("${filename}: (${line}, ${column})")`)();
                    newNode.isNew = true;

                    if (path.findParent(path => path.isJSXElement())) {
                        path.replaceWith(types.arrayExpression([newNode, path.node]));
                        path.skip();
                    } else {
                        path.insertBefore(newNode);
                    }
                }
            }
        }
    }
}