import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from '../../entities/city.entity';

@Injectable()
export class CityService {

    constructor(@InjectRepository(City) private readonly cityRepository: Repository<City>) { }

    async searchEntities(query: string, limit: number = 5, page: number = 1): Promise<City[]> {
        const safeLimit = Math.min(Math.max(limit, 1), 50);
        const skip = (page - 1) * safeLimit;
        return this.cityRepository.find({
            where: {
                name: ILike(`${query}%`)
            },
            order: {
                pop: 'DESC'
            },
            skip,
            take: safeLimit
        })
    }
}
