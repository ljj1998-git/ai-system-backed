import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { z } from 'zod';
import { ResponseMessage } from '../../constants/response-message.constant.js';
import { Users } from '../../entities/Users.js';
import { BusinessException } from '../../exceptions/business.exception.js';
import { CreateUserDto, createUserDtoSchema } from './dto/create-user.dto.js';
import { UserService } from './user.service.js';

describe('UserService', () => {
  let service: UserService;
  let usersRepository: {
    findOne: ReturnType<typeof vi.fn>; // vi.fn 造一个假的函数（mock function），本身不干任何事，只是把"谁调用了我、传了什么参数、调用了几次"全记下来，并且可以让你指定返回值。
  };

  const validPayload = {
    username: 'admin',
    password: '123456',
    systemId: 1,
  };

  function firstErrorOf(payload: unknown) {
    const result = createUserDtoSchema.safeParse(payload);
    if (result.success) return undefined;
    return result.error.issues[0];
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(Users),
          useValue: { findOne: vi.fn() },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    usersRepository = module.get(getRepositoryToken(Users));
  });
  // service
  it('检查服务是否存在', () => expect(service).toBeDefined());
  // createUser
  describe('【createUser】DTO 参数校验', () => {
    it('1.合法参数应能通过校验', () => {
      expect(createUserDtoSchema.safeParse(validPayload).success).toBe(true);
    });

    it('2.合法参数携带可选字段时应能通过校验', () => {
      const result = createUserDtoSchema.safeParse({
        ...validPayload,
        phone: '13800138000',
        sex: 1,
        email: 'admin@example.com',
        roleId: 2,
      });
      expect(result.success).toBe(true);
    });

    it('3.systemId 为字符串时应被强制转换为数字', () => {
      const result = createUserDtoSchema.safeParse({
        ...validPayload,
        systemId: '10',
      });
      expect(result.success).toBe(true);
      expect(result.data?.systemId).toBe(10);
    });

    it.each([
      [
        '4.缺少 username',
        { ...validPayload, username: undefined },
        'Invalid input: expected string',
      ],
      [
        '5.username 为空字符串',
        { ...validPayload, username: '' },
        '用户名不能为空',
      ],
      [
        '6.username 超过 30 字',
        { ...validPayload, username: 'a'.repeat(31) },
        '用户名不能超过30字',
      ],
      [
        '7.缺少 password',
        { ...validPayload, password: undefined },
        'Invalid input: expected string',
      ],
      [
        '8.password 少于 6 位',
        { ...validPayload, password: '12345' },
        '密码至少 6 位',
      ],
      [
        '9.phone 格式不正确',
        { ...validPayload, phone: '12345' },
        '手机号格式不正确',
      ],
      [
        '10.sex 取值不在 0/1/2 内',
        { ...validPayload, sex: 5 },
        '性别值只能是 0男 1女 2未知',
      ],
      [
        '11.email 格式不正确',
        { ...validPayload, email: 'not-an-email' },
        '邮箱格式不正确',
      ],
      [
        '12.email 超过 50 字',
        { ...validPayload, email: `${'a'.repeat(45)}@qq.com` },
        '邮箱不能超过50字',
      ],
      [
        '13.缺少 systemId',
        { ...validPayload, systemId: undefined },
        'Invalid input',
      ],
      [
        '14.systemId 不是整数',
        { ...validPayload, systemId: 1.5 },
        '系统ID必须为整数',
      ],
      [
        '15.systemId 无法转换为数字',
        { ...validPayload, systemId: 'abc' },
        'Invalid input',
      ],
    ])('%s 应抛出校验错误', (_title, payload, expectedMessage) => {
      const issue = firstErrorOf(payload);
      expect(issue).toBeDefined();
      expect(issue!.message).toContain(expectedMessage);
    });
  });

  describe('【createUser】业务参数处理', () => {
    it('用户名已存在时应抛出 BusinessException', async () => {
      usersRepository.findOne.mockResolvedValue({ userId: 1 });

      await expect(service.createUser(validPayload)).rejects.toThrow(
        BusinessException,
      );
      await expect(service.createUser(validPayload)).rejects.toThrow(
        ResponseMessage.usernameExists,
      );
    });

    it('应按 username + systemId 查询是否已存在', async () => {
      await service.createUser(validPayload);

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: {
          username: validPayload.username,
          systemId: validPayload.systemId,
        },
      });
    });

    it('用户名不存在时不应抛出异常', async () => {
      await expect(service.createUser(validPayload)).resolves.toBeUndefined();
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('应接受 CreateUserDto 实例作为参数', async () => {
      const dto = Object.assign(
        new CreateUserDto(),
        validPayload,
      ) as CreateUserDto;

      await expect(service.createUser(dto)).resolves.toBeUndefined();
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
