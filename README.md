# Calculator CLI

A chalenge to do calculations with javascript.

Write a mathematic expression in a cli to receive the result.

---

## Installation and usage

Requires [nodejs](https://nodejs.org/en/) (recommended version `14.17.6`)

You can use [nvm](https://github.com/nvm-sh/nvm) and run `nvm use` to automatic install the right node version.
```
nvm use
```

Install the dependencies with `npm install`
```
npm install
```

To run the tests run `npm test`
```
npm test
```

---

## Usage

At root of project in a terminal run:

```
node ./src/index.js <expression>
```

Where te `<expression>` is a math expression you wanto to calculate.  
Obs: When using multiplications call the expression inside quotes `""` because the `*` is used to list the directories and it will not be identified as the multiplier operator.

### Expressions examples
```
node ./src/index.js 5 + 3 - 6
```
```
node ./src/index.js 2 ^ 5 / 16
```
```
node ./src/index.js "3 * 9 - 7"
```

## Operators

|Symbol|Operation|
|------|---------|
|`+`   |Add      |
|`-`   |Subtract |
|`*`   |Multiply |
|`/`   |Divide   |
|`^`   |Power    |

## Obs

The followings funcionalities are not implemented yet:

- calculations with negative numbers
- calculations with float numbers
