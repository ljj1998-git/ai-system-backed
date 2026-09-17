import { ResponseMessage } from '@/constants/response-message.constant.js';
import { Users } from '@/entities/Users.js';
import { BusinessException } from '@/exceptions/business.exception.js';
import { ThrowUtils } from '@/utils/index.js';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  // /**
  //  * 创建新用户
  //  * @param createUserDto 创建用户的数据传输对象
  //  */
  // async createUser(createUserDto: CreateUserDto) {
  //   const { username, password, systemId } = createUserDto;
  //   const existing = await this.usersRepository.findOne({
  //     where: { username, systemId },
  //   });
  //   ThrowUtils.throwIf(
  //     existing,
  //     new BusinessException(ResponseMessage.usernameExists),
  //   );

  //   // const hashedPassword = await bcrypt.hash(password, 10);
  //   // await this.prisma.client.users.create({
  //   //   data: { ...createUserDto, password: hashedPassword },
  //   // });
  // }
}
