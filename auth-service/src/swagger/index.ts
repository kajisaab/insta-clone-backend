import swaggerUi from 'swagger-ui-express';
import path from 'path';
import fs from 'fs';
import { generateSwaggerDocs } from './swagger-generator';
import AppLogger from '@core/logger';
import * as core from 'express-serve-static-core';

// Path to the swagger output file
const swaggerOutputPath = path.resolve(__dirname, 'swagger-output.json');

// Function to setup swagger documentation
export const setupSwagger = async (app: core.Express): Promise<void> => {
    const logger = new AppLogger();
    try {
        // Generate swagger documentation if it doesn't exist
        if (!fs.existsSync(swaggerOutputPath)) {
            await generateSwaggerDocs();
        }

        // Load the swagger document
        const swaggerDocument = require(swaggerOutputPath);

        // Setup swagger UI
        app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        logger.log('✅ Swagger UI initialized successfully');
    } catch (error) {
        logger.error(`Error setting up Swagger: ${error}`);
    }
};
