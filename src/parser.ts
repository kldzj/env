import type { EnvVar, ParseEnvOptions } from './types';

export function parseEnvValue(value: string, item: EnvVar<any>) {
  if (!('type' in item)) {
    throw new Error('EnvVar must have a type');
  }

  switch (item.type) {
    case 'string':
      return value;
    case 'number':
      return Number(value);
    case 'boolean':
      return value === 'true' || value === '1';
    case 'array':
      return value.split(',');
    default:
      throw new Error(`Unknown EnvVar type ${item.type}`);
  }
}

export function getParser(item: EnvVar<any>, opts?: ParseEnvOptions) {
  if ('parser' in item) {
    return item.parser;
  }

  return opts?.defaultParser ?? parseEnvValue;
}
