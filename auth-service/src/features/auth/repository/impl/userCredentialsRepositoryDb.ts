import { UserCredentialsRepository } from '@features/auth/repository/userCredentialsRepository';
import { UserCredentialsEntity } from '../../entity/userCredentials.entity';

export class UserCredentialsRepositoryDb implements UserCredentialsRepository {
    findByUserId(userId: string): Promise<UserCredentialsEntity> {
        throw new Error('Method not implemented.');
    }
}
