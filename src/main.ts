import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { TransformInterceptor } from '@/interceptors/transform.interceptor.js';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from '@/configs/swagger.config.js';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 注册全局响应拦截器
  app.useGlobalInterceptors(new TransformInterceptor(app.get(Reflector)));
  // 开启全局验证管道（zod DTO 会自动校验，普通 class DTO 原样透传）
  app.useGlobalPipes(new ZodValidationPipe());
  // 注册 Swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    // 导出的方法名不带前缀
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
      methodKey,
  });
  // 全局添加 Authorization 认证头
  document.security = [{ Authorization: [] }];
  SwaggerModule.setup('apis', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // 刷新页面后保持认证信息
    },
  });
  app.use('/reference', apiReference({ spec: { url: '/apis-json' } }));
  Logger.debug(`Swagger启动成功✌️`);

  await app.listen(process.env.PORT ?? 3000);
  Logger.debug(
    `服务启动成功✌️ 访问路径: http://localhost:${process.env.PORT ?? 3000}`,
  );
}
await bootstrap();
