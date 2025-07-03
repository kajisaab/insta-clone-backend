import { UseCaseResponse } from '@core/usecase/usecase.response';

export class SignupUseCaseResponse implements UseCaseResponse {
    constructor(public readonly message: string) {}
}
