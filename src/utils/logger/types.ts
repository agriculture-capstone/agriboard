import { LoggerInstance } from 'winston';

/**
 * The methods used in The Core to log at various priority levels
 */
export interface LoggerMethods {
  /** Log using 'silly' level */
  silly(msg: LogMessage): void;
  /** Log using 'debug' level */
  debug(msg: LogMessage): void;
  /** Log using 'verbose' level */
  verbose(msg: LogMessage): void;
  /** Log using 'info' level */
  info(msg: LogMessage): void;
  /** Log using 'warn' level */
  warn(msg: LogMessage): void;
  /** Log using 'error' level */
  error(msg: LogMessage): void;
}

/** Definition for logger object */
export interface Loggers {
  [key: string]: LoggerInstance;
}

/** Input type for log messages */
export type LogMessage = any;
