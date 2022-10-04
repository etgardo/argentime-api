import { IsEnum, IsNotEmpty } from 'class-validator';
import { userTypesEnum, validationMessages } from '@_constants';
import { EnumToString } from '@common/helpers';

export class LoginDto {
  @IsNotEmpty({ message: validationMessages.NAME_NOT_EMPTY })
  email!: string;

  @IsNotEmpty({ message: validationMessages.NAME_NOT_EMPTY })
  password!: string;

  @IsNotEmpty({ message: validationMessages.NAME_NOT_EMPTY })
  @IsEnum(userTypesEnum, {
    each: true,
    message: `${validationMessages.USER_TYPE_MUST_BE} ${EnumToString(
      userTypesEnum,
    )}`,
  })
  typeUser!: string;
}
