import { SECRET } from '@/configs/jwt.config.js';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface IAuthUser {
  userId: number;
  /** 过期时间 */
  exp?: number;
  /** 签发时间 */
  iat?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    // passport-jwt 必须配置提取令牌规则、密钥、过期校验开关
    super({
      // 1. 令牌提取规则：标准 Authorization: Bearer xxx
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 2. 密钥：和JwtModule签名密钥保持一致
      secretOrKey: SECRET,
      // 3. 是否自动忽略过期token，默认false（过期直接401，无需手动判断）
      ignoreExpiration: false,
    });
  }

  /**
   * 核心校验生命周期
   * Passport 底层完成凭证提取（拿账号密码 / 解析 JWT）且格式合法后，自动执行该方法，等价于原生 Passport 的 verify 回调。
   */
  async validate(payload: IAuthUser) {
    return { userId: payload.userId };
  }
}
