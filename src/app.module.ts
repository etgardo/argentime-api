import { InternalServerErrorException, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from '@app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { CategoriesModule } from './categories/categories.module';
import { SuscribersModule } from './suscribers/suscribers.module';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { BannersModule } from './banners/banners.module';
import { CheckoutModule } from './checkout/checkout.module';
import { AdminsModule } from './admins/admins.module';
import { envNamesConf } from '@_constants';

const ENV = process.env.NODE_ENV;
const envFilePath = resolve(
  process.cwd(),
  'envs',
  !ENV ? '.env' : `.env.${ENV}`,
);
if (!existsSync(envFilePath))
  throw new InternalServerErrorException(
    `Error load env file -> ${envFilePath}`,
  );

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>(envNamesConf.DATABASE_HOST),
        port: parseInt(config.get<string>(envNamesConf.DATABASE_PORT), 10),
        username: config.get<string>(envNamesConf.DATABASE_USER),
        password: config.get<string>(envNamesConf.DATABASE_PASSWORD),
        database: config.get<string>(envNamesConf.DATABASE_NAME),
        entities: [
          __dirname + './**/**/*entity{.ts,.js}',
          __dirname + './common/entities/*entity{.ts,.js}',
        ],
        autoLoadEntities: true,
        synchronize: true,
        loggin: true,
        logger: 'file',
      }),
    }),
    CategoriesModule,
    SuscribersModule,
    ArticlesModule,
    CommentsModule,
    BannersModule,
    CheckoutModule,
    AdminsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
