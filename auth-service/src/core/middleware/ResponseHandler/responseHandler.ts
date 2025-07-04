import type { Response, NextFunction, Request } from 'express';
import AppLogger from '@core/logger';

export function responseInterceptor(req: Request, res: Response, next: NextFunction): void {
    const logger = new AppLogger();
    // Save the original send method
    const originalSend = res.send.bind(res);

    // Check if there is token in the header or not
    const token: string = req.cookies?.accessToken ?? (req.headers['x-xsrf-token'] as string);

    // Override the send method to intercept the response
    res.send = ((body: object) => {
        const option = {
            httpOnly: true,
            secure: true,
        };
        if (token !== null && token !== undefined && req.user?.userId) {
            generateCookiesAndUpdateRefreshTokenOnTable(token, req?.user?.userId)
                .then((result: generateCookiesAndUpdateRefreshTokenOnTableInterface) => {
                    res.cookie('accessToken', result.accessToken, option).cookie('refreshToken', result.refreshToken, option);
                })
                .catch((err) => {
                    logger.error(err);
                });
        } else {
            originalSend(body);
        }
    }) as Response['send'];

    // Move to the next middleware in the chain
    next();
}

async function generateCookiesAndUpdateRefreshTokenOnTable(_token: string, _userId: string): Promise<generateCookiesAndUpdateRefreshTokenOnTableInterface> {
    // const accessToken = await updateToken(token, 'access');
    // const refreshToken = await updateToken(token, 'refresh');
    // await executeQuery(
    //   `UPDATE ecommerce.user_details SET refresh_token = '${refreshToken}' WHERE id = ${userId}`
    // );
    const accessToken = 'access token';
    const refreshToken = 'refresh token';

    return {
        refreshToken,
        accessToken,
    };
}

interface generateCookiesAndUpdateRefreshTokenOnTableInterface {
    accessToken: string;
    refreshToken: string;
}
