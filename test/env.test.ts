describe('parseEnv', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {};
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test('will receive process.env variables', () => {
    process.env.STRING = 'foo';
    process.env.NUMBER = '123';
    process.env.BOOLEAN = 'true';
    process.env.ARRAY = 'foo,bar,baz';
    process.env.DEFAULT_PRESENT = 'bar';

    const { parseEnv } = require('../src/index');
    const env = parseEnv({
      STRING: { type: 'string' },
      NUMBER: { type: 'number' },
      BOOLEAN: { type: 'boolean' },
      ARRAY: { type: 'array' },
      OPTIONAL: { type: 'string', optional: true },
      DEFAULT: { type: 'string', optional: true, default: 'foo' },
      DEFAULT_PRESENT: { type: 'string', optional: true, default: 'foo' },
    });

    expect(env.STRING).toBe('foo');
    expect(env.NUMBER).toBe(123);
    expect(env.BOOLEAN).toBe(true);
    expect(env.ARRAY).toEqual(['foo', 'bar', 'baz']);
    expect(env.OPTIONAL).toBeUndefined();
    expect(env.DEFAULT).toBe('foo');
    expect(env.DEFAULT_PRESENT).toBe('bar');
  });

  test('will receive custom env variables', () => {
    const { parseEnv } = require('../src/index');
    const env = parseEnv(
      {
        STRING: { type: 'string' },
        NUMBER: { type: 'number' },
        BOOLEAN: { type: 'boolean' },
        ARRAY: { type: 'array' },
        OPTIONAL: { type: 'string', optional: true },
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

    expect(env.STRING).toBe('foo');
    expect(env.NUMBER).toBe(123);
    expect(env.BOOLEAN).toBe(true);
    expect(env.ARRAY).toEqual(['foo', 'bar', 'baz']);
    expect(env.OPTIONAL).toBeUndefined();
  });

  test('will throw with throwOnNaN', () => {
    process.env.NUMBER = 'foo';

    const { parseEnv } = require('../src/index');
    expect(() => {
      parseEnv(
        {
          NUMBER: { type: 'number' },
        },
        {
          throwOnNaN: true,
        }
      );
    }).toThrowError('Envirnoment variable NUMBER is not a number');
  });

  test('will use custom parser', () => {
    const { parseEnv } = require('../src/index');
    const env = parseEnv(
      {
        STRING: {
          parser: (value: string) => value.toUpperCase(),
        },
      },
      {
        env: {
          STRING: 'foo',
        },
      }
    );

    expect(env.STRING).toBe('FOO');
  });

  test('will use custom defaultParser', () => {
    const { parseEnv } = require('../src/index');
    const env = parseEnv(
      {
        STRING: {},
      },
      {
        defaultParser: (value: string) => value.toUpperCase(),
        env: {
          STRING: 'foo',
        },
      }
    );

    expect(env.STRING).toBe('FOO');
  });

  test('will throw if required env variable is missing', () => {
    const { parseEnv } = require('../src/index');
    expect(() =>
      parseEnv({
        STRING: { type: 'string' },
      })
    ).toThrowError('Required environment variable STRING is missing');
  });
});
