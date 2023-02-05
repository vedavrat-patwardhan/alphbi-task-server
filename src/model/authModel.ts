import { model, Schema } from 'mongoose';
import { AuthModel } from '../types/authInterface';

const auth = new Schema(
    {
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
    },
    {
        timestamps: true,
    }
);

export const authModel = model<AuthModel>('auth', auth, 'users');
