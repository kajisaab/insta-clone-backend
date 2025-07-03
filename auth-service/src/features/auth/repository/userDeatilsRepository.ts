// import { UserDetails } from '@features/auth/entity/userDetails.entity';
import { UserDetailsDbResponseDto } from '@features/auth/dto/userDetailsDbResponse.dto';

export interface UserDetailsRepository {
    findBy_Email_Username_PhoneNumber(userIdentifier: string): Promise<UserDetailsDbResponseDto | null>;

    findBy_Email_or_Username_or_PhoneNumber(email: string, userName: string, phoneNumber: string): Promise<string | null>;
}
