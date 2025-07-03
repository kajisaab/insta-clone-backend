import http from 'http';
import { getAppConfig } from '@config/app';
import { isTestEnvironment } from '@config/env';
import app from './app';
import AppLogger from '@core/logger';
import { CacheFactory } from '@core/caching/cache.factory';
import dbConnection from '@config/db-connection';
import KafkaService from '@core/kafka/kafka';

const logger = new AppLogger();

const server = http.createServer(app);

// Get port from environment configuration
const { port } = getAppConfig();

async function startServer() {
    try {
        const response: boolean = await dbConnection(server);
        if(response){
            await CacheFactory.getInstance().initialize();
            const kafka = KafkaService.getInstance();
            await kafka.connectProducer(); // <---- REQUIRED
            server.listen(port, async() => {
                logger.log(`✅ Server is listening on port::${port}`);
            });
        }
    } catch (error) {
        logger.error(`Error while starting server: ${error}`);
    }
}

// Only start the server if not in test environment
if (!isTestEnvironment()) {
// Properly handle the promise to catch any unhandled rejections
    startServer().catch(error => {
        logger.error(`Unhandled error during server startup: ${error}`);
        process.exit(1);
    });
}

// Export the application for testing
export { app, server };
