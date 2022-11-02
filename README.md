A simple environment variable parser with type safety and validation out of the box.

## Installation

Using yarn:

```sh-session
$ yarn add @kldzj/env
```

Using npm:

```sh-session
$ npm i -S @kldzj/env
```

## Features

- Type safety
- Custom parsers
- Optional (and default) values
- Passing a custom environment object

## Example usage

```typescript
import { parseEnv } from '@kldzj/env';

const env = parseEnv({
  PORT: {
    type: 'number',
    optional: true,
    default: 3000,
  },
  NODE_ENV: {
    type: 'string',
    optional: true,
  },
  DB_URL: {
    type: 'string',
  },
});

console.log(env.PORT); // typed as number
console.log(env.NODE_ENV); // typed as string | undefined
console.log(env.DB_URL); // typed as string, an error is thrown in case it's missing
```

## Parser

The parser is a function that takes a string and returns a value of any type. It can be used to parse environment variables that are not strings.

If a parser is present, the type of the variable is ignored and instead the return type of the parser is used.

```typescript
import { parseEnv } from '@kldzj/env';

const env = parseEnv({
  DATE: {
    parser: (value) => new Date(value),
  },
});

console.log(env.DATE); // typed as Date
```

## Options

```typescript
const env = parseEnv(
  {
    PORT: {
      type: 'number',
    },
  },
  {
    env: {
      ...process.env,
      ...someOtherEnv,
    },
    throwOnNaN: true,
    defaultParser: (value, item) => {
      // The default parser must honor the type of the variable (item.type) if it is present
      // ...
      return newValue;
    },
  }
);
```

### `env`

An object that contains the environment variables. If not provided, `process.env` is used.

### `throwOnNaN`

If `true`, an error is thrown if a variable type is number and is parsed as `NaN`. Defaults to `false`.

### `defaultParser`

Allows you to override the default parser. The default parser is used when a variable does not have a custom parser.
