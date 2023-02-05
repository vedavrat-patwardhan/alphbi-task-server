import { Router } from 'express';
import {
    createUser,
    loginUser,
    updateUser,
} from '../../controller/authController';
import validate from '../../middleware/validate';
import catchAsync from '../../utils/catchAsync';
import { authValidation } from '../../validation';
import jwtAuth from '../../middleware/isAuth';

const authRouter = Router();

authRouter.post(
    '/create-user',
    validate(authValidation.auth),
    catchAsync(createUser)
);

authRouter.post(
    '/login-user',
    validate(authValidation.auth),
    catchAsync(loginUser)
);

authRouter.patch(
    '/update-favorite',
    validate(authValidation.favorite),
    jwtAuth,
    catchAsync(updateUser)
);

export default authRouter;
