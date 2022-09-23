import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminsModule } from '@mod-admins/admins.module';
import { SuscribersModule } from '@mod-suscribers/suscribers.module';

@Module({
  imports: [AdminsModule, SuscribersModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
