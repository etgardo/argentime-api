import { IsNotEmpty, IsString, MaxLength, IsEmail } from 'class-validator';
//The docs validation is in -> https://typeorm.io/validation and https://github.com/typestack/class-validator
import { validationMessages } from '@_constants';

export class CreateUserDto {
  @IsNotEmpty({ message: validationMessages.NAME_NOT_EMPTY })
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsNotEmpty({ message: validationMessages.LAST_NAME_NOT_EMPTY })
  @IsString()
  @MaxLength(100)
  lastName!: string;

  @IsEmail({}, { message: validationMessages.EMAIL_IS_EMAIL })
  email!: string;

  @IsNotEmpty({ message: validationMessages.PASSWORD_NOT_EMPTY })
  password?: string | null;

  refreshToken?: string | null;
}
