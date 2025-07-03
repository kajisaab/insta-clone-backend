// Environment configuration
export type Environment = 'development' | 'production' | 'test';

// Get current environment from NODE_ENV, default to development
export const getEnvironment = (): Environment => {
    return (process.env.NODE_ENV as Environment) || 'development';
};

// Check if current environment is "test"
export const isTestEnvironment = (): boolean => {
    return getEnvironment() === 'test';
};
