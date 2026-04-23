import { Controller, Get, Query } from '@nestjs/common';
import { GetWeatherDto } from '../../dto/get-weather.dto';
import { WeatherService } from '../../services/weather/weather.service';
import { CityService } from 'src/modules/city/services/city/city.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService, private readonly cityService: CityService) { }

  @Get()
  getWeather(@Query() query: GetWeatherDto) {
    const { lat, lon } = query;
    return this.weatherService.getWeather({ lat, lon });
  }

  @Get('cities')
  searchCities(@Query('q') query: string, @Query('limit') limit?: string, @Query('page') page?: string) {
    if (!query) return [];
    return this.cityService.searchEntities(
      query,
      limit ? parseInt(limit) : undefined,
      page ? parseInt(page) : undefined
    );
  }
}
