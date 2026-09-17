import { Inject, Injectable } from '@nestjs/common';
// import { UserService } from "../user/user.service";
// import * as bcrypt from "bcrypt";
// import { JwtService } from "@nestjs/jwt";
// import { TokenService } from "./services/token.service";
// import { ProviderNameConstant } from "@/common/constant/provider-name.constant";
// import Redis from "ioredis";
// import { ACCESS_TOKEN_EXPIRES_IN_JWT, REFRESH_TOKEN_EXPIRES_IN, ACCESS_TOKEN_EXPIRES_IN_REDIS } from "@/configs/jwt.config";
// import { BusinessException } from "@/common/exception/business.exception";
// import { ErrorEnum } from "@/common/constant/error-code.constant";
// import { plainToInstance } from "class-transformer";
// import { SignInVo } from "./vo/signIn.vo";
import { SignInDto } from './dto/signIn.dto.js';
import { SignInVo } from './vo/signIn.vo.js';
// import { ResponseMessage } from "@/common/constant/response-message.constant";
// import { DictService } from "@/modules/dict/dict.service";
// import { MenuService } from "@/modules/menu/menu.service";

@Injectable()
export class AuthService {
  constructor(
    // private usersService: UserService,
    // private tokenService: TokenService,
    // private dictService: DictService,
    // private menuService: MenuService,
    // @Inject(ProviderNameConstant.REDIS_CLIENT)
    // private readonly redisClient: Redis,
  ) {}

  /**
   * 用户登录
   * @param {SignInDto} signInDto
   * @returns 登录成功后的用户信息
   */
  async signIn(signInDto: SignInDto) {
    const { username, password, systemId } = signInDto;
    // const user = await this.usersService.getUserByUsername(username);
    // if (user.systemId !== systemId) {
    //   throw new BusinessException(ResponseMessage.systemNotMatchUser);
    // }

    // const passOk = await bcrypt.compare(password, user.password || "");
    // if (!passOk) {
    //   throw new BusinessException(ErrorEnum.INVALID_USERNAME_PASSWORD);
    // }
    // const payload: IAuthUser = { userId: user.userId };
    // const { accessToken, refreshToken } = await this.tokenService.generateTokens(payload, ACCESS_TOKEN_EXPIRES_IN_JWT);
    // // token 双向映射存入 Redis
    // await this.redisClient.set(accessToken, refreshToken, "EX", ACCESS_TOKEN_EXPIRES_IN_REDIS);
    // await this.redisClient.set(refreshToken, accessToken, "EX", REFRESH_TOKEN_EXPIRES_IN);

    // const [dictTree, menuTree, perms, role] = await Promise.all([
    //   this.dictService.getDictTree({ systemId }),
    //   this.menuService.getMenuTreeByRoleId(user.roleId!),
    //   this.menuService.getButtonPermsByRoleId(user.roleId!),
    //   user.roleId != null ? this.prisma.client.roles.findFirst({ where: { roleId: user.roleId } }) : Promise.resolve(null),
    // ]);

    // return plainToInstance(SignInVo, { ...user, roleName: role?.roleName ?? null, accessToken, refreshToken, dictTree, menuTree, perms }, { excludeExtraneousValues: true, enableImplicitConversion: true });
  }

  // async signOut(token: string) {
  //   const refreshToken = await this.redisClient.get(token);
  //   if (refreshToken) {
  //     await this.redisClient.del(refreshToken);
  //   }
  //   await this.redisClient.del(token);
  // }

  // async refreshTokens(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
  //   let payload: { userId: string };
  //   try {
  //     payload = await this.tokenService.verifyToken(refreshToken);
  //   } catch {
  //     throw new BusinessException(ResponseMessage.refreshTokenInvalid);
  //   }
  //   const oldAccessToken = await this.redisClient.get(refreshToken);
  //   if (!oldAccessToken) {
  //     throw new BusinessException(ResponseMessage.refreshTokenInvalid);
  //   }
  //   await this.redisClient.del(refreshToken);
  //   await this.redisClient.del(oldAccessToken);
  //   const { accessToken, refreshToken: newRefreshToken } = await this.tokenService.generateTokens({ userId: payload.userId }, ACCESS_TOKEN_EXPIRES_IN_JWT);
  //   await this.redisClient.set(accessToken, newRefreshToken, "EX", ACCESS_TOKEN_EXPIRES_IN_REDIS);
  //   await this.redisClient.set(newRefreshToken, accessToken, "EX", REFRESH_TOKEN_EXPIRES_IN);
  //   return { accessToken, refreshToken: newRefreshToken };
  // }
}
