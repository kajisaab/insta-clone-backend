import { UseCaseRequest } from '@core/usecase/usecase.request';

export class SignupUseCaseRequest implements UseCaseRequest {
    constructor(
        public readonly phoneNumber: string,
        public readonly email: string,
        public readonly userName: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly password: string
    ) {}
}
