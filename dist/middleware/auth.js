"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const tslib_1 = require("tslib");
const apiError_1 = require("../utils/apiError");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
async function auth(req, res, next) {
    let token;
    if (!req.headers.authorization) {
        return next(new apiError_1.NoDataError('Header not found'));
    }
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    jsonwebtoken_1.default.verify(token, config_1.JWT_SECRETE_KEY, (err, decoded) => {
        if (err) {
            return next(new apiError_1.AuthFailureError('Invalid token'));
        }
        if (!decoded)
            return next(new apiError_1.AuthFailureError('Unauthorized'));
        if (!req.user)
            return next(new apiError_1.AuthFailureError('Unauthorized'));
        console.log(decoded);
        req.body._id = decoded._id;
    });
    return next();
}
exports.auth = auth;
