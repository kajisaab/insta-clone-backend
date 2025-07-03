import { PublicRoutes } from '@/src/common/publicRoutes';
import type { NextFunction, Response, Request } from 'express';
import { UnauthorizedError } from '../errorHandler/unauthorizedError';

function requestInterceptor(req: Request, _res: Response, next: NextFunction): void {
    const inputs = [req.params, req.query, req.body];

    for (const input of inputs) {
        for (const key in input) {
            const value = input[key];
            if (typeof value === 'string' || value instanceof String) {
                input[key] = value.trim();
            }
        }
    }

    const isExcludedRoute = PublicRoutes.some((route: string) => req.originalUrl.includes(route));

    if (isExcludedRoute) {
        next();
        return;
    }

    // here validate the api for the token;
    const token: string = req.cookies?.accessToken ?? (req.headers['x-xsrf-token'] as string);

    if (token === null || token === '' || token === undefined) {
        throw new UnauthorizedError('Token not provided');
    }
}

export default requestInterceptor;
