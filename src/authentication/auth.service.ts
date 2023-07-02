import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from '../common/contants/constants';
import { User } from 'src/users/enteties/user.entetiy';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService){}

    async validateUser(email: string, password: string): Promise<User>{
        const user: User = await this.userService.findOne(email);
        if(user && user.password == password){
            const { password, ...result } = user;
            log(result);
            return result;
        }

        return null;

    }


    async login(user: any){
        const payload = {email: user.email, sub: user.id}

        return {
            access_token: this.jwtService.sign(payload)
        }
    }


}
