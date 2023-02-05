import { NextFunction, Request } from 'express';

import Joi from 'joi';
import pick from '../utils/pick';
import { BadRequestError } from '../utils/apiError';

/**
 *  Middleware function that validates user requests against a Joi schema
 *
 */
const validate =
    (schema: object) => (req: Request, res: any, next: NextFunction) => {
        // Request body should be JSON, if present
        if (Object.keys(req.body).length !== 0 && !req.is('application/json')) {
            return next(new BadRequestError('Supports JSON request body only'));
        }

        // cherry-pick from the input schema ["params", "query", "body"] fields
        const validSchema = pick(schema, ['params', 'query', 'body']);

        // cherry-pick from the request object ["params", "query", "body"] fields
        const object = pick(req, Object.keys(validSchema));

        // Compile schema to Joi schema object and validate the request object
        const { value, error } = Joi.compile(validSchema)
            .prefs({ errors: { label: 'key' } })
            .validate(object);

        // If validation fails throw 400 Bad Request error
        if (error) {
            const errorMessage = error.details
                .map((details: any) => details?.message)
                .join(', ');
            return next(new BadRequestError(errorMessage));
        }

        // Update validated fields in request with returned value
        Object.assign(req, value);

        return next();
    };

export default validate;
