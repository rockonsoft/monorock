import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { AppUser } from '@monorock/api-interfaces';

export class GetInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    console.log('GetInterceptor');
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const args = context.getArgs();
    console.log(`args have -  ${args.length}`);
    const inmsg: any = args[0];
    const user: AppUser = inmsg.user;
    console.log(user);

    return next.handle();
  }
}
