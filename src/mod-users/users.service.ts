import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from '@mod-admins/entities';
import { SuscriberEntity } from '@suscribers/entities';
import { requestMessages } from '@_constants';
import { UserFindInterface } from '@mod-users/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    @InjectRepository(SuscriberEntity)
    private readonly suscriberRepository: Repository<SuscriberEntity>,
  ) {}

  async findOneByFields(data: UserFindInterface, repository: string) {
    let user: UserEntity;
    if (repository === 'suscriber')
      user = await this.suscriberRepository
        .createQueryBuilder('suscribers')
        .where(data)
        .addSelect('suscribers.password')
        .getOne();
    else if (repository === 'admin')
      user = await this.adminRepository
        .createQueryBuilder('admins')
        .where(data)
        .addSelect('admins.password')
        .getOne();
    if (!user) throw new NotFoundException(requestMessages.DOES_NOT_EXISTS);
    return user;
  }
}
