import {Request, Response, NextFunction} from 'express';
import {catchAsync} from '../types/miscellaneousInterface';


export default (execution: catchAsync) =>
    (req: Request, res: Response, next: NextFunction) => {
        execution(req, res, next).catch(next);
    };
