import { DbEntity } from '@common/entity/DbEntity';
import {
    BooleanColumn,
    JsonbColumn,
    TextColumn,
} from '@utils/entites.decorator';
import { LabelValuePair } from '@common/dto/labelValuePair';
import { Entity } from 'typeorm';

@Entity({ name: 'user_details', schema: 'instagram' })
export class UserDetails extends DbEntity {
    @TextColumn({ name: 'first_name' })
    firstName!: string;

    @TextColumn({ name: 'last_name' })
    lastName!: string;

    @TextColumn({ name: 'user_name' })
    userName: string | null = null;

    @TextColumn({ name: 'email' })
    email!: string;

    @TextColumn({ name: 'user_image' })
    userImage: string | null = null;

    @JsonbColumn({ name: 'roles' })
    roles: LabelValuePair[] | null = null;

    @TextColumn({ name: 'bio' })
    bio: string | null = null;

    @TextColumn({ name: 'phone_number' })
    phoneNumber: string | null = null;

    @TextColumn({ name: 'selected_theme' })
    selectedTheme: string = 'light';

    @BooleanColumn({ name: 'is_active' })
    isActive: boolean = false;

    @BooleanColumn({ name: 'is_blocked' })
    isBlocked: boolean = false;

    @BooleanColumn({ name: 'is_verified' })
    isVerified: boolean = false;

    @JsonbColumn({ name: 'logged_in_ip' })
    loggedInIp: string | null = null;
}
