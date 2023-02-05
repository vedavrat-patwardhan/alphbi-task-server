"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const server_1 = tslib_1.__importDefault(require("./server"));
const config_1 = require("./config");
const logger_1 = tslib_1.__importDefault(require("./utils/logger"));
server_1.default.listen(config_1.port, () => {
    logger_1.default.info(`server running on port : ${config_1.port}`);
    console.log(`server running on port : ${config_1.port}`);
}).on('error', (e) => {
    logger_1.default.error(e);
});
