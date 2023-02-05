"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authModel = void 0;
const mongoose_1 = require("mongoose");
const auth = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    favorites: [
        {
            type: String,
        },
    ],
}, {
    timestamps: true,
});
exports.authModel = (0, mongoose_1.model)('auth', auth, 'users');
