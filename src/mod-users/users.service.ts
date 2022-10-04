import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities';
import { requestMessages } from '@_constants';
import { UserFindInterface } from '@mod-users/interfaces';
import { AdminsService } from '@mod-admins/admins.service';
import { SuscribersService } from '@mod-suscribers/suscribers.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly suscribersService: SuscribersService,
  ) {}

  async findOneByFields(data: UserFindInterface, typeUser: string) {
    let user: UserEntity;
    if (typeUser === 'suscriber')
      user = await this.suscribersService.findOneByFields(data);
    else if (typeUser === 'admin')
      user = await this.adminsService.findOneByFields(data);
    if (!user) throw new NotFoundException(requestMessages.DOES_NOT_EXISTS);
    return user;
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
    typeUser: string,
  ): Promise<UserEntity> {
    let userUpdated: UserEntity;
    if (typeUser === 'admin')
      userUpdated = await this.adminsService.update(userId, {
        refreshToken,
      });
    else if (typeUser === 'suscriber')
      userUpdated = await this.suscribersService.update(userId, {
        refreshToken,
      });

    if (!userUpdated)
      throw new NotFoundException(requestMessages.DOES_NOT_EXISTS);
    return userUpdated;
  }

  async findOne(id: number, typeUser: string): Promise<UserEntity> {
    let user: UserEntity;
    if (typeUser === 'admin') user = await this.adminsService.findOne(id);
    else if (typeUser === 'suscriber')
      user = await this.suscribersService.findOne(id);
    return user;
  }
}
