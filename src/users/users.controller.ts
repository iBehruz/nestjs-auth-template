import { Controller, Request, Get, Post, SetMetadata, UseGuards, Param, Query, Body, Patch } from "@nestjs/common";
import { AuthService } from "src/authentication/auth.service";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { LocalAuthGuard } from "src/common/guards/local-auth.guard";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class UsersController{
    constructor(private authService: AuthService, private usersService: UsersService){}

  @SetMetadata("IS_PUBLIC", true)
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req){
    return req.user;
  }

  @SetMetadata("IS_PUBLIC", true)
  @Get('users')
  async findAll(@Request() req) {
    return this.usersService.findAll();
  }
  

  @SetMetadata("IS_PUBLIC", true)
  @Post('users')
  async signup(@Param() param, @Query() query, @Body() body: CreateUserDto ,  @Request() req) {
    return this.usersService.create(body);
  }

  @Patch("users/:id")
  update(@Param("id") id, @Query() query, @Body() body: CreateUserDto){
      return this.usersService.update(id, body);
  }

}