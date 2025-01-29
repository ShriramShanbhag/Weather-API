import { Module } from '@nestjs/common';
import { WeatherService } from './services/weather/weather.service';
import { WeatherController } from './controller/weather/weather.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    CacheModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        store: 'redis',
        host: configService.get('redis.host'),
        port: configService.get('redis.port'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
