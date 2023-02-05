"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRETE_KEY = exports.logDirectory = exports.corsUrl = exports.db = exports.port = exports.environment = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
if (!process.env.NODE_ENV) {
    dotenv_1.default.config();
}
exports.environment = process.env.NODE_ENV;
exports.port = process.env.PORT;
exports.db = {
    connectionUrl: process.env.DB_URI || process.env.dbUri,
    version: process.env.API_VERSION,
};
exports.corsUrl = process.env.CORS_URL;
exports.logDirectory = process.env.LOG_DIR;
exports.JWT_SECRETE_KEY = process.env.JWT_SECRET || '<this is random jwt secrete key>';
