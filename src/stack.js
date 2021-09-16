const operations = require('./operations')

const isNumber = (character) => /\d+/.test(character)
const validOperators = ['+', '-', '*', '/', '^', '(', ')']

/**
 * @param {string} expression
 * @returns {number}
 */
class ExpressionStack {
  /** @type {string[]} */
  stack = []

  /** @type {string} */
  expression

  /**
   * @param {string} expression
   */
  constructor (expression) {
    this.expression = expression
  }

  calculate() {
    this.stack = this.splitExpression()
    return this.calc(this.stack)
  }

  calc(stack) {
    const operatorsPriority = ['(', '^', '/', '*', '+', '-']
    while (operatorsPriority.length) {

      const operator = operatorsPriority[0]
      const operatorIndex = stack.indexOf(operator)
      if (operatorIndex > -1) {
        if (operator === '(') {
          const subStack = stack.slice(operatorIndex + 1)
          const subParenthesisIndex = subStack.indexOf(operator)
          const closeParenthesisIndex = subStack.indexOf(')')

          let result = 0
          if (subParenthesisIndex > -1 && subParenthesisIndex < closeParenthesisIndex) {
            const subSubStack = subStack.slice(subParenthesisIndex + 1)
            console.log('subSubStack', subSubStack)
            const subCloseParenthesisIndex = subSubStack.indexOf(')')
            result = this.calc(subSubStack)
            console.log('result', result)
            stack.splice(operatorIndex + subParenthesisIndex + 1, subCloseParenthesisIndex + subParenthesisIndex + 1, result)
            console.log('stack', stack)
          }

          result += this.calc(subStack.slice(0, closeParenthesisIndex + 1))
          stack.splice(operatorIndex, closeParenthesisIndex + 2, result)
          console.log('stack', stack)
        }

        const operation = operations[operator]
        if (operation) {
          const previous = parseFloat(stack[operatorIndex - 1])
          const next = parseFloat(stack[operatorIndex + 1])
          const result = operation(previous, next)
          stack.splice(operatorIndex - 1, 3, result)
        }
      } else {
        operatorsPriority.shift()
      }
    }
    return stack[0]
  }

  calculate1() {
    this.stack = this.splitExpression()

    while (this.stack.length !== 1) {
      for (const [i, character] of this.stack.entries()) {
        if (validOperators.includes(character)) {
          const operation = operations[character]

          if (operation) {
            const previous = parseFloat(this.stack[i - 1])
            const next = parseFloat(this.stack[i + 1])
            const result = operation(previous, next)
            this.stack.splice(i - 1, 3, result)
            break
          }
        }
      }
    }

    return this.stack[0]
  }

  calculate2() {
    return parseInt(eval(this.expression.replace('^', '**')))
  }

  splitExpression() {
    const array = this.expression
      .replace(/\s/g, '')
      .match(/(\d+)|(.)/g)
      .filter(text => text !== '')
    return array
  }

  /**
   * @param {string} character
   */
  addToStack(character) {
    if (isNumber(character)) {
      this.stack.push(parseInt(character))
      return 'number'
    }
    if (validOperators.includes(character)) {
      this.stack.push(character)
      return 'operator'
    }
    throw new Error(`Invalid operator '${character}'`)
  }
}

module.exports = ExpressionStack
