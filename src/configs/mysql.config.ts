import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'mysql',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost', // ip
    port: Number(process.env.MYSQL_PORT) || 3306, // 端口
    username: process.env.MYSQL_USER, // 用户名
    password: process.env.MYSQL_PASSWORD, // 密码
    database: process.env.MYSQL_NAME, // 数据库名
    autoLoadEntities: true, // 自动加载 forFeature 注册的实体
    synchronize: false, // 生产环境禁止自动同步表结构
    timezone: '+08:00', // 东八区
  }),
);
