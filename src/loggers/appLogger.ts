import winston, { format } from 'winston';
const { combine, timestamp, json, printf } = format;
import { magenta } from 'colorette';

const cliFormat =  printf(({ level, message, timestamp }) => {
  return `${magenta(`[time: ${timestamp}]`)} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({ filename: './logs/combined.log' }),
    new winston.transports.File({ filename: './logs/errors.log', level: 'error' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({ format: combine(timestamp(), cliFormat) }));
}

export default logger;
