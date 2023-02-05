"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const apiError_1 = require("../utils/apiError");
const catchAsync_1 = tslib_1.__importDefault(require("../utils/catchAsync"));
const config_1 = require("../config");
const jwtAuth = async (req, _res, next) => {
    let token;
    if (!req.headers.authorization) {
        throw next(new apiError_1.NoDataError('Header not found'));
    }
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        throw next(new apiError_1.TokenExpiredError(`You are not logged in! Please log in to get access.`));
    }
    jwt.verify(token, config_1.JWT_SECRETE_KEY, (err, decoded) => {
        if (err) {
            throw next(new apiError_1.AuthFailureError('Unauthorized'));
        }
        req.body.user = decoded;
        next();
    });
};
exports.default = (0, catchAsync_1.default)(jwtAuth);
