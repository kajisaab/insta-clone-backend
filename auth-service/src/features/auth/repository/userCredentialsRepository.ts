import { UserCredentialsEntity } from '@features/auth/entity/userCredentials.entity';

export interface UserCredentialsRepository {
    findByUserId(userId: string): Promise<UserCredentialsEntity>;
}
