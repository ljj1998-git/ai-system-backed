import { DECORATOR_PUBLIC_KEY } from '@/constants/decorator-key.constant.js';
import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import _ from 'lodash';
import { ProviderNameConstant } from '@/constants/provider-name.constant.js';
import { Redis } from 'ioredis';
import { ErrorEnum } from '@/constants/error-code.constant.js';

/**
 * JWT 认证守卫
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    @Inject(ProviderNameConstant.REDIS_CLIENT)
    private readonly redisClient: Redis,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    // 判断是否有 @Public 装饰器
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      DECORATOR_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    //
    const request = context.switchToHttp().getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    let result: any = false;
    try {
      const sessionOk = await this.redisClient.exists(token!);
      if (!sessionOk) {
        throw new UnauthorizedException(ErrorEnum.INVALID.split(':')[1]);
      }
      result = await super.canActivate(context);
      // 设置 accessToken 到请求对象
      request.accessToken = token;
    } catch (error) {
      // 如果有 @Public 装饰器，直接返回 true
      if (isPublic) return true;
      // token为空的情况
      if (_.isEmpty(token))
        throw new UnauthorizedException(ErrorEnum.INVALID.split(':')[1]);
      // token无效的情况
      if (error instanceof UnauthorizedException)
        throw new UnauthorizedException(ErrorEnum.INVALID.split(':')[1]);
    }
    return result;
  }

  handleRequest(err: any, user: any) {
    if (err || !user) throw err || new UnauthorizedException();
    return user;
  }
}
