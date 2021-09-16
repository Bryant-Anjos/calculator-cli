const operations = require('./operations')

/**
 * @param {string} expression
 * @returns {number}
 */
class Calculator {
  /** @type {string} */
  expression

  parenthesisRegex = /\(([^\)\(]*)\)/g

  /**
   * @param {string} expression
   */
  constructor (expression) {
    this.expression = expression
  }

  calculate() {
    let result
    let expression = this.expression
    while (result === undefined) {
      const calcs = expression.match(this.parenthesisRegex)
      if (calcs && calcs.length) {
        calcs.forEach(calc => {
          const calcWithoutBrackets = calc.replace('(', '').replace(')', '')
          const stack = this.splitExpression(calcWithoutBrackets)
          const value = this.calc(stack)
          expression = expression.replace(calc, value.toString())
        })
      } else {
        const stack = this.splitExpression(expression)
        const value = this.calc(stack)
        result = value
      }
    }
    return result
  }

  /**
   * @param {string[]} stack
   * @returns {number}
   */
  calc(stack) {
    const operatorsPriority = ['^', '/', '*', '+', '-']
    while (operatorsPriority.length) {

      const operator = operatorsPriority[0]
      const operatorIndex = stack.indexOf(operator)
      if (operatorIndex > -1) {
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

  /**
   * @param {string} expression
   * @returns {string[]}
   */
  splitExpression(expression) {
    const array = expression
      .replace(/\s/g, '')
      .match(/(\d+)|(.)/g)
      .filter(text => text !== '')
    return array
  }
}

module.exports = Calculator
