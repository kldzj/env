import { assert } from 'tsafe/assert';
import { Equals } from 'tsafe';
import { parseEnv } from '../src';

describe('types', () => {
  test('will assert return type', () => {
    const env = parseEnv(
      {
        STRING: { type: 'string' },
        NUMBER: { type: 'number' },
        BOOLEAN: { type: 'boolean' },
        ARRAY: { type: 'array' },
        OPTIONAL: { type: 'string', optional: true },
        DEFAULT: { type: 'string', optional: true, default: 'foo' },
      },
      {
        env: {
          STRING: 'foo',
          NUMBER: '123',
          BOOLEAN: 'true',
          ARRAY: 'foo,bar,baz',
        },
      }
    );

    assert<Equals<typeof env['STRING'], string>>(true);
    assert<Equals<typeof env['NUMBER'], number>>(true);
    assert<Equals<typeof env['BOOLEAN'], boolean>>(true);
    assert<Equals<typeof env['ARRAY'], string[]>>(true);
    assert<Equals<typeof env['OPTIONAL'], string | undefined>>(true);
    assert<Equals<typeof env['DEFAULT'], string>>(true);
  });
});
