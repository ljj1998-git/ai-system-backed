import { ResponseMessage } from '@/constants/response-message.constant.js';
import { Users } from '@/entities/Users.js';
import { BusinessException } from '@/exceptions/business.exception.js';
import { ThrowUtils } from '@/utils/index.js';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  /**
   * 创建新用户
   */
  async createUser(createUserDto: CreateUserDto) {
    const { username, password, systemId } = createUserDto;
    const existing = await this.usersRepository.findOne({
      where: { username, systemId },
    });
    ThrowUtils.throwIf(existing, new BusinessException(ResponseMessage.usernameExists));

    const hashedPassword = await bcrypt.hash(password, 10);
    this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  /**
   * 根据用户名查询用户
   */
  async getUserByUsername(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username },
    });
    if (!user) throw new BusinessException(ResponseMessage.userNotFound);
    return user;
  }
}
