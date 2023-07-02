import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './enteties/user.entetiy';
import { UsersController } from './users.controller';
import { AuthService } from 'src/authentication/auth.service';
import { AuthModule } from 'src/authentication/auth.module';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/contants/constants';

@Module({
  imports: [TypeOrmModule.forFeature([User]),  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '60s'}
  })],
  providers: [UsersService, AuthService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
