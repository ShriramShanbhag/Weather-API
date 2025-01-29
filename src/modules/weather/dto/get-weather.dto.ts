import {
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetWeatherDto {
  @IsNotEmpty({ message: 'City is required' })
  @IsString({ message: 'City must be a string' })
  city: string;

  @IsNotEmpty({ message: 'Country code is required' })
  @IsString({ message: 'Country code must be a string' })
  code: string;
}

class HourlyWeatherDto {
  @IsString()
  datetime: string;

  @IsNumber()
  datetimeEpoch: number;

  @IsNumber()
  temp: number;

  @IsNumber()
  feelslike: number;

  @IsNumber()
  humidity: number;

  @IsNumber()
  dew: number;

  @IsNumber()
  precip: number;

  @IsNumber()
  precipprob: number;

  @IsNumber()
  snow: number;

  @IsNumber()
  snowdepth: number;

  @IsOptional()
  @IsString()
  preciptype?: string | null;

  @IsNumber()
  windgust: number;

  @IsNumber()
  windspeed: number;

  @IsNumber()
  winddir: number;

  @IsNumber()
  pressure: number;

  @IsNumber()
  visibility: number;

  @IsNumber()
  cloudcover: number;

  @IsNumber()
  solarradiation: number;

  @IsNumber()
  solarenergy: number;

  @IsNumber()
  uvindex: number;

  @IsNumber()
  severerisk: number;

  @IsString()
  conditions: string;

  @IsString()
  icon: string;

  @IsArray()
  @IsString({ each: true })
  stations: string[];

  @IsString()
  source: string;
}

class DailyWeatherDto {
  @IsString()
  datetime: string;

  @IsNumber()
  datetimeEpoch: number;

  @IsNumber()
  tempmax: number;

  @IsNumber()
  tempmin: number;

  @IsNumber()
  temp: number;

  @IsNumber()
  feelslikemax: number;

  @IsNumber()
  feelslikemin: number;

  @IsNumber()
  feelslike: number;

  @IsNumber()
  dew: number;

  @IsNumber()
  humidity: number;

  @IsNumber()
  precip: number;

  @IsNumber()
  precipprob: number;

  @IsNumber()
  precipcover: number;

  @IsOptional()
  @IsString()
  preciptype?: string | null;

  @IsNumber()
  snow: number;

  @IsNumber()
  snowdepth: number;

  @IsNumber()
  windgust: number;

  @IsNumber()
  windspeed: number;

  @IsNumber()
  winddir: number;

  @IsNumber()
  pressure: number;

  @IsNumber()
  cloudcover: number;

  @IsNumber()
  visibility: number;

  @IsNumber()
  solarradiation: number;

  @IsNumber()
  solarenergy: number;

  @IsNumber()
  uvindex: number;

  @IsNumber()
  severerisk: number;

  @IsString()
  sunrise: string;

  @IsNumber()
  sunriseEpoch: number;

  @IsString()
  sunset: string;

  @IsNumber()
  sunsetEpoch: number;

  @IsNumber()
  moonphase: number;

  @IsString()
  conditions: string;

  @IsString()
  description: string;

  @IsString()
  icon: string;

  @IsArray()
  @IsString({ each: true })
  stations: string[];

  @IsString()
  source: string;

  @ValidateNested({ each: true })
  @Type(() => HourlyWeatherDto)
  @IsArray()
  hours: HourlyWeatherDto[];
}

export class WeatherDto {
  @IsNumber()
  queryCost: number;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  resolvedAddress: string;

  @IsString()
  address: string;

  @IsString()
  timezone: string;

  @IsNumber()
  tzoffset: number;

  @IsString()
  description: string;

  @ValidateNested({ each: true })
  @Type(() => DailyWeatherDto)
  @IsArray()
  days: DailyWeatherDto[];
}
