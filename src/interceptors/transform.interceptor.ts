/**
 * 全局拦截器
 * 在请求成功后统一封装返回体
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DEFAULT_SUCCESS_MESSAGE } from '@/constants/response-message.constant.js';
import { DECORATOR_MESSAGE_KEY } from '@/constants/decorator-key.constant.js';

// 定义标准响应体结构
export interface Response<T> {
  code: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const fromDecorator = this.reflector.getAllAndOverride<string>(
          DECORATOR_MESSAGE_KEY,
          [context.getHandler(), context.getClass()],
        );
        return {
          code: 200,
          message: fromDecorator ?? DEFAULT_SUCCESS_MESSAGE,
          data: (data ?? null) as T,
        };
      }),
    );
  }
}
