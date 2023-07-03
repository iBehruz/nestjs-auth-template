import { Controller, Request, Get, Post, SetMetadata, UseGuards, Param, Query, Body, Patch } from "@nestjs/common";
import { AuthService } from "src/authentication/auth.service";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { LocalAuthGuard } from "src/common/guards/local-auth.guard";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('Users') 
@Controller()
export class UsersController{
    constructor(private authService: AuthService, private usersService: UsersService){}

  @ApiOperation({ summary: 'Current user info' })
  @Get('user')
  getProfile(@Request() req){
    return req.user;
  }

  @ApiOperation({ summary: 'All users list' })
  @Get('users')
  async findAll(@Request() req) {
    return this.usersService.findAll();
  }
  


  @ApiOperation({ summary: 'Update user info by id' })
  @Patch("users/:id")
  update(@Param("id") id, @Query() query, @Body() body: CreateUserDto){
      return this.usersService.update(id, body);
  }

}