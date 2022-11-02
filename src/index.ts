import { getParser } from './parser';
import type { Env, ParsedEnv, ParseEnvOptions } from './types';

function parseEnv<E extends Env>(info: E, opts?: ParseEnvOptions): ParsedEnv<E> {
  const result: any = {};
  const env = opts?.env ?? process.env;
  for (const key in info) {
    const item = info[key];
    const value = env[key];
    if (value === undefined) {
      const hasDefault = 'default' in item;
      if (!item.optional && !hasDefault) {
        throw new Error(`Required environment variable ${key} is missing`);
      }

      if (hasDefault) {
        result[key] = item.default;
      }
    } else {
      const parser = getParser(item, opts);
      result[key] = parser(value, item);

      if (opts?.throwOnNaN && Number.isNaN(result[key])) {
        throw new Error(`Envirnoment variable ${key} is not a number`);
      }
    }
  }

  return result;
}

export { parseEnv };
export default parseEnv;
export type { Env, ParsedEnv, ParseEnvOptions };
