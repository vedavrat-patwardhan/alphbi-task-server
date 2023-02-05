"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favorite = exports.auth = void 0;
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
exports.auth = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string()
            .email({ tlds: { allow: false } })
            .required(),
        password: joi_1.default.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    }),
};
exports.favorite = {
    body: joi_1.default.object().keys({
        favorites: joi_1.default.array().items(joi_1.default.string()),
    }),
};
