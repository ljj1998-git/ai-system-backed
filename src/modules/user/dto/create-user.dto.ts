import { phoneReg } from '@/utils/reg.js';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';

/**
 * 新增用户参数
 */
export const createUserSchema = z.object({
  username: z
    .string()
    .nonempty({ error: '用户名不能为空' })
    .max(30, { error: '用户名不能超过30字' })
    .describe('用户名'),
  password: z
    .string()
    .nonempty({ error: '密码不能为空' })
    .min(6, { error: '密码至少 6 位' })
    .describe('密码'),
  phone: z
    .string()
    .regex(phoneReg, { error: '手机号格式不正确' })
    .optional()
    .describe('手机号'),
  sex: z
    .number()
    .int({ error: '性别值不合法' })
    .min(0, { error: '性别值不合法' })
    .max(2, { error: '性别值不合法' })
    .optional()
    .describe('性别 0男 1女 2未知'),
  email: z
    .email({ error: '邮箱格式不正确' })
    .max(50, { error: '邮箱不能超过50字' })
    .optional()
    .describe('邮箱'),
});

export class CreateUserDto extends createZodDto(createUserSchema) {}
