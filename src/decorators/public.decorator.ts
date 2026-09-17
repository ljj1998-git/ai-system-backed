import { SetMetadata } from '@nestjs/common';
import { DECORATOR_PUBLIC_KEY } from '@/constants/decorator-key.constant.js';

/**
 * 标记接口无需携带有效 Token（如登录、注册）
 * 等价于调用 Reflect.defineMetadata(IS_PUBLIC_KEY, true, target) ，把键值对写入目标类的元数据中。
 * 在路由上用 @Public() → 设置 IS_PUBLIC_KEY = true 的元数据
 */
export const Public = () => SetMetadata(DECORATOR_PUBLIC_KEY, true);
