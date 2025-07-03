import { StatusCode } from '@common/enums/statucCodeEnum';
import { CustomError } from './CustomError';

export class UnauthorizedError extends CustomError {
    constructor(message: string) {
        super(message, StatusCode.UNAUTHORIZED, 'Unauthorized');
    }
}
