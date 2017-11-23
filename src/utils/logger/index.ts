import { Logger, transports, LoggerInstance } from 'winston';
import * as path from 'path';

import { LoggerMethods, Loggers, LogMessage } from './types';
import levels from './levels';

let loggers: Loggers = null;

/**
 * Resolve path for filename in <root>/logs
 * @param {string} filename the name of the log file
 */
function resolve(filename: string) {
  return path.resolve('..', '..', '..', 'logs', filename);
}

/**
 * Perform check to ensure that loggers are initialized before usage
 */
function check() {
  if (!loggers) {
    throw new Error('Logger was not initialized');
  }
}

/**
 * Generate a logger dynamically
 *
 * @param {string} name Name of logger to create
 */
function generateLogger(name: string) {
  return {
    [name]: new (Logger)({
      transports: [
        new (transports.File)({
          name: `${name}-file`,
          filename: resolve(`server-${name}.log`),
          level: name,
          json: true,
          maxsize: 5242880,
          maxFiles: 5,
          handleExceptions: handleExceptions(name),
          colorize: false,
        }),

        new (transports.Console)({
          handleExceptions: handleExceptions(name),
          colorize: true,
        }),
      ],
    }),
  };
}

function handleExceptions(name: string) {
  switch (name) {
    case 'error':
      return true;

    default:
      return false;
  }
}

/** Prepare objects for the logger */
function prepareMessage(...msg: LogMessage[]): string {
  return msg.map(m => JSON.stringify(m)).join('\n');
}

/**
 * Create a logger method that uses logger of 'name'
 *
 * @param {string} name Name of logger method to create
 */
function generateLoggerMethod(name: string) {
  let fn: (msg: string) => void = null;

  switch (name) {
    case 'info':
      fn = function (...msg: LogMessage[]) {
        loggers[name].info(prepareMessage(msg));
      };
      break;
    case 'error':
    case 'warn':
      fn = function (...msg: LogMessage[]) {
        // Unshift stack message to front of message array
        const stackMsg = [...msg].unshift(new Error().stack);
        loggers[name].log(name, prepareMessage(stackMsg));
      };

    default:
      fn = function (...msg: LogMessage[]) {
        loggers[name].log(name, prepareMessage(msg));
      };
      break;
  }

  return {
    [name]: fn,
  };
}

/**
 * Initialize the logging module
 */
export function initLogger(): void {
  if (loggers) {
    throw new Error('Already initialized logger');
  }
  loggers = Object.assign({}, ...levels.map(level => level.name).map(generateLogger));
}

const loggerMethods = Object.assign(
  {},
  ...levels.map(level => level.name).map(generateLoggerMethod),
) as LoggerMethods;

export default loggerMethods;
