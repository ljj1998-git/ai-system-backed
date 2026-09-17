import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignInDto } from './dto/signIn.dto.js';
// import { RefreshTokenDto } from './dto/refreshToken.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@/decorators/public.decorator.js';
import { SignInVo } from './vo/signIn.vo.js';
import { ResponseMessage } from '@/constants/response-message.constant.js';
import { ApiResult } from '@/decorators/api-result.decorator.js';

@ApiTags('认证模块')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: '登录' })
  @Post('/signIn')
  @ApiResult({ message: ResponseMessage.signInSuccess, type: SignInVo })
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  // @Public()
  // @ApiOperation({ summary: "退出登录" })
  // @Post("/signOut")
  // @ApiResult({ message: ResponseMessage.signOutSuccess })
  // async signOut(@Req() request: RequestWithAccessToken) {
  //   return this.authService.signOut(request.accessToken);
  // }

  // @Public()
  // @ApiOperation({ summary: "刷新令牌" })
  // @Post("/refreshToken")
  // @ApiResult({ message: ResponseMessage.refreshTokenSuccess, type: String })
  // async refreshToken(@Body() dto: RefreshTokenDto): Promise<{ accessToken: string; refreshToken: string }> {
  //   return this.authService.refreshTokens(dto.refreshToken);
  // }
}
