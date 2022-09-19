import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/*import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import * as winston from 'winston';*/
import { AppModule } from '@app.module';
import { requestMessages, envNamesConf } from '@_constants';
import { setDefaultAdmin } from '@config';

//const logtail = new Logtail('ZaVvwyjaJ2M34yih43Zng9Zm');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, /*{
    logger: WinstonModule.createLogger({
      transports: [new LogtailTransport(logtail)],
    }),
  },*/
  );
  const config = app.get(ConfigService);
  const logger = new Logger();
  const ENV = process.env.NODE_ENV;
  const port =
    parseInt(config.get<string>(envNamesConf.SERVER_PORT), 10) || 3000;
  setDefaultAdmin(config);
  await app.listen(port);
  logger.log(
    `${requestMessages.SERVER_RUNNIG} ${await app.getUrl()} (Env ${
      !ENV ? 'default prod' : ENV
    })`,
  );
}
bootstrap();
