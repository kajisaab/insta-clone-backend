import { UseCaseRequest } from '@core/usecase/usecase.request';

export class LoginUseCaseRequest implements UseCaseRequest {
    constructor(
        public readonly userName: string,
        public readonly password: string,
        public readonly ip: string,
        public readonly optIntoOneTap: boolean
    ) {}
}
