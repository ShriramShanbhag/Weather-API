

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/modules/users/services/user/user.service";
import * as bcrypt from 'bcrypt';
import { User } from "src/modules/users/entities/user.entity";
import { MailService } from "src/modules/mail/services/mail.service";


@Injectable()
export class AuthService {


    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly mailService: MailService
    ) { }

    async register(email: string, password: string): Promise<Partial<User> | null> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        const user = await this.userService.create({ email, password: hash });
        if (user) {
            this.mailService.sendWelcomeEmail(user.email);
            const { password: _unused, ...result } = user;
            return result;
        }
        return null;

    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email);
        if (!user) return null;

        const doesPasswordMatch = await bcrypt.compare(password, user.password);

        if (doesPasswordMatch) {
            const { password, ...userWithoutHash } = user;
            return userWithoutHash;
        }

        return null;
    }

    async login(user: Partial<User>): Promise<any> {
        const payload = {
            email: user.email,
            sub: user.id,
        }

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}