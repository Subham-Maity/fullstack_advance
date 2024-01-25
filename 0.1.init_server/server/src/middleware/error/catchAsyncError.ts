import { Request, Response, NextFunction, RequestHandler } from 'express';

const catchAsyncError = (asyncFun: RequestHandler) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Promise.resolve(asyncFun(req, res, next)).catch(next);
};

export default catchAsyncError;
