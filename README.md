A environment variable parser with type safety and validation out of the box.

## Installation

Using yarn:

```sh-session
$ yarn add @kldzj/env
```

Using npm:

```sh-session
$ npm i -S @kldzj/env
```

## Example usage

```typescript
import { parseEnv } from '@kldzj/env';

const env = parseEnv({
  PORT: {
    type: 'number',
    default: 3000,
  },
  NODE_ENV: {
    type: 'string',
    default: 'development',
  },
  DB_URL: {
    type: 'string',
    required: true,
  },
});

console.log(env.PORT); // type number -> 3000
console.log(env.NODE_ENV); // type string -> 'development'
// ...
```

## Features

- Type safety
- Custom parsers
- Optional (and default) values
- Passing a custom environment object

### Parser

The parser is a function that takes a string and returns a value of any type. It can be used to parse environment variables that are not strings.

If a parser is present, the type of the variable is ignored and instead the return type of the parser is used.

```typescript
import { parseEnv } from '@kldzj/env';

const env = parseEnv({
  DATE: {
    parser: (value) => new Date(value),
  },
});

console.log(env.DATE); // type Date -> Date object
```

### Options

#### `env`

An object that contains the environment variables. If not provided, `process.env` is used.

#### `throwOnNaN`

If `true`, an error is thrown if a variable type is number and is parsed as `NaN`. Defaults to `false`.

#### `defaultParser`

Allows you to override the default parser. The default parser is used when a variable does not have a custom parser.
