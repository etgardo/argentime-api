import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos';
import { LoggedUserDec, PublicRouteDec } from '@common/decorators';
import { UserEntity } from '@mod-users/entities';
import { requestMessages } from '@_constants';
import { LocalAuthGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Antes de esto se ejecuta el guard con JWT por que está configurado de forma global desde app.module, por consiguiente es necesario implementar un decorador para indicarle al jwt-auth.guard que la ruta es pública insertando metada y obteniendo a traves de un reflector.
  @PublicRouteDec()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @LoggedUserDec() loggedUser: UserEntity,
  ) {
    delete loggedUser.password;
    const data = await this.authService.login(loggedUser, loginDto.typeUser);
    return {
      message: requestMessages.SUCCESS_LOGIN,
      data,
    };
  }

  @Post('logout')
  async logout(@LoggedUserDec() user: UserEntity) {
    return console.log({ lgoutUSer: user });
    //await this.authService.logout(user.id);
  }
}
