const Calculator = require('../src/calculator')

describe('Calculator', () => {
  it.each([
    ['1 + 0 + 25 - 3', 23],
    ['1+1*5-1', 5],
    ['1 + 4 / 2 ^2 - 1', 1],
    ['1 + 3 * 6 / 2 + 0', 10],
    ['0 / 1 + 1 / 0', 'Cannot divide a number by 0'],
    ['1 * (5 + 10) / 3', 5],
    ['((5-1) * 2)^2', 64],
    ['(2 - 1) * 2^3', 8],
    ['4 / (54 - (9 * 6))', 'Cannot divide a number by 0'],
    ['54 * * 54 - 1', 'Unexpected value \'*\''],
    ['((79 - 12) * (5 + (2 - 1))', 'Missing a \')\''],
    ['266 + 54 * 4 - ( 41 + 2 ) * 10 / 5 - 7 ^ 3 - 1 + 1 * 0 - (( 45 / 5 * 3 - 1) * 2)', 0],
  ])(
    `should calculate '%s' to return '%s'`,
    (expression, expected) => {
      const [error, result] = new Calculator(expression).calculate()
      if (error) {
        expect(error.message).toBe(expected)
      } else {
        expect(result).toBe(expected)
      }
  })
})
