"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const winston_1 = require("winston");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const winston_daily_rotate_file_1 = tslib_1.__importDefault(require("winston-daily-rotate-file"));
const config_1 = require("../config");
let dir = config_1.logDirectory;
if (!dir)
    dir = path_1.default.resolve('logs');
if (!fs_1.default.existsSync(dir)) {
    fs_1.default.mkdirSync(dir);
}
const logLevel = config_1.environment === 'development' ? 'debug' : 'warn';
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
exports.default = (0, winston_1.createLogger)({
    transports: [],
    exceptionHandlers: [new winston_daily_rotate_file_1.default(options.file)],
    exitOnError: false,
});
