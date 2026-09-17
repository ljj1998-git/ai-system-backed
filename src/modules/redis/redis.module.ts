import { ProviderNameConstant } from '@/constants/provider-name.constant.js';
import { Global, Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Global() // 声明为全局模块，这样其他地方不用 import 这个模块也能使用
@Module({
  providers: [
    {
      provide: ProviderNameConstant.REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // 从环境变量中获取 Redis 配置
        const host = configService.get('redis.host');
        const port = configService.get('redis.port');
        const password = configService.get('redis.password');
        // 创建 ioredis 实例
        const client = new Redis({
          host,
          port,
          password: password || undefined,
        });

        client.on('connect', () => {
          new Logger(RedisModule.name).debug('Redis连接成功✌️');
        });

        client.on('error', (err) => {
          new Logger(RedisModule.name).error('Redis连接失败:', err);
        });

        return client;
      },
    },
  ],
  // 导出该 Provider，使得其他模块可以注入
  exports: [ProviderNameConstant.REDIS_CLIENT],
})
export class RedisModule {}
