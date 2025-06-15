
export interface LogContext {
  functionName: string;
  requestId?: string;
  userId?: string;
  [key: string]: any;
}

export function logInfo(message: string, context?: LogContext): void {
  const timestamp = new Date().toISOString();
  const logEntry = {
    level: 'INFO',
    timestamp,
    message,
    ...context
  };
  console.log(JSON.stringify(logEntry));
}

export function logError(error: Error | string, context?: LogContext): void {
  const timestamp = new Date().toISOString();
  const logEntry = {
    level: 'ERROR',
    timestamp,
    message: error instanceof Error ? error.message : error,
    stack: error instanceof Error ? error.stack : undefined,
    ...context
  };
  console.error(JSON.stringify(logEntry));
}

export function logWarning(message: string, context?: LogContext): void {
  const timestamp = new Date().toISOString();
  const logEntry = {
    level: 'WARNING',
    timestamp,
    message,
    ...context
  };
  console.warn(JSON.stringify(logEntry));
}
