import { Controller, Get, NotFoundException, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { GetWeatherDto } from '../../dto/get-weather.dto';
import { WeatherService } from '../../services/weather/weather.service';
import { CityService } from 'src/modules/city/services/city/city.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { UserService } from 'src/modules/users/services/user/user.service';

@Controller('weather')
export class WeatherController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly cityService: CityService,
    private readonly userService: UserService
  ) { }

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

  @Post('subscribe/:cityId')
  @UseGuards(JwtAuthGuard)
  async subscribeToCity(@Request() req: any, @Param('cityId') cityId: number) {
    const user = req.user.userId;
    const city = await this.cityService.findOne(cityId);
    if (!city) {
      throw new NotFoundException(`City with id ${cityId} not found`)
    }
    return this.userService.subscribeToCity(user, city);
  }

  @Post('unsubscribe/:cityId')
  @UseGuards(JwtAuthGuard)
  async unsubscribeCity(@Request() req: any, @Param('cityId') cityId: number) {
    const user = req.user.userId;
    const city = await this.cityService.findOne(cityId);
    if (!city) {
      throw new NotFoundException(`City with id ${cityId} not found`)
    }
    return this.userService.unsubscribeCity(user, city);
  }
}
