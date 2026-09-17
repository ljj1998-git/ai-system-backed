import { registerAs } from '@nestjs/config';

export default registerAs('mysql', () => {
  return {
    host: process.env.MYSQL_HOST || 'localhost', // ip
    port: process.env.MYSQL_PORT || 3306, // 端口
    username: process.env.MYSQL_USER, // 用户名
    password: process.env.MYSQL_PASSWORD, // 密码
    database: process.env.MYSQL_NAME, // 数据库名
  };
});
