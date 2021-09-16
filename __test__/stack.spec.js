const ExpressionStack = require('../src/stack')

describe('ExpressionStack', () => {
  it.each([
    ['1 + 0 + 25 - 3', 23],
    ['1+1*5-1', 5],
    ['1 + 4 / 2 ^2 - 1', 1],
    ['1 + 3 * 6 / 2 + 0', 10],
    ['0 / 1 + 1 / 0', NaN],
    ['1 * (5 + 10) / 3', 5],
    ['((5-1) * 2)^2', 64],
    ['(2 - 1) * 2^3', 8],
    ['4 / (54 - (9 * 6))', NaN],
    // ['54 * * 54 - 1', SyntaxError],
    // ['((79 - 12) * (5 + (2 - 1))', SyntaxError],
    ['266 + 54 * 4 - ( 41 + 2 ) * 10 / 5 - 7 ^ 3 - 1 + 1 * 0 - (( 45 / 5 * 3 - 1) * 2)', 0],
  ])(
    `should calculate '%s' to return '%f'`,
    (expression, expected) => {
      const result = new ExpressionStack(expression).calculate()
      expect(result).toBe(expected)
  })
})
