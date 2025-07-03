/**
 * Swagger configuration file
 */
export const swaggerOptions = {
    info: {
        title: 'Instagram Clone API',
        description: 'API documentation for Instagram Clone backend',
        version: '1.0.0',
        contact: {
            name: 'Aman Khadka',
        },
        license: {
            name: 'MIT',
        },
    },
    host: 'localhost',
    basePath: '/api/v1',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        // Add more tags as you add more features
    ],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Enter your bearer token in the format: Bearer <token>',
        },
    },
    definitions: {
        // These will be auto-populated from your request/response classes
    },
};
