import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { envConfigModule } from '@/configs/env-config.module.js';
import { AuthModules } from '@/modules/auth/auth.module.js';
import { AllExceptionsFilter } from '@/filters/all-exceptions.filter.js';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard.js';
import { winstonConfigModule } from '@/configs/winston.module.js';
import { RedisModule } from '@/modules/redis/redis.module.js';
import { UserModule } from './modules/user/user.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    envConfigModule,
    // 建立数据库连接，配置来源为 mysql.config.ts 的 registerAs 命名空间
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.getOrThrow('mysql'),
    }),
    winstonConfigModule,

    AuthModules,
    RedisModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    /** 全局异常捕获 */
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    /** jwt守卫 */
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
