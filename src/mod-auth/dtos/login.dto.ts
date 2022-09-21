import { IsEnum, IsNotEmpty } from 'class-validator';
import { validationMessages } from '@_constants';
import { userTypesEnum } from '@_constants';
import { EnumToString } from '@common/helpers';

export class LoginDto {
  @IsNotEmpty({ message: validationMessages.NAME_NOT_EMPTY })
  email!: string;

  @IsNotEmpty({ message: validationMessages.NAME_NOT_EMPTY })
  password!: string;

  @IsNotEmpty({ message: validationMessages.NAME_NOT_EMPTY })
  @IsEnum(userTypesEnum, {
    each: true,
    message: `el tipo de usuario de usuario debe ser de tipo ${EnumToString(
      userTypesEnum,
    )}`,
  })
  typeUser!: string;
}
