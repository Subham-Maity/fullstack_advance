import {NextFunction, Request, Response} from 'express';
import ErrorHandler from './errorHandler';
import log from "../logger/logger";


/***How It Works**:
 The `globalErrorHandler` is registered as middleware using `app.use(globalErrorHandler)` in the main `app.ts` file after all other middleware and route handlers. When an error occurs anywhere in the application (either due to synchronous code throwing an error or an asynchronous error being caught), it's passed to the `next()` function with the error as an argument. The `globalErrorHandler` then intercepts this error and handles it uniformly by sending an appropriate error response back to the client.

 **Use Cases**:
 - **Unexpected Errors**: Suppose a database query fails due to a connection issue or incorrect query syntax. The `globalErrorHandler` catches this and sends a 500 Internal Server Error response to the client.
 - **Validation Errors**: If a request contains invalid data, such as missing required fields, the route handler can throw a custom error (e.g., `new ErrorHandler('Validation failed', 400)`) that gets caught by the `globalErrorHandler`, and it responds with a 400 Bad Request status.

 **Why It's in app.ts**:
 Placing `app.use(globalErrorHandler)` in the `app.ts` file ensures that this error handler is registered for all routes and middleware in your application. It catches any unhandled errors that occur during the request-response cycle and provides a consistent way of responding to errors across the entire application.

 Remember, while `globalErrorHandler` handles most errors, it's essential to have specific error handling within route handlers for finer-grained control and custom error messages based on different scenarios.
 */
export const globalErrorHandler = (
    err: ErrorHandler,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    log.info(`Error: ${err.message}`);
    res.status(statusCode).json({
        success: false,
        error: message,
    });
};

export default globalErrorHandler;
