import { Controller, Get, Query } from '@nestjs/common';
import { GetWeatherDto } from '../../dto/get-weather.dto';
import { WeatherService } from '../../services/weather/weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) { }

  @Get()
  getWeather(@Query() query: GetWeatherDto) {
    const { lat, lon } = query;
    return this.weatherService.getWeather({ lat, lon });
  }
}
