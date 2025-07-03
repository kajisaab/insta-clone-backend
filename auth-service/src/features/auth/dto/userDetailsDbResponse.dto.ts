import { LabelValuePair } from '@common/dto/labelValuePair';

export interface UserDetailsDbResponseDto {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    roles: string[];
    bio: string;
    phoneNumber: string;
    selectedTheme: string;
    isActive: boolean;
    isBlocked: boolean;
    createdBy: LabelValuePair;
    createDateTime: Date;
    lastModifiedBy: LabelValuePair;
    lastModifiedDateTime: Date;
    userId: string;
    maxLoginAttempts: number;
    loginAttempts: number;
    password: string;
    passwordHistory: string[];
}
