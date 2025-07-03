import { app, server } from '@src/index';

// Global setup for tests
beforeAll(async () => {
    // Add any global setup here, like database connections
});

afterAll(async () => {
    // Close the server to prevent Jest from hanging
    await new Promise<void>((resolve) => {
        server.close(() => {
            console.log('Server closed');
            resolve();
        });
    });
});

export { app };
