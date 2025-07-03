import { UserDetailsDbResponseDto } from '@features/auth/dto/userDetailsDbResponse.dto';
import convertSnakeToCamel from '@utils/convertSnakeToCamel';

/**
 * Transform raw TypeORM result into a clean UserDetailsDbResponseDto object
 */
function transformRawResult(rawResult: Record<string, string | object>): UserDetailsDbResponseDto {
    // Create an object to store our transformed result
    const transformedResult: Record<string, string | object> = {};

    // Process each key in the raw result
    Object.keys(rawResult).forEach((key) => {
        // Extract the actual property name (after the table prefix and underscore)
        let propertyName: string;
        const value = rawResult[key];

        if (key.startsWith('user_details_')) {
            // For user_details fields, remove the prefix
            propertyName = convertSnakeToCamel(key.replace('user_details_', ''));
            transformedResult[propertyName] = value;
        } else if (key.startsWith('user_credentials_')) {
            // For user_credentials fields, remove the prefix
            propertyName = convertSnakeToCamel(key.replace('user_credentials_', ''));
            transformedResult[propertyName] = value;
        } else {
            // For fields without prefix (already snake_case from the database)
            propertyName = convertSnakeToCamel(key);
            transformedResult[propertyName] = value;
        }
    });

    return transformedResult as UserDetailsDbResponseDto;
}

export default transformRawResult;
