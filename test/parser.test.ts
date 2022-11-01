import { parseEnvValue } from '../src/parser';

describe('parseEnvValue', () => {
  test('will parse string', () => {
    const value = parseEnvValue('foo', { type: 'string' });
    expect(value).toBe('foo');
  });

  test('will parse number', () => {
    const value = parseEnvValue('123', { type: 'number' });
    expect(value).toBe(123);
  });

  test('will parse boolean', () => {
    const value = parseEnvValue('true', { type: 'boolean' });
    expect(value).toBe(true);
  });

  test('will parse boolean bit', () => {
    const value = parseEnvValue('1', { type: 'boolean' });
    expect(value).toBe(true);
  });

  test('will parse array', () => {
    const value = parseEnvValue('foo,bar,baz', { type: 'array' });
    expect(value).toEqual(['foo', 'bar', 'baz']);
  });

  test('will throw on unknown type', () => {
    expect(() => parseEnvValue('foo', { type: 'unknown' })).toThrowError('Unknown EnvVar type unknown');
  });

  test('will throw on missing type', () => {
    expect(() => parseEnvValue('foo', {} as any)).toThrowError('EnvVar must have a type');
  });
});
