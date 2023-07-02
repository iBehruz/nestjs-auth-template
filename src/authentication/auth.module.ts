import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../common/contants/constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [forwardRef(() => UsersModule), PassportModule,  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '60s'}
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})

export class AuthModule {}
