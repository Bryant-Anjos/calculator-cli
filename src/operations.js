/**
 *
 * @param {Function} operation
 */
const validateArgs = (num1, num2) => {
  const firstIsNumber = /\d+/.test(num1)
  const secondIsNumber = /\d+/.test(num2)

  if (!firstIsNumber) throw SyntaxError(`Unexpected value '${num1}'`)
  if (!secondIsNumber) throw SyntaxError(`Unexpected value '${num2}'`)
}

/** @typedef {'+' | '-' | '*' | '/' | '^'} Operators */

/**
 * @type {Record<Operators, (num1: string, num2: string) => number>}
 */
const operations = Object.freeze({
  '+'(num1, num2) {
    validateArgs(num1, num2)
    return parseFloat(num1) + parseFloat(num2)
  },
  '-'(num1, num2) {
    validateArgs(num1, num2)
    return parseFloat(num1) - parseFloat(num2)
  },
  '*'(num1, num2) {
    validateArgs(num1, num2)
    return parseFloat(num1) * parseFloat(num2)
  },
  '/'(num1, num2) {
    validateArgs(num1, num2)
    if (parseFloat(num2) === 0) throw SyntaxError('Cannot divide a number by 0')
    return parseFloat(num1) / parseFloat(num2)
  },
  '^'(num1, num2) {
    validateArgs(num1, num2)
    return parseFloat(num1) ** parseFloat(num2)
  },
})

module.exports = operations
