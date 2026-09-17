import { Controller } from '@nestjs/common';
import { UserService } from './user.service.js';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
