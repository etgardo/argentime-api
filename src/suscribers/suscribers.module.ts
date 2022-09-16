import { Module } from '@nestjs/common';
import { SuscribersService } from './suscribers.service';
import { SuscribersController } from './suscribers.controller';

@Module({
  controllers: [SuscribersController],
  providers: [SuscribersService]
})
export class SuscribersModule {}
