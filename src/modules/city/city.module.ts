import { Module } from '@nestjs/common';
import { CityService } from './services/city/city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/cities.entities';

@Module({
  providers: [CityService],
  imports: [TypeOrmModule.forFeature([City])],
  exports: [CityService]
})
export class CityModule { }
