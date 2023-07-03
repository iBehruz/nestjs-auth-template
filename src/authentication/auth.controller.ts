import { Controller, Request, Post, SetMetadata, UseGuards, Param, Query, Body } from "@nestjs/common";
import { LocalAuthGuard } from "src/common/guards/local-auth.guard";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserLoginDto } from "./dto/user-login.dto";


@ApiTags("Authentication")
@Controller()
export class AuthController {

    constructor(private authService: AuthService, private usersService: UsersService){}
    
    @ApiBody({type : UserLoginDto})
    @SetMetadata("IS_PUBLIC", true)
    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: 'Login' })
    @Post('auth/login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }

  
    @ApiOperation({ summary: 'Registraion' })
    @SetMetadata("IS_PUBLIC", true)
    @Post('auth/signup')
    async signup(@Param() param, @Query() query, @Body() body: CreateUserDto ,  @Request() req) {
      return this.usersService.create(body);
    }
    

}