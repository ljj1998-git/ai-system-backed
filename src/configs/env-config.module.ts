import { ConfigModule } from '@nestjs/config';
import mysqlConfig from './mysql.config.js';
import redisConfig from "./redis.config.js";

export const envConfigModule = ConfigModule.forRoot({
  isGlobal: true, // 设为全局模块，这样其他模块不需要重复 import ConfigModule
  envFilePath: ['.env'], // 指定环境变量文件
  load: [mysqlConfig,redisConfig],
});
