import { NextFunction } from 'express';
import {
    AuthFailureError,
    NoDataError,
    TokenExpiredError,
} from '../utils/apiError';
import jwt from 'jsonwebtoken';
import { JWT_SECRETE_KEY } from '../config';

export async function auth(req: any, res: any, next: NextFunction) {
    let token;
    if (!req.headers.authorization) {
        return next(new NoDataError('Header not found'));
    }
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    jwt.verify(token, JWT_SECRETE_KEY, (err: any, decoded: any) => {
        if (err) {
            return next(new AuthFailureError('Invalid token'));
        }
        if (!decoded) return next(new AuthFailureError('Unauthorized'));
        if (!req.user) return next(new AuthFailureError('Unauthorized'));
        console.log(decoded);
        req.body._id = decoded._id;
    });

    return next();
}
