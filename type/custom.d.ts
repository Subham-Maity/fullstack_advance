import { Request } from 'express';

declare module 'express' {
    interface Request {
        id: string;
        requestOrigin: string;
    }
}