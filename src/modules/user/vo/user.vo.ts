import { createZodDto } from 'nestjs-zod';
import z from 'zod';

/**
 * 用户信息返回体
 * 通过 z.object 显式声明字段，避免密码等敏感字段外泄
 */
export const userSchema = z.object({
  userId: z.number().describe('用户ID'),
  systemId: z.number().nullable().describe('所属系统ID'),
  username: z.string().nullable().describe('用户名'),
  roleId: z.number().nullable().describe('角色ID'),
  isSuper: z.number().nullable().describe('超级管理员 0是 1否'),
  phone: z.string().nullable().describe('电话号码'),
  avatar: z.string().nullable().describe('头像'),
  sex: z.literal([0, 1, 2], { error: '性别值只能是 0男 1女 2未知' }).describe('性别 0男 1女 2未知'),
  email: z.string().nullable().describe('邮箱地址'),
  createBy: z.number().nullable().describe('创建人'),
  updateBy: z.number().nullable().describe('修改人'),
  createTime: z.date().nullable().describe('创建时间'),
  updateTime: z.date().nullable().describe('修改时间'),
});

export class UserVo extends createZodDto(userSchema) {}
