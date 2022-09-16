import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { envNamesConf } from '@_constants';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}
  @Get()
  index(): string {
    const ENV = process.env.NODE_ENV;
    const serverPort = this.configService.get<string>(envNamesConf.SERVER_PORT);
    return `Server is running in port: ${serverPort} (Env ${
      !ENV ? 'default prod' : ENV
    })`;
  }
}
