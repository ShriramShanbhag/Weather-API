import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from '../../entities/cities.entities';

@Injectable()
export class CityService {

    constructor(@InjectRepository(City) private readonly cityRepository: Repository<City>) { }

    async searchEntities(query: string): Promise<City[]> {
        return this.cityRepository.find({
            where: {
                name: Like(`${query}%`)
            },
            order: {
                pop: 'DESC'
            },
            take: 5
        })
    }
}
