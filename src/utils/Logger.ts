import { createLogger, transports, format } from 'winston';
import fs from 'fs';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import { environment, logDirectory } from '../config';

let dir = logDirectory;
if (!dir) dir = path.resolve('logs');

// create directory if it is not present
if (!fs.existsSync(dir)) {
    // Create the directory if it does not exist
    fs.mkdirSync(dir);
}

const logLevel = environment === 'development' ? 'debug' : 'warn';

const options = {
    file: {
        level: logLevel,
        filename: dir + '/%DATE%.json',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        timestamp: true,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        prettyPrint: true,
        json: true,
        maxSize: '20m',
        colorize: true,
        maxFiles: '14d',
    },
};

export default createLogger({
    transports: [
        //TODO: Activate in prod
        // new transports.Console({
        //     level: logLevel,
        //     format: format.combine(
        //         format.errors({ stack: true }),
        //         format.prettyPrint()
        //     ),
        // }),
        // new transports.Http({
        //     level: 'warn',
        //     format: format.json(),
        // }),
    ],
    exceptionHandlers: [new DailyRotateFile(options.file)],
    exitOnError: false, // do not exit on handled exceptions
});
