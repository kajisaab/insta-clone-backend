import { UserDetailsRepository } from '@features/auth/repository/userDeatilsRepository';
import { UserDetails } from '../../entity/userDetails.entity';
import { EntityManager, Repository } from 'typeorm';
import { UserDetailsDbResponseDto } from '@features/auth/dto/userDetailsDbResponse.dto';
import transformRawResult from '@features/auth/utils/transformRawResult';

export class UserDetailsRepositoryDb implements UserDetailsRepository {
    private userDetailsRepository: Repository<UserDetails>;

    constructor(connection: EntityManager) {
        this.userDetailsRepository = connection.getRepository(UserDetails);
    }

    async findBy_Email_or_Username_or_PhoneNumber(email: string, userName: string, phoneNumber: string): Promise<string | null> {
        const result = await this.userDetailsRepository
            .createQueryBuilder('user_details')
            .select(
                'CASE ' +
                    "WHEN user_details.email = :email THEN 'Email is already in use' " +
                    "WHEN user_details.phone_number = :phoneNumber THEN 'Phone number is already in use' " +
                    "WHEN user_details.user_name = :userName THEN 'Username is already in use' " +
                    'END as message'
            )
            .where('user_details.email = :email', { email })
            .orWhere('user_details.user_name = :userName', { userName })
            .orWhere('user_details.phone_number = :phoneNumber', { phoneNumber })
            .getRawOne();

        return result?.message || null;
    }

    async findBy_Email_Username_PhoneNumber(userIdentifier: string): Promise<UserDetailsDbResponseDto | null> {
        const rawResult = await this.userDetailsRepository
            .createQueryBuilder('user_details')
            .leftJoin('user_credentials', 'user_credentials', 'user_credentials.user_id = user_details.id')
            .select([
                'user_details.id',
                'user_details.is_deleted',
                'user_details.created_by',
                'user_details.created_date_time',
                'user_details.last_modified_by',
                'user_details.last_modified_date_time',
                'user_details.first_name',
                'user_details.last_name',
                'user_details.user_name',
                'user_details.email',
                'user_details.user_image',
                'user_details.roles',
                'user_details.bio',
                'user_details.phone_number',
                'user_details.selected_theme',
                'user_details.is_active',
                'user_details.is_blocked',
                'user_credentials.password',
                'user_credentials.max_login_attempts',
                'user_credentials.login_attempts',
                'user_credentials.password_history',
            ])
            .where('user_details.email = :userIdentifier', { userIdentifier })
            .orWhere('user_details.user_name = :userIdentifier', { userIdentifier })
            .orWhere('user_details.phone_number = :userIdentifier', { userIdentifier })
            .getRawOne();

        if (!rawResult) return null;

        // Transform the raw result into a clean object with proper camelCase properties
        return transformRawResult(rawResult);
    }
}
