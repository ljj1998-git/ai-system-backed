import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('系统后台Api文档')
  .setDescription('系统后台Api文档')
  .setVersion('1.0')
  .addTag('系统后台Api文档')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
    },
    'Authorization',
  )
  .setExternalDoc('下载JSON', '/apis-json') // 开启下载json功能
  .build();
