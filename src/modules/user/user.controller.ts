import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service.js';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResult } from '@/decorators/api-result.decorator.js';
import { ResponseMessage } from '@/constants/response-message.constant.js';
import { CreatorPipe } from '@/pipes/creator.pipe.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserVo } from './vo/user.vo.js';
import { ZodResponse } from 'nestjs-zod';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '新增用户' })
  @Post()
  @ApiResult({ message: ResponseMessage.createUserSuccess })
  async createUser(@Body(CreatorPipe) createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
