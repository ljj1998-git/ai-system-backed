import { createZodDto } from 'nestjs-zod';
import z from 'zod';

/**
 * 用户登录请求参数
 */
export const signInSchema = z.object({
  /** 用户名 */
  username: z.string().nonempty({ error: '用户名不能为空' }).describe('用户名'),

  /** 密码 */
  password: z.string().nonempty({ error: '密码不能为空' }).describe('密码'),

  /** 系统ID */
  systemId: z.coerce.number({ error: '未选择系统' }).int().describe('系统ID'),
});

export class SignInDto extends createZodDto(signInSchema) {}
