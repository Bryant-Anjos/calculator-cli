const operations = require('./operations')

class Calculator {
  /** @type {string} */
  #expression

  parenthesisRegex = /\(([^\)\(]*)\)/g

  /**
   * @param {string} expression
   */
  constructor (expression) {
    this.#expression = expression
  }

  /**
   * @returns {[Error | undefined, number | undefined]}
   */
  calculate() {
    try {
      const result = this.#calculate()
      return [undefined, result]
    } catch (err) {
      return [err]
    }
  }

  #calculate() {
    this.#validateExpression()

    let result
    let expression = this.#expression
    while (result === undefined) {
      const calcs = expression.match(this.parenthesisRegex)
      if (calcs && calcs.length) {
        calcs.forEach(calc => {
          const calcWithoutBrackets = calc.replace('(', '').replace(')', '')
          const stack = this.#splitExpression(calcWithoutBrackets)
          const value = this.#calculateExpression(stack)
          expression = expression.replace(calc, value.toString())
        })
      } else {
        const stack = this.#splitExpression(expression)
        const value = this.#calculateExpression(stack)
        result = value
      }
    }
    return result
  }

  /**
   * @param {string[]} stack
   * @returns {number}
   */
  #calculateExpression(stack) {
    const operatorsPriority = ['^', '/', '*', '+', '-']
    while (operatorsPriority.length) {

      /** @type {'+' | '-' | '*' | '/' | '^'} */
      const operator = operatorsPriority[0]
      const operatorIndex = stack.indexOf(operator)
      if (operatorIndex > -1) {
        const operation = operations[operator]
        if (operation) {
          const previous = stack[operatorIndex - 1]
          const next = stack[operatorIndex + 1]
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
  #splitExpression(expression) {
    const array = expression
      .replace(/\s/g, '')
      .match(/(\d+)|(.)/g)
      .filter(text => text !== '')
    return array
  }

  #validateExpression() {
    const openParenthesis = (this.#expression.match(/\(/g) || []).length
    const closeParenthesis = (this.#expression.match(/\)/g) || []).length
    const parenthesisDiff = openParenthesis - closeParenthesis
    if (parenthesisDiff !== 0) {
      if (parenthesisDiff > 0) throw SyntaxError('Missing a \')\'')
      if (parenthesisDiff < 0) throw SyntaxError('Missing a \'(\'')
    }
  }
}

module.exports = Calculator
