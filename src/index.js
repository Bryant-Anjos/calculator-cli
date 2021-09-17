const Calculator = require('./calculator')

const [,, ...expressions] = process.argv
const expression = expressions.join('')
const calculator = new Calculator(expression)
const [error, result] = calculator.calculate()

if (error) {
  process.stderr.write(error.message + '\n')
} else {
  process.stdout.write(result.toString() + '\n')
}
