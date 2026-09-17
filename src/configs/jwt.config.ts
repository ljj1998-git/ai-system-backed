/**
 * jwt相关配置
 */

/** JWT 密钥 长度32字节，使用密码学安全的随机字符生成 */
export const SECRET =
  '7a2f9d4c1e8b35609c7a2f8d4e1b3c6a8f9d2e4c7b1a3f5d8c9e2b4a7f1c3d5';
/** 访问令牌有效期 (JWT 签名使用) */
export const ACCESS_TOKEN_EXPIRES_IN_JWT = '1h';
/** 访问令牌有效期 (Redis 过期时间，秒数) */
export const ACCESS_TOKEN_EXPIRES_IN_REDIS = 3600;
/** 刷新令牌有效期天数 */
export const REFRESH_TOKEN_EXPIRES_IN = 24 * 60 * 60 * 7;
