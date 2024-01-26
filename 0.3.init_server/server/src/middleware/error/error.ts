import { Request, Response } from 'express';

export default (err: any, _req: Request, res: Response) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";
    if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = Object.values(err.errors).map((items: any) => items.message).join(',')
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })

}

