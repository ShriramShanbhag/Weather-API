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

  async getWeather({ city, code }: GetWeatherDto): Promise<WeatherDto> {
    const CITY = city.charAt(0).toUpperCase() + city.slice(1);

    const cacheData = await this.loadFromCache({ city, code });

    if (cacheData) {
      this.logger.log('Cache hit!');
      return cacheData;
    }

    this.logger.log('Cache miss!');

    const { data } = await firstValueFrom(
      this.httpService
        .get<WeatherDto>(
          `${this.baseUrl}/${CITY},${code.toUpperCase()}?key=${this.apiKey}&unitGroup=us&contentType=json`,
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

    await this.saveToCache({ city, code }, data);

    return data;
  }

  private async saveToCache({ city, code }: GetWeatherDto, data: WeatherDto) {
    const cacheKey = `${city}-${code}`;
    await this.cacheManager.set(cacheKey, data, 60 * 60 * 24); // 24 hours
  }

  private async loadFromCache({
    city,
    code,
  }: GetWeatherDto): Promise<WeatherDto | null> {
    const cacheKey = `${city}-${code}`;
    return await this.cacheManager.get<WeatherDto>(cacheKey);
  }
}
