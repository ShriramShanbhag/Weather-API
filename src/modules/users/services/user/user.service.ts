import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { City } from 'src/modules/city/entities/city.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

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

    async subscribeToCity(userId: number, city: City): Promise<User | null> {
        const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['subscribedCities'] });
        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }
        if (user.subscribedCities.length >= 5) {
            throw new BadRequestException(`User with id ${userId} has reached the maximum number of subscribed cities`);
        }
        const alreadySubscribed = user.subscribedCities.some(c => c.id === city.id);
        if (alreadySubscribed) {
            throw new BadRequestException(`User with id ${userId} is already subscribed to city with id ${city.id}`);
        }
        user.subscribedCities.push(city);
        return this.userRepo.save(user);
    }

    async unsubscribeCity(userId: number, city: City): Promise<User | null> {
        const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['subscribedCities'] });
        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }
        const cityToRemove = user.subscribedCities.some(c => c.id === city.id);
        if (!cityToRemove) {
            throw new BadRequestException(`User with id ${userId} is not subscribed to city with id ${city.id}`);
        }
        user.subscribedCities = user.subscribedCities.filter(c => c.id !== city.id);
        return this.userRepo.save(user);

    }

}
