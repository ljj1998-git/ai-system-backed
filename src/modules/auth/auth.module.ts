import { Module } from '@nestjs/common';
// import { UserModule } from '@/modules/user/user.module';
// import { DictModule } from '@/modules/dict/dict.module';
// import { MenuModule } from '@/modules/menu/menu.module';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
// import { JwtModule } from '@nestjs/jwt';
// import { TokenService } from './services/token.service';
// import { JwtStrategy } from './strategies/jwt.strategy';
// import { SECRET, ACCESS_TOKEN_EXPIRES_IN_JWT } from '@/configs/jwt.config';

// const strategies = [JwtStrategy];

@Module({
  imports: [
    // UserModule,
    // DictModule,
    // MenuModule,
    // JwtModule.register({
    //   global: true,
    //   secret: SECRET,
    //   signOptions: { expiresIn: ACCESS_TOKEN_EXPIRES_IN_JWT },
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModules {}
