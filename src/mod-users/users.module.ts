import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { SuscriberEntity } from '@suscribers/entities';
import { AdminEntity } from '@mod-admins/entities';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity, SuscriberEntity])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
