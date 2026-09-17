import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { SignInDto } from './dto/signIn.dto.js';

interface IDto {
  signInDto: SignInDto;
}

describe('AuthController', () => {
  let authController: AuthController;
  const dto: IDto = {
    signInDto: {
      systemId: 1,
      username: 'llj',
      password: '$2a$10$UHk4SMvD0BPXYhRJsTSGQeZ3E5acyFgx0XH846atSOnXNFVCFml1K',
    },
  };
  //
  beforeEach(async () => {
    const auth: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = auth.get<AuthController>(AuthController);
  });

  //
  describe('测试模块【auth/controller】', () => {
    it('测试【signIn】方法', async () => {
      const res = await authController.signIn(dto.signInDto);
      expect(res).toBe('Hello World!');
    });
  });
});
