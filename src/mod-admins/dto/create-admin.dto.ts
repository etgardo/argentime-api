import { CreateUserDto } from '@mod-users/dtos';
import { IsArray, IsEnum } from 'class-validator';
import { appRoles, appRolesEnum } from '@_constants';
import { ArrayObjectToString } from '@common/helpers';

export class CreateAdminDto extends CreateUserDto {
  status: boolean;

  @IsArray()
  @IsEnum(appRolesEnum, {
    each: true,
    message: `debe ser un rol valido, ${ArrayObjectToString(appRoles)}`,
  })
  roles: string[];
}
