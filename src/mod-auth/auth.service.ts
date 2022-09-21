import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from '@mod-users';
import { UserEntity } from '@mod-users/entities';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

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

  async login(admin: UserEntity, typeUser: string) {
    const { id } = admin;
    //const payload = { sub: id };
    const tokens = await this.getTokens(id);
    return {
      //accessToken: this.jwtService.sign(payload), //cuando solo se generaba un token
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      typeUser,
    };
  }

  async getTokens(userId: number) {
    return {
      accessToken: 'accessToken-' + userId,
      refreshToken: 'refreshToken-' + userId,
    };
  }
}
