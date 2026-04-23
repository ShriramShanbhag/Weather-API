import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) { }

    async create(userData: Partial<User>): Promise<User | null> {
        const newUser = this.userRepo.create(userData)
        return this.userRepo.save(newUser);
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOne({ where: { email } });
    }
}
