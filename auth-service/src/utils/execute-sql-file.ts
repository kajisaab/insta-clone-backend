// src/utils/migration-helper.ts
import * as fs from "fs";
import * as path from "path";
import { QueryRunner } from "typeorm";

export async function executeSqlFile(queryRunner: QueryRunner, version: string, operation: string): Promise<void> {
    const filename = `v${version}-${operation}.sql`;
    const sqlFilePath = path.join(__dirname, '../../sql-scripts', filename);

    if (fs.existsSync(sqlFilePath)) {
        const sqlContent = fs.readFileSync(sqlFilePath).toString();

        // Split SQL by semicolons to handle multiple statements if needed
        const statements = sqlContent.split(';').filter(statement => statement.trim());

        for (const statement of statements) {
            if (statement.trim()) {
                await queryRunner.query(statement);
            }
        }
    } else {
        console.warn(`SQL file not found: ${sqlFilePath}`);
    }
}
