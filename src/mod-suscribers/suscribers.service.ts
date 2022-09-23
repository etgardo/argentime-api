import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { requestMessages } from '@_constants';
import { SuscriberEntity } from './entities';
import { UpdateSuscriberDto } from './dto/update-suscriber.dto';
import { SuscriberFindInterface } from './interfaces';

@Injectable()
export class SuscribersService {
  constructor(
    @InjectRepository(SuscriberEntity)
    private readonly suscribersRepository: Repository<SuscriberEntity>,
  ) {}

  async findOne(id: number): Promise<SuscriberEntity> {
    const admin = await this.suscribersRepository.findOne({
      where: { id: id },
    });
    if (!admin) throw new NotFoundException(requestMessages.DOES_NOT_EXISTS);
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateSuscriberDto) {
    const admin = await this.findOne(id);
    const editAdmin = Object.assign(admin, updateAdminDto);
    const errors = await validate(editAdmin);
    if (errors.length > 0) {
      throw new NotFoundException(errors);
    } else {
      return await this.suscribersRepository.save(editAdmin);
    }
  }

  async findOneByFields(data: SuscriberFindInterface) {
    const admin = await this.suscribersRepository
      .createQueryBuilder('admins')
      .where(data)
      .addSelect('admins.password')
      .getOne();
    if (!admin) throw new NotFoundException(requestMessages.DOES_NOT_EXISTS);
    return admin;
  }
}
