import { Injectable } from '@nestjs/common';
import { CreateSuscriberDto } from './dto/create-suscriber.dto';
import { UpdateSuscriberDto } from './dto/update-suscriber.dto';

@Injectable()
export class SuscribersService {
  create(createSuscriberDto: CreateSuscriberDto) {
    return 'This action adds a new suscriber';
  }

  findAll() {
    return `This action returns all suscribers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suscriber`;
  }

  update(id: number, updateSuscriberDto: UpdateSuscriberDto) {
    return `This action updates a #${id} suscriber`;
  }

  remove(id: number) {
    return `This action removes a #${id} suscriber`;
  }
}
