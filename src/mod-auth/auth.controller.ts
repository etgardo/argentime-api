import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos';
import { LoggedUserDec } from '@common/decorators';
import { UserEntity } from '@mod-users/entities';
import { requestMessages } from '@_constants';
import { LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
