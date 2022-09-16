import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '@app.module';
import { requestMessages, envNamesConf } from '@_constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const logger = new Logger();
  const ENV = process.env.NODE_ENV;
  const port =
    parseInt(config.get<string>(envNamesConf.SERVER_PORT), 10) || 3000;
  await app.listen(port);
  logger.log(
    `${requestMessages.SERVER_RUNNIG} ${await app.getUrl()} (Env ${
      !ENV ? 'default prod' : ENV
    })`,
  );
}
bootstrap();
