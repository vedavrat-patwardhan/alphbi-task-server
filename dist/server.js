"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const routes_1 = tslib_1.__importDefault(require("./routes/v1/routes"));
const config_1 = require("./config");
const apiError_1 = require("./utils/apiError");
const logger_1 = tslib_1.__importDefault(require("./utils/logger"));
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(config_1.db.connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.all('/*', (_req, res, next) => {
    res.header('Access-Control-Allow-Origin', config_1.corsUrl);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(`/${config_1.db.version}`, routes_1.default);
app.use((_req, _res, next) => next(new apiError_1.NotFoundError()));
app.use((err, _req, res, _next) => {
    if (err instanceof apiError_1.ApiError) {
        apiError_1.ApiError.handle(err, res);
    }
    else {
        if (config_1.environment === 'development') {
            logger_1.default.error(err);
        }
        apiError_1.ApiError.handle(new apiError_1.InternalError(), res);
    }
});
exports.default = app;
