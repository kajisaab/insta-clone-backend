import { StatusCode } from '@common/enums/statucCodeEnum';
import { CustomError } from './CustomError';

export class ForbiddenError extends CustomError {
    constructor(message: string) {
        super(message, StatusCode.FORBIDDEN, 'Access Denied');
    }
}
