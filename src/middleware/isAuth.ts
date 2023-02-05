import * as jwt from 'jsonwebtoken';
import { catchAsync } from '../types/miscellaneousInterface';
import {
    AuthFailureError,
    NoDataError,
    TokenExpiredError,
} from '../utils/apiError';
import catchError from '../utils/catchAsync';
import { JWT_SECRETE_KEY } from '../config';
import { CallbackError } from 'mongoose';

const jwtAuth: catchAsync = async (req, _res, next) => {
    let token;
    if (!req.headers.authorization) {
        throw next(new NoDataError('Header not found'));
    }
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        throw next(
            new TokenExpiredError(
                `You are not logged in! Please log in to get access.`
            )
        );
    }
    jwt.verify(token, JWT_SECRETE_KEY!, (err: CallbackError, decoded: any) => {
        if (err) {
            throw next(new AuthFailureError('Unauthorized'));
        }
        //@ts-ignore
        req.body.user = decoded; // For debugging purposes, can be used to send data through jwt
        next();
    });
};

export default catchError(jwtAuth);
