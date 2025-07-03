import corsOptions from '@config/corsConfiguration';
import { responseInterceptor } from '@core/middleware/ResponseHandler/responseHandler';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { getAppConfig } from '@config/index';
import errorHandler from '@core/middleware/errorHandler';
import requestInterceptor from '@core/middleware/RequestHandler/requestInterceptor';
import shouldCompress from '@config/compressionConfiguration';
import routes from './routes';
import { setupSwagger } from './swagger';
import AppLogger from './core/logger';

const { apiPrefix } = getAppConfig();

const app = express();

const logger = new AppLogger();

/**
 * PARSE JSON BODIES TO THE OBJECT
 */
app.use(express.json());

/**
 * PARSE URL-ENCODED BODIES TO PLAIN TEXT
 */
app.use(express.urlencoded({ extended: true }));

/**
 * REQUEST MIDDLEWARE TO MODIFY THE REQUEST
 */
app.use(requestInterceptor);

/**
 * DEFINE CORS OPTIONS
 */
app.use(cors(corsOptions));

/**
 * SECURITY PURPOSE
 */
app.use(helmet());

/**
 * COMPRESS THE RESPONSE
 */
app.use(compression({ filter: shouldCompress }));

/**
 * HANDLE THE ROUTES.
 */
app.use(`${apiPrefix}`, routes);

// Initialize Swagger
setupSwagger(app).catch((err) => logger.error(`Failed to setup Swagger:, ${err}`));

/**
 * RESPONSE MIDDLEWARE TO MODIFY THE RESPONSE MAINLY USED TO SEND TOKEN TO THE CLIENT USING COOKIE OR ON HEADER
 */
app.use(responseInterceptor);

/**
 * ERROR HANDLING
 */
app.use(errorHandler);

export default app;
