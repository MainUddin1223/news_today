import path from 'path'
import { createLogger, format } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  return `${date.toDateString()} ${hour}:${min}:${sec}  [${label}] ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'info' }), timestamp(), myFormat),
  transports: [
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'success-log',
        '%DATE%-UC-success-logs.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '15d',
    }),
  ],
})
const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'error' }), timestamp(), myFormat),
  transports: [
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'success-log',
        '%DATE%-UC-success-logs.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '15d',
    }),
  ],
})

export { logger, errorLogger }
