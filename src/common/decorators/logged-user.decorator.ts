/**
 * decorator to get the logged in user from the request
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const LoggedUserDec = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const userLoggedIn = request.user;
    //console.log({ userLoggedIn });
    return data ? userLoggedIn && userLoggedIn[data] : userLoggedIn;
  },
);
