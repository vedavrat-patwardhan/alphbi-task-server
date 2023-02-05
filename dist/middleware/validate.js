"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const pick_1 = tslib_1.__importDefault(require("../utils/pick"));
const apiError_1 = require("../utils/apiError");
const validate = (schema) => (req, res, next) => {
    if (Object.keys(req.body).length !== 0 && !req.is('application/json')) {
        return next(new apiError_1.BadRequestError('Supports JSON request body only'));
    }
    const validSchema = (0, pick_1.default)(schema, ['params', 'query', 'body']);
    const object = (0, pick_1.default)(req, Object.keys(validSchema));
    const { value, error } = joi_1.default.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object);
    if (error) {
        const errorMessage = error.details
            .map((details) => details === null || details === void 0 ? void 0 : details.message)
            .join(', ');
        return next(new apiError_1.BadRequestError(errorMessage));
    }
    Object.assign(req, value);
    return next();
};
exports.default = validate;
