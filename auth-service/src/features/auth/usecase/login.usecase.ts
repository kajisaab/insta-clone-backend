import { Response } from 'express';
import { Result } from '@/src/core/middleware/ResponseHandler/Result';
import { UseCase } from '@core/usecase/usecase';
import { LoginUseCaseRequest } from '@features/auth/request/login.usecase.request';
import { LoginUseCaseResponse } from '@features/auth/response/login.usecase.response';
import { CacheFactory } from '@core/caching/cache.factory';
import generateUUId from '@utils/id-generator';
import { PrepareCookieRequest } from '@features/auth/utils/prepareCookieRequest';
import { getAppConfig } from '@config/app';
import setCookie from '@features/auth/utils/prepareCookie';
import decryptPassword from '@features/auth/utils/decryptPassword';
import { AppDataSource } from '@config/db.config';
import { UserDetailsRepositoryDb } from '@features/auth/repository/impl/userDetailsRepositoryDb';
import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';
import { comparePassword } from '@core/hashing/hashing';
import KafkaService from '@/src/core/kafka/kafka';
import { RequestContext } from '@/src/core/RequestContext/requestContext';

export class LoginUseCase implements UseCase<LoginUseCaseRequest, LoginUseCaseResponse> {
    async execute(request: LoginUseCaseRequest, _requestContext?: RequestContext, response?: Response): Promise<Result<LoginUseCaseResponse>> {
        const connection = AppDataSource.manager;

        const kafka = KafkaService.getInstance();

        await kafka.sendMessage('test-topic', [{ key: 'key1', value: 'message' }]);
        const userDetailsDbRepository = new UserDetailsRepositoryDb(connection);

        const plainPassword = decryptPassword(request.password.split(':')[2]);

        const userDetail = await userDetailsDbRepository.findBy_Email_Username_PhoneNumber(request.userName);

        if (!userDetail) {
            throw new BadRequestException(`Can't find user with ${request.userName}`);
        }

        const doesPasswordMatch = await comparePassword(plainPassword, userDetail.password, userDetail.id, userDetail.userName);

        if (!doesPasswordMatch) {
            throw new BadRequestException(`Invalid Credential ! Please Try again.`);
        }

        const sessionId = generateUUId().replace(/-/g, '');

        const csrfToken = generateUUId().replace(/-/g, '');

        // Store session in Redis
        await CacheFactory.getInstance().cacheData(`session:${sessionId}`, {
            user_id: generateUUId(),
            userId: 'userId',
            ip: 'ip_address',
            last_activity: Date.now(),
        });

        // Store session ID under user_sessions
        await CacheFactory.getInstance().cacheData(`session:${generateUUId()}`, sessionId);

        // Store CSRF Token
        await CacheFactory.getInstance().cacheData(`csrf_token:${sessionId}`, csrfToken);

        const sessionIdCookieRequest = new PrepareCookieRequest(getAppConfig().sessionExpiresIn, 'session_id', sessionId);
        const csrfTokenCookieRequest = new PrepareCookieRequest(getAppConfig().sessionExpiresIn, 'csrf_token', csrfToken);

        const loginResponse = new LoginUseCaseResponse('Successfully logged in');

        setCookie(response, sessionIdCookieRequest);

        setCookie(response, csrfTokenCookieRequest);

        return Result.createSuccess(loginResponse);
    }
}
