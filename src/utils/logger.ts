import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

//it will keep files for 14 days then deleted
const transport = new DailyRotateFile({
  dirname: 'logs',
  filename: '%DATE%-app.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      ({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`
    )
  ),
  transports: [transport, new winston.transports.Console()],
});

export default logger;
