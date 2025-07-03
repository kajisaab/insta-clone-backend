declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            userId: string;
            // Add any other properties you attach to `req.user` here
        };
    }
}
