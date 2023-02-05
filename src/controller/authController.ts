import { catchAsync } from '../types/miscellaneousInterface';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {
    AuthFailureError,
    InternalError,
    NotFoundError,
} from '../utils/apiError';
import { authModel } from '../model/authModel';
import { SuccessResponse } from '../utils/apiResponse';
import { JWT_SECRETE_KEY } from '../config';
import { AuthModel } from '../types/authInterface';

const saltRounds = 10;

export const createUser: catchAsync = async (req, res, next) => {
    const { email, password } = req.body;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            throw next(
                new InternalError(
                    err?.message || 'Error while hashing password'
                )
            );
        }
        const newUser: AuthModel = new authModel({ email, password: hash });
        const user: AuthModel = await newUser.save();
        const jwtToken: any = jwt.sign(
            {
                _id: user._id,
            },
            JWT_SECRETE_KEY!,
            { expiresIn: '8h' }
        );
        return new SuccessResponse('User created successfully', {
            token: jwtToken,
            data: user,
        }).send(res);
    });
};

export const loginUser: catchAsync = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await authModel.findOne({ email }).lean().exec();
    if (!user) {
        throw next(new NotFoundError('User not found'));
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
        throw next(new AuthFailureError('Invalid credentials'));
    }
    const jwtToken = jwt.sign(
        {
            _id: user._id,
        },
        JWT_SECRETE_KEY!,
        { expiresIn: '8h' }
    );
    return new SuccessResponse('User logged in successfully', {
        token: jwtToken,
        data: user,
    }).send(res);
};

export const updateUser: catchAsync = async (req, res, next) => {
    const { user, favorites } = req.body;
    const update = await authModel
        .findByIdAndUpdate(user._id, { favorites })
        .lean()
        .exec();
    if (update) {
        return new SuccessResponse('Favorites updated successfully', {
            update,
        }).send(res);
    } else {
        throw next(new InternalError('Error while updating favorites'));
    }
};
