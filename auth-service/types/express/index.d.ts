// types/express/index.d.ts
import { Request } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            userId: string;
            // Add any other properties you attach to `req.user` here
        };
    }
}
