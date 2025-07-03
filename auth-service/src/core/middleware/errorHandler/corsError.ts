import { StatusCode } from '@common/enums/statucCodeEnum';
import { CustomError } from './CustomError';

export class CorsError extends CustomError {
    constructor(message: string, title: string = 'Cors Error') {
        super(message, StatusCode.REJECTED_URL, title);
    }
}
