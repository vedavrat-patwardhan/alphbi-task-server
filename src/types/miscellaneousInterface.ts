import { NextFunction, Request, Response } from 'express';
import { Document, PopulatedDoc, Schema } from 'mongoose';

export type catchAsync = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>;
