import { Response } from 'express';
import { PrepareCookieRequest } from '@features/auth/utils/prepareCookieRequest';
import { getAppConfig } from '@config/app';

function setCookie(res: Response | undefined, cookieDetails: PrepareCookieRequest){
    if(res){
        res.cookie(
            cookieDetails.key,
            cookieDetails.value,
            {
                httpOnly: true,
                secure: getAppConfig().nodeEnv !== 'production',
                sameSite: getAppConfig().nodeEnv === 'production' ? 'none' : 'lax',
                maxAge: cookieDetails.maxAge
            }
        )
    }

}

export default setCookie;
