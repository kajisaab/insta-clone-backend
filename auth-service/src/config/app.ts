import { getEnvironment } from './env';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Application configuration interface
export interface AppConfig {
    nodeEnv: string;
    port: number;
    apiPrefix: string;
    corsOrigin: string | string[];
    jwtSecret: string;
    jwtExpiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
    dbHost: string;
    dbPort: number;
    dbUsername: string;
    dbPassword: string;
    dbName: string;
    redisUrl: string;
    sessionExpiresIn: number;
    rsaPrivateKey: string;
    kafkaBroker: string;
}

// Default application configurations for different environments
const appConfigs: Record<string, AppConfig> = {
    development: {
        nodeEnv: process.env.NODE_ENV || 'development',
        port: parseInt(process.env.PORT || '3000', 10),
        apiPrefix: process.env.API_PREFIX || '/api/v1',
        corsOrigin: process.env.CORS_ORIGIN || '*',
        jwtSecret: process.env.JWT_SECRET || 'dev_secret_key',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '600s',
        refreshSecret: process.env.REFRESH_SECRET || 'dev_refresh_secret_key',
        refreshExpiresIn: process.env.REFRESH_EXPIRES_IN || '30d',
        dbHost: process.env.DB_HOST || 'auth-db',
        dbPort: parseInt(process.env.DB_PORT || '5432', 10),
        dbUsername: process.env.DB_USERNAME || 'aman',
        dbPassword: process.env.DB_PASSWORD || 'root',
        dbName: process.env.DB_NAME || 'auth_service',
        redisUrl: process.env.REDIS_URL || 'redis://redis:6379',
        sessionExpiresIn: parseInt(process.env.SESSION_EXPIRES_IN || '2592000000', 10),
        rsaPrivateKey: process.env.RSA_PRIVATE_KEY as string,
        kafkaBroker: process.env.KAFKA_BROKER as string,
    },
    test: {
        nodeEnv: process.env.NODE_ENV || 'test',
        port: parseInt(process.env.TEST_PORT || '3001', 10),
        apiPrefix: process.env.TEST_API_PREFIX || '/api/v1',
        corsOrigin: process.env.TEST_CORS_ORIGIN || '*',
        jwtSecret: process.env.TEST_JWT_SECRET || 'test_secret_key',
        jwtExpiresIn: process.env.TEST_JWT_EXPIRES_IN || '1h',
        refreshSecret: process.env.TEST_REFRESH_SECRET || 'test_refresh_secret_key',
        refreshExpiresIn: process.env.TEST_REFRESH_EXPIRES_IN || '30d',
        dbHost: process.env.TEST_DB_HOST || 'localhost',
        dbPort: parseInt(process.env.TEST_DB_PORT || '5432', 10),
        dbUsername: process.env.TEST_DB_USERNAME || 'test_user',
        dbPassword: process.env.TEST_DB_PASSWORD || 'test_password',
        dbName: process.env.TEST_DB_NAME || 'instagram',
        redisUrl: process.env.TEST_REDIS_URL || 'redis://localhost:6379',
        sessionExpiresIn: parseInt(process.env.TEST_SESSION_EXPIRES_IN || '2592000000', 10),
        rsaPrivateKey: process.env.TEST_RSA_PRIVATE_KEY as string,
        kafkaBroker: process.env.TEST_KAFKA_BROKER as string,
    },
};

// Get application configuration based on current environment
export const getAppConfig = (): AppConfig => {
    const environment = getEnvironment();

    return appConfigs[environment];
};
