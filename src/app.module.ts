import {
  InternalServerErrorException,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@app.controller';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { envNamesConf } from '@_constants';
import { LoggerMiddleware } from '@middlewares';
import { AuthModule } from '@mod-auth/auth.module';

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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
