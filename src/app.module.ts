import { InternalServerErrorException, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@app.controller';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { CategoriesModule } from './categories/categories.module';
import { SuscribersModule } from './suscribers/suscribers.module';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { BannersModule } from './banners/banners.module';
import { CheckoutModule } from './checkout/checkout.module';

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
    CategoriesModule,
    SuscribersModule,
    ArticlesModule,
    CommentsModule,
    BannersModule,
    CheckoutModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
