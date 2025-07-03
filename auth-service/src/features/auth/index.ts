import { Request, Response, NextFunction, Router } from 'express';
import { asyncHandler } from '@core/middleware/ResponseHandler/asyncHandler';
import { AuthController } from '@features/auth/controller/authController';
import { loginValidation } from '@features/auth/validationSchema/login.validation';
import { validate } from '@utils/validation';
import { userSignupSchema } from '@features/auth/validationSchema/signup.validation';

const authRouter = Router();

authRouter.post(
    '/login',
    validate(loginValidation),
    (req: Request, res: Response, next: NextFunction) => {
        /**
    #swagger.tags = ['User'];
    #swagger.description = 'Endpoint to sign in a specific user';
    #swagger.path = '/auth/login';
    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'User information.',
        required: true,
        schema: { $ref: '#/definitions/LoginRequest' }
    };
    #swagger.responses[200] = {
        schema: { '$ref': '#/definitions/LoginResponse' },
        description: 'User registered successfully.'
    };
     */
        return asyncHandler(AuthController.loginController)(req, res, next);
    }
);

authRouter.post(
    '/signup',
    validate(userSignupSchema),
    (req: Request, res: Response, next: NextFunction) => {
        return asyncHandler(AuthController.signupController)(req, res, next);
    }
);

export default authRouter;
