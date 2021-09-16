/** @typedef {'+' | '-' | '*' | '/' | '^'} Operators */

/**
 * @type {Record<Operators, (num1: number, num2: number) => number>}
 */
const operations = Object.freeze({
  '+'(num1, num2) {
    return num1 + num2
  },
  '-'(num1, num2) {
    return num1 - num2
  },
  '*'(num1, num2) {
    return num1 * num2
  },
  '/'(num1, num2) {
    if (num2 === 0) return NaN
    return num1 / num2
  },
  '^'(num1, num2) {
    return num1 ** num2
  },
})

module.exports = operations
