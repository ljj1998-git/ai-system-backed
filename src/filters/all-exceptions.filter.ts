/**
 * 全局异常过滤器
 * 本过滤器用于统一处理应用中抛出的所有异常类型（包括参数校验、数据库查询、自定义业务异常等），
 * 并将其标准化后返回给客户端，提升服务健壮性与用户体验。
 */

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { BusinessException } from '@/exceptions/business.exception.js';

import { ErrorEnum } from '@/constants/error-code.constant.js';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';
import { isDev } from '@/utils/env.js';

/**
 * 自定义错误对象接口，用于类型安全地访问状态码和消息
 */
interface myError {
  readonly status: number;
  readonly statusCode?: number;
  readonly message?: string;
}

interface IBaseResponse<T = any> {
  message: string;
  code: number;
  data?: T;
}

/**
 * 全局异常过滤器类，实现 ExceptionFilter 接口。
 * 捕获所有未处理的异常，并按设定格式响应客户端。
 */
@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly winstonLogger: WinstonLogger,
  ) {}

  /**
   * 捕获所有异常的主方法
   * @param exception 捕获到的异常对象
   * @param host      当前上下文（封装了 HTTP/Websocket/RPC 参数）
   */
  catch(exception: any, host: ArgumentsHost) {
    // 获取 HTTP 上下文对象
    const ctx = host.switchToHttp();

    // 获取 response 和 request 对象
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const url = request.url;

    // 解析异常的 HTTP 状态码和错误消息
    const status = this.getStatus(exception);
    let message = this.getErrorMessage(exception);

    // 针对 500 内部错误并非业务异常的场景做特殊日志&消息处理
    if (
      status === HttpStatus.INTERNAL_SERVER_ERROR &&
      !(exception instanceof BusinessException)
    ) {
      this.winstonLogger.error(this.formatErrorLog(exception, request, status));

      // 生产环境隐藏具体错误详情，仅显示通用服务器错误信息
      if (!isDev) message = ErrorEnum.SERVER_ERROR?.split(':')[1];
    } else {
      // 其他异常做警告日志
      this.logger.warn(
        `错误信息：(${status}) ${message} 接口路径: ${decodeURI(url)}`,
      );
    }

    // 解析错误码：若为业务异常，采用其定义的错误码，否则用 HTTP 状态码
    const apiErrorCode =
      exception instanceof BusinessException
        ? exception.getErrorCode()
        : status;

    // 构造标准响应体格式
    const resBody: IBaseResponse = {
      code: apiErrorCode,
      message,
      data: null,
    };

    // 设置 HTTP 响应状态码并返回标准响应体
    response.status(status).send(resBody);
  }

  /**
   * 提取异常对象对应的 HTTP 状态码
   * @param exception 异常对象
   * @returns number HTTP 状态码
   */
  getStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    // else if (exception instanceof QueryFailedError) {
    //   // TypeORM 查询失败异常统一返回 500
    //   return HttpStatus.INTERNAL_SERVER_ERROR;
    // }
    else {
      // 自定义异常或未知对象，尝试从 status/statusCode 字段获取，否则默认 500
      return (
        (exception as myError)?.status ??
        (exception as myError)?.statusCode ??
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * 提取异常对象的错误消息
   * @param exception 异常对象
   * @returns string   标准错误描述
   */
  getErrorMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      // 由于 ValidationPipe 是由 NestJS 底层抛出的 HttpException,所以400的信息要单独处理
      const response = exception.getResponse();
      const status = exception.getStatus();
      // 处理 400
      if (status === HttpStatus.BAD_REQUEST) {
        const msg = (response as any).errors ?? [];
        return msg.length > 0 ? msg[0].message : '';
      }
      return exception.message;
    } else {
      // 优先从 response.message 拿，否则尝试取 message 字段，最后转字符串
      const raw =
        (exception as any)?.response?.message ??
        (exception as myError)?.message ??
        `${exception as string}`;
      if (Array.isArray(raw)) {
        return raw.length > 0 ? String(raw[0]) : '';
      }
      return raw as string;
    }
  }

  /**
   * 格式化错误日志信息
   */
  private formatErrorLog(exception: any, request: Request, status: number) {
    if (exception.name == 'PrismaClientKnownRequestError') {
      return {
        url: decodeURI(request.url),
        message: exception.meta.driverAdapterError.cause.originalMessage,
        body: request.body,
        query: request.query,
        context: {
          method: request.method,
          statusCode: status,
          ip: request.ip,
        },
      };
    }
    return {
      message: (exception as any)?.message,
      context: {
        method: request.method,
        url: decodeURI(request.url),
        statusCode: status,
        ip: request.ip,
        body: request.body,
        query: request.query,
      },
    };
  }
}
