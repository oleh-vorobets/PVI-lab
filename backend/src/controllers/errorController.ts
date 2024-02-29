import { Request, Response, NextFunction } from 'express';

import AppError from '../utils/appError.js';

export function globalErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(err);
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            message: err.message,
            status: 'fail',
        });
    } else {
        res.status(500).json({
            message: 'Something went wrong!',
            status: 'error',
        });
    }
}
