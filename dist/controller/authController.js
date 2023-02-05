"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.loginUser = exports.createUser = void 0;
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const apiError_1 = require("../utils/apiError");
const authModel_1 = require("../model/authModel");
const apiResponse_1 = require("../utils/apiResponse");
const config_1 = require("../config");
const saltRounds = 10;
const createUser = async (req, res, next) => {
    const { email, password } = req.body;
    bcrypt_1.default.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            throw next(new apiError_1.InternalError((err === null || err === void 0 ? void 0 : err.message) || 'Error while hashing password'));
        }
        const newUser = new authModel_1.authModel({ email, password: hash });
        const user = await newUser.save();
        const jwtToken = jwt.sign({
            _id: user._id,
        }, config_1.JWT_SECRETE_KEY, { expiresIn: '8h' });
        return new apiResponse_1.SuccessResponse('User created successfully', {
            token: jwtToken,
            data: user,
        }).send(res);
    });
};
exports.createUser = createUser;
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await authModel_1.authModel.findOne({ email }).lean().exec();
    if (!user) {
        throw next(new apiError_1.NotFoundError('User not found'));
    }
    const result = await bcrypt_1.default.compare(password, user.password);
    if (!result) {
        throw next(new apiError_1.AuthFailureError('Invalid credentials'));
    }
    const jwtToken = jwt.sign({
        _id: user._id,
    }, config_1.JWT_SECRETE_KEY, { expiresIn: '8h' });
    return new apiResponse_1.SuccessResponse('User logged in successfully', {
        token: jwtToken,
        data: user,
    }).send(res);
};
exports.loginUser = loginUser;
const updateUser = async (req, res, next) => {
    const { user, favorites } = req.body;
    const update = await authModel_1.authModel
        .findByIdAndUpdate(user._id, { favorites })
        .lean()
        .exec();
    if (update) {
        return new apiResponse_1.SuccessResponse('Favorites updated successfully', {
            update,
        }).send(res);
    }
    else {
        throw next(new apiError_1.InternalError('Error while updating favorites'));
    }
};
exports.updateUser = updateUser;
