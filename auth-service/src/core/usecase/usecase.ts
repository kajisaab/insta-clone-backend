import { Response } from 'express';
import { UseCaseRequest } from '@core/usecase/usecase.request';
import { UseCaseResponse } from '@core/usecase/usecase.response';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { RequestContext } from '../RequestContext/requestContext';

export interface UseCase<I extends UseCaseRequest, U extends UseCaseResponse> {
    execute(request: I, requestContext?: RequestContext, response?: Response): Promise<Result<U>>;
}
