import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { requestMessages, userTypesEnum } from '@_constants';
import { EnumToString } from '@common/helpers';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true, //esto permite acceder al body del Request, necesario para obtener el tipo de usuario.
    });
  }

  async validate(req: Request, email: string, password: string) {
    const typeUser = req.body['typeUser'];
    if (!Object.values(userTypesEnum).includes(typeUser))
      throw new UnauthorizedException(
        `${requestMessages.NOT_AUTHORIZED_TO_LOGIN} ${EnumToString(
          userTypesEnum,
        )}`,
      );
    const admin = await this.authService.validateUser(
      email,
      password,
      typeUser,
    );
    if (!admin)
      throw new UnauthorizedException(requestMessages.LOGIN_DOES_NOT_MATCH);
    return admin;
  }
}
