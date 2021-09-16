const Calculator = require('./calculator')

const [,, ...expressions] = process.argv
const expression = expressions.join('')
const calculator = new Calculator(expression)
const result = calculator.calculate()

process.stdout.write(result.toString() + '\n')
