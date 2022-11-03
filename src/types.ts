export interface ParseEnvOptions {
  /**
   * Allows you to override the environment variables used by parseEnv.
   * @default process.env
   */
  env?: NodeJS.ProcessEnv;
  /**
   * If true, an error will be thrown if a parsed number environment variable is NaN.
   * @default false
   */
  throwOnNaN?: boolean;
  /**
   * Allows you to override the default parser.
   */
  defaultParser?: Parser;
}

export interface EnvTypeMap {
  string: string;
  number: number;
  boolean: boolean;
  array: string[];
}

export interface EnvVarType<T extends keyof EnvTypeMap> {
  type: T;
}

export type Parser = (value: string, item: EnvVar<any>) => any;

export interface EnvVarParser {
  parser: Parser;
  optional?: boolean;
}

export interface EnvVarOptional<T extends keyof EnvTypeMap> {
  optional: true;
  default?: EnvTypeMap[T];
}

export interface EnvVarRequired {
  optional?: false;
}

export type EnvVar<T extends keyof EnvTypeMap> = EnvVarParser | (EnvVarType<T> & (EnvVarOptional<T> | EnvVarRequired));

export type Env = {
  [key: string]: EnvVar<keyof EnvTypeMap>;
};

export type EnvType<T extends EnvVar<keyof EnvTypeMap>> = T extends EnvVarParser
  ? T['optional'] extends true
    ? ReturnType<T['parser']> | undefined
    : ReturnType<T['parser']>
  : T extends EnvVarType<keyof EnvTypeMap>
  ? T extends EnvVarOptional<any>
    ? T['default'] extends string | number | boolean | string[]
      ? EnvTypeMap[T['type']] | T['default']
      : EnvTypeMap[T['type']] | undefined
    : EnvTypeMap[T['type']]
  : never;

export type ParsedEnv<T extends Env> = {
  [K in keyof T]: EnvType<T[K]>;
};
