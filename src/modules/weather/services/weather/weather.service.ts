import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { GetWeatherDto, WeatherDto } from '../../dto/get-weather.dto';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly apiKey: string;
  private readonly baseUrl: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.apiKey = this.configService.get<string>('weather.apiKey') as string;
    this.baseUrl = this.configService.get<string>('weather.baseUrl') as string;
  }

  async getWeather({ lat, lon }: GetWeatherDto): Promise<WeatherDto> {
    const cacheData = await this.loadFromCache({ lat, lon });

    if (cacheData) {
      this.logger.log('Cache hit!');
      return cacheData;
    }

    this.logger.log('Cache miss!');

    const { data } = await firstValueFrom(
      this.httpService
        .get<WeatherDto>(
          `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data);
            throw new Error('An error happened!');
          }),
        ),
    );

    await this.saveToCache({ lat, lon }, data);

    return data;
  }

  private async saveToCache({ lat, lon }: GetWeatherDto, data: WeatherDto) {
    const cacheKey = `${lat}-${lon}`;
    await this.cacheManager.set(cacheKey, data, 60 * 60 * 24); // 24 hours
  }

  private async loadFromCache({
    lat,
    lon,
  }: GetWeatherDto): Promise<WeatherDto | null> {
    const cacheKey = `${lat}-${lon}`;
    return await this.cacheManager.get<WeatherDto>(cacheKey);
  }
}
