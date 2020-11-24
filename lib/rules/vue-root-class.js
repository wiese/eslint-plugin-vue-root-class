'use strict'

function getFirstElement (elements) {
  for (const child of elements) {
    if (child.type === 'VElement') {
      return child
    }
  }
  return null
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce a - configurable - class on vue component root nodes.',
      category: 'essential'
    },
    schema: [
      {
        type: 'object',
        properties: {
          class: {
            type: 'string'
          }
        }
      }
    ],
    messages: {
      classMissing: 'Components must bear the "{{requiredClass}}" class in their root node.',
      rootMissing: 'Components must have a root node which bears the "{{requiredClass}}" class.'
    }
  },

  create (context) {
    return {
      Program (program) {
        const requiredClass = context.options[0] && context.options[0].class

        if (!requiredClass) {
          throw new Error('vue-root-class rule must have "class" option configured!')
        }

        const classes = new Set()

        const element = program.templateBody
        if (!element) {
          return
        }
        const rootNode = getFirstElement(element.children)
        if (!rootNode) {
          // maybe we should entrust this to other (vue) linting rules
          context.report({
            node: element.startTag,
            loc: element.startTag.loc,
            messageId: 'rootMissing',
            data: {
              requiredClass
            }
          })
          return
        }

        rootNode.startTag.attributes.forEach((attribute) => {
          if (attribute.key.name === 'class') { // a vanilla class attribute
            if (attribute.value.type !== 'VLiteral') {
              throw new Error('Expecting "class" values to be literals')
            }
            attribute.value.value.split(' ') // TODO support more white spaces
              .forEach(classes.add, classes)
          } else if ( // bound class information
            attribute.key.type === 'VDirectiveKey' &&
            attribute.key.argument &&
            attribute.key.argument.type === 'VIdentifier' &&
            attribute.key.argument.name === 'class'
          ) {
            if (
              attribute.value.type === 'VExpressionContainer' &&
              attribute.value.expression.type === 'ArrayExpression' // ignores ObjectExpressions
            ) {
              attribute.value.expression.elements.forEach((node) => {
                if (node.type === 'Literal') {
                  classes.add(node.value)
                }
              })
            }
          }
        })

        if (!classes.has(requiredClass)) {
          context.report({
            node: rootNode.startTag,
            loc: rootNode.startTag.loc,
            messageId: 'classMissing',
            data: {
              requiredClass
            }
            // auto-fixing this is thinkable but messy
          })
        }
      }
    }
  }
}
