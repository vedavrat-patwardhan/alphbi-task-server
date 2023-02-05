import { Document, Schema } from 'mongoose';

export interface AuthModel extends Document {
    _id: Schema.Types.ObjectId;
    email: string;
    password: string;
    favorites: string[];
}
