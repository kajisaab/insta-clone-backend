import { StatusCode } from '@common/enums/statucCodeEnum';
import { CustomError } from './CustomError';

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, StatusCode.NOT_FOUND, 'Not Found');
    }
}
