import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt{

    async encryptPassword(password: string): Promise<string> {

        let saltRound: number = 10;
        return await bcrypt.hash(password, saltRound)

    }

    async comparePasswords(inputPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(inputPassword, hashedPassword);
    }

}