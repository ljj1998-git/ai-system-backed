import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { envConfigModule } from '@/configs/env-config.module.js';
import { AuthModules } from '@/modules/auth/auth.module.js';
import { AllExceptionsFilter } from '@/filters/all-exceptions.filter.js';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard.js';
import { winstonConfigModule } from '@/configs/winston.module.js';
import { RedisModule } from '@/modules/redis/redis.module.js';

@Module({
  imports: [envConfigModule, winstonConfigModule, AuthModules, RedisModule],
  controllers: [],
  providers: [
    /** 全局异常捕获 */
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    /** jwt守卫 */
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
