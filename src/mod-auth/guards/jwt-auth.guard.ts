import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { requestMessages, envNamesConf } from '@_constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {
    super();
  }

  handleRequest(err: any, user: any, info: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      console.log({ info, err });
      throw (
        err || new UnauthorizedException(requestMessages.DOES_NOT_AUTHENTICATED)
      );
    }
    return user;
  }

  canActivate(context: ExecutionContext) {
    const blocked = JSON.parse(
      this.configService.get<string>(envNamesConf.JWT_BLOCK_ALL),
    );
    if (blocked)
      throw new UnauthorizedException(requestMessages.ALL_ACCESS_BLOCKED);

    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    return super.canActivate(context);
  }
}
