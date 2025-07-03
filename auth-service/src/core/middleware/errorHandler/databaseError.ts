import { StatusCode } from '@common/enums/statucCodeEnum';
import { CustomError } from './CustomError';

export class DatabaseError extends CustomError {
    constructor(message: string) {
        super(message, StatusCode.DB_CRASH);
    }
}
