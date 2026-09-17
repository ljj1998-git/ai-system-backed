import { REFRESH_TOKEN_EXPIRES_IN } from '@/configs/jwt.config.js';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  /**
   * 使用给定的 payload 和过期时间生成 JWT 签名
   * @param payload - 用于生成签名的有效载荷
   * @param expiresIn - 签名的有效期
   * @returns 生成的 JWT 字符串
   */
  async generateSign(payload: any, expiresIn: any): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn,
    });
  }

  /**
   * 生成访问令牌和刷新令牌
   * @param payload - 用于生成令牌的有效载荷
   * @param expiresIn - 访问令牌的有效期
   * @returns 包含访问令牌和刷新令牌的对象
   */
  async generateTokens(payload: any, expiresIn: any) {
    // 生成访问令牌
    const accessToken = await this.generateSign(payload, expiresIn);
    // 生成刷新令牌，有效期为 JwtConfig.REFRESH_TOKEN_EXPIRES_IN
    const refreshToken = await this.generateSign(
      payload,
      REFRESH_TOKEN_EXPIRES_IN,
    );
    // 返回包含 accessToken 和 refreshToken 的对象
    return { accessToken, refreshToken };
  }

  /** 验证 token 并返回 payload */
  async verifyToken<T extends Record<string, any> = any>(
    token: string,
  ): Promise<T> {
    return await this.jwtService.verifyAsync<T>(token);
  }
}
