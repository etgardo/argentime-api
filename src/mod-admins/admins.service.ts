import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { requestMessages } from '@_constants';
import { Repository } from 'typeorm';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminEntity } from './entities';
import { AdminFindInterface } from './interfaces';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}

  async findOne(id: number): Promise<AdminEntity> {
    const admin = await this.adminRepository.findOne({
      where: { id: id },
    });
    if (!admin) throw new NotFoundException(requestMessages.DOES_NOT_EXISTS);
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);
    const editAdmin = Object.assign(admin, updateAdminDto);
    const errors = await validate(editAdmin);
    if (errors.length > 0) {
      throw new NotFoundException(errors);
    } else {
      return await this.adminRepository.save(editAdmin);
    }
  }

  async findOneByFields(data: AdminFindInterface) {
    const admin = await this.adminRepository
      .createQueryBuilder('admins')
      .where(data)
      .addSelect('admins.password')
      .getOne();
    if (!admin) throw new NotFoundException(requestMessages.DOES_NOT_EXISTS);
    return admin;
  }
}
