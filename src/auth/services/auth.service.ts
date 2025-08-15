import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UserService } from '../../user/services/user.service';
import { UserLogin } from '../entities/userlogin.entity';


@Injectable()
export class AuthService{
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ){ }

    async validateUser(username: string, password: string): Promise<any>{

        const findByUser = await this.userService.findByUser(username)

        if(!findByUser)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.comparePasswords(password, findByUser.password)

        if(findByUser && matchPassword){
            const { password, ...resposta } = findByUser
            return resposta
        }

        return null

    }

    async login(userLogin: UserLogin){

        const payload = { sub: userLogin.username }

        const findByUser = await this.userService.findByUser(userLogin.username)

        if (!findByUser)
      throw new HttpException("Usuário não encontrado!", HttpStatus.NOT_FOUND);

        return{
            id: findByUser.id,
            name: findByUser.name,
            username: userLogin.username,
            password: '',
            photo: findByUser.photoUrl,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }

    }
} 