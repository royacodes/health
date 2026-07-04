export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogContext {
  [key: string]: unknown;
}

export interface Logger {
  debug(message: string, context?: LogContext): void;
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, context?: LogContext): void;
}

function formatMessage(level: LogLevel, message: string, context?: LogContext): string {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}] [auth]`;
  if (context && Object.keys(context).length > 0) {
    return `${prefix} ${message} ${JSON.stringify(context)}`;
  }
  return `${prefix} ${message}`;
}

class ConsoleLogger implements Logger {
  private minLevel: LogLevel;
  private levels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  constructor(minLevel: LogLevel = "info") {
    this.minLevel = minLevel;
  }

  private shouldLog(level: LogLevel): boolean {
    return this.levels[level] >= this.levels[this.minLevel];
  }

  debug(message: string, context?: LogContext): void {
    if (this.shouldLog("debug")) console.debug(formatMessage("debug", message, context));
  }

  info(message: string, context?: LogContext): void {
    if (this.shouldLog("info")) console.info(formatMessage("info", message, context));
  }

  warn(message: string, context?: LogContext): void {
    if (this.shouldLog("warn")) console.warn(formatMessage("warn", message, context));
  }

  error(message: string, context?: LogContext): void {
    if (this.shouldLog("error")) console.error(formatMessage("error", message, context));
  }
}

const minLevel: LogLevel = "debug";

export function createLogger(name: string): Logger {
  const base = new ConsoleLogger(minLevel);
  return {
    debug: (message, context) => base.debug(`[${name}] ${message}`, context),
    info: (message, context) => base.info(`[${name}] ${message}`, context),
    warn: (message, context) => base.warn(`[${name}] ${message}`, context),
    error: (message, context) => base.error(`[${name}] ${message}`, context),
  };
}
