import { DataSource } from 'typeorm';
import { getAppConfig } from './app';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: getAppConfig().dbHost,
    port: +getAppConfig().dbPort,
    username: getAppConfig().dbUsername,
    password: getAppConfig().dbPassword,
    database: getAppConfig().dbName,
    synchronize: false, // Don't auto-sync your schema to avoid accidental changes
    logging: false,
    entities: ['src/features/**/*.entity.ts'],
    migrations: ['src/migration/*.ts'],
    migrationsTableName: 'typeorm_migrations', // This is a convention

    // entities: [__dirname + '/src/features/**/*.entity.ts'],
    // migrations: ['dist/src/migration/!(*.spec|*.d).js', '!dist/src/migration/execute-sql-file.js'],
});
