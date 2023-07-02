import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    constructor(private reflactor: Reflector){
        super();
    }


    canActivate(context: ExecutionContext) {
        const isPublic = this.reflactor.getAllAndOverride<boolean>("IS_PUBLIC", [
            context.getHandler(),
            context.getClass()
        ]);

        if(isPublic){
            return true;
        }
        
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
        if(err || !user){
            throw err || new UnauthorizedException();
        }

        return user;
    }
}