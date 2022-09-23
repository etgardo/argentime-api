import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersService } from '@mod-users';
import { UserEntity } from '@mod-users/entities';
import { envNamesConf, requestMessages } from '@_constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
    typeUser: string,
  ): Promise<any> {
    const admin = await this.usersService.findOneByFields({ email }, typeUser);
    if (admin && (await compare(pass, admin.password))) {
      //remove password atribute and return rest atributtes.
      const { password, ...rest } = admin;
      return rest;
    }
    return null;
  }

  async login(user: UserEntity, typeUser: string) {
    const { id } = user;
    //const payload = { sub: id };
    const tokens = await this.getTokens(id);
    user.refreshToken = await this.updateRefreshToken(
      id,
      tokens.refreshToken,
      typeUser,
    );
    return {
      user,
      //accessToken: this.jwtService.sign(payload), //cuando solo se generaba un token
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      typeUser,
    };
  }

  async getTokens(userId: number) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: this.configService.get<string>(
            envNamesConf.JWT_ACCESS_TOKEN_SECRET,
          ),
          expiresIn: this.configService.get<string>(
            envNamesConf.JWT_ACCESS_TOKEN_EXPIRE,
          ),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: this.configService.get<string>(
            envNamesConf.JWT_REFRESH_TOKEN_SECRET,
          ),
          expiresIn: this.configService.get<string>(
            envNamesConf.JWT_REFRESH_TOKEN_EXPIRE,
          ),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
    typeUser: string,
  ) {
    const hashToken = await hash(refreshToken, 10);
    const userUpdated = await this.usersService.updateRefreshToken(
      userId,
      hashToken,
      typeUser,
    );
    return userUpdated.refreshToken;
  }
}
