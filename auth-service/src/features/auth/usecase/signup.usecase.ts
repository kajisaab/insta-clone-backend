import { Result } from '@/src/core/middleware/ResponseHandler/Result';
import { UseCase } from '@core/usecase/usecase';
import { SignupUseCaseRequest } from '@features/auth/request/signup.usecase.request';
import { SignupUseCaseResponse } from '@features/auth/response/signup.usecase.response';
import { Response } from 'express';
import { UserDetailsRepositoryDb } from '@features/auth/repository/impl/userDetailsRepositoryDb';
import { AppDataSource } from '@config/db.config';
import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';
import { RequestContext } from '@/src/core/RequestContext/requestContext';

export class SignupUseCase
    implements UseCase<SignupUseCaseRequest, SignupUseCaseResponse>
{
    async execute(
        request: SignupUseCaseRequest,
        _requestContext?: RequestContext,
        _response?: Response
    ): Promise<Result<SignupUseCaseResponse>> {
        const connection = AppDataSource.manager;

        const userDetailsRepository = new UserDetailsRepositoryDb(connection);

        const userDetailsInfo =
            await userDetailsRepository.findBy_Email_or_Username_or_PhoneNumber(
                request.email,
                request.userName,
                request.phoneNumber
            );

        if (!userDetailsInfo) {
            throw new BadRequestException(userDetailsInfo as string);
        }

        console.log({ request });
        throw new Error('Method not implemented.');
    }
}
