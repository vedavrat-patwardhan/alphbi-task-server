import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './routes/v1/routes';
import { corsUrl, db, environment } from './config';
import { ApiError, InternalError, NotFoundError } from './utils/apiError';
// @ts-ignore
import logger from './utils/logger';

mongoose.Promise = global.Promise;
//@ts-ignore:next-line
mongoose.connect(db.connectionUrl, {
    //For mongoDB connection
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('/*', (_req: Request, res: Response, next: NextFunction) => {
    //For CORS
    res.header('Access-Control-Allow-Origin', corsUrl);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(`/${db.version}`, router);
// catch 404 and forward to error handler
app.use((_req, _res, next) => next(new NotFoundError()));
// Middleware Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ApiError) {
        ApiError.handle(err, res);
    } else {
        if (environment === 'development') {
            logger.error(err);
        }
        ApiError.handle(new InternalError(), res);
    }
});
export default app;
