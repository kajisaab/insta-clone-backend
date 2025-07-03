import { UseCaseResponse } from '@core/usecase/usecase.response';

export class LoginUseCaseResponse implements UseCaseResponse {
    constructor(public readonly message: string) {}
}
