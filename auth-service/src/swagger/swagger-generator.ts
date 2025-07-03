import swaggerAutogen from 'swagger-autogen';
import { swaggerOptions } from './swagger.config';
import path from 'path';
import authDoc from '../features/auth/docs/swaggerDoc';
import AppLogger from '@core/logger';

const outputFile = path.resolve(__dirname, 'swagger-output.json');
const endpointsFiles = [
    path.resolve(__dirname, '../routes.ts'),
    path.resolve(__dirname, '../features/auth/index.ts'),
    // Add more route files as your application grows
];

// Function to generate swagger documentation
export const generateSwaggerDocs = async () => {
    const logger = new AppLogger();
    try {
        // Define custom schemas for request and response models
        const doc = {
            ...swaggerOptions,
            definitions: {
                ...authDoc.definitions,
            },
        };

        await swaggerAutogen()(outputFile, endpointsFiles, doc);
        logger.log('✅ Swagger documentation generated successfully');
        return true;
    } catch (error) {
        logger.error(`Error generating Swagger documentation: ${error}`);
        return false;
    }
};

// Generate swagger docs when this file is executed directly
if (require.main === module) {
    generateSwaggerDocs();
}
