import { DbEntity } from '@common/entity/DbEntity';
import { Entity } from 'typeorm';
import { IntegerColumn, JsonbColumn, TextColumn } from '@utils/entites.decorator';

@Entity({ name: 'user_credentials', schema: 'instagram' })
export class UserCredentialsEntity extends DbEntity{
    @TextColumn({name: 'user_id'})
    userId!: string;

    @IntegerColumn({name: 'max_login_attempts', default: 5})
    maxLoginAttempts!: number;

    @IntegerColumn({name: 'login_attempts', default: 0})
    loginAttempts!: number;

    @TextColumn({name: 'password'})
    password!: string;

    @JsonbColumn({name: 'password_history'})
    passwordHistory: string[] | null = null;
}
