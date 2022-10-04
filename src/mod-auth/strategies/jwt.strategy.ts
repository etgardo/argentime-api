import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '@mod-users/users.service';
import { envNamesConf } from '@_constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private usersService: UsersService,
    private config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>(envNamesConf.JWT_ACCESS_TOKEN_SECRET),
    });
  }

  async validate(payload: any) {
    const { sub: id, user: typeUser } = payload;
    console.log({ id, typeUser });
    return await this.usersService.findOne(id, typeUser);
  }
}
