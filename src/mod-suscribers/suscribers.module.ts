import { Module } from '@nestjs/common';
import { SuscribersService } from './suscribers.service';
import { SuscribersController } from './suscribers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuscriberEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([SuscriberEntity])],
  controllers: [SuscribersController],
  providers: [SuscribersService],
  exports: [SuscribersService],
})
export class SuscribersModule {}
