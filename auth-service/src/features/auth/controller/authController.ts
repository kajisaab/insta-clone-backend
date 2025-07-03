import { NextFunction, Request, Response } from 'express';
import { LoginUseCase } from '@features/auth/usecase/login.usecase';
import { LoginUseCaseRequest } from '@features/auth/request/login.usecase.request';
import { SignupUseCase } from '@features/auth/usecase/signup.usecase';
import { SignupUseCaseRequest } from '@features/auth/request/signup.usecase.request';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { SignupUseCaseResponse } from '@features/auth/response/signup.usecase.response';
import { LoginUseCaseResponse } from '@features/auth/response/login.usecase.response';

export class AuthController {
    public static async loginController(req: Request, res: Response, _next: NextFunction): Promise<Result<LoginUseCaseResponse>> {
        const loginUseCase = new LoginUseCase(); // Instantiate UseCase

        return await loginUseCase.execute(req.body as LoginUseCaseRequest, undefined, res);
    }

    public static async signupController(req: Request, res: Response, _next: NextFunction): Promise<Result<SignupUseCaseResponse>> {
        const signupUseCase = new SignupUseCase();

        return await signupUseCase.execute(req.body as SignupUseCaseRequest, undefined, res);
    }
}
