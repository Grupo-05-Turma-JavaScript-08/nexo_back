import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UserLogin } from '../entities/userlogin.entity';

@ApiTags('User')
@Controller("/usuarios")
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    login(@Body() userLogin: UserLogin): Promise<any> {
        return this.authService.login(userLogin);
    }

}