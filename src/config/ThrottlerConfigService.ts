import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory,
} from '@nestjs/throttler';

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  private readonly ttl: number;
  private readonly limit: number;
  constructor(private readonly configService: ConfigService) {
    this.ttl = this.configService.get('throttler.ttl', {
      infer: true,
    }) as number;
    this.limit = this.configService.get('throttler.limit', {
      infer: true,
    }) as number;
  }

  createThrottlerOptions():
    | Promise<ThrottlerModuleOptions>
    | ThrottlerModuleOptions {
    return [
      {
        ttl: this.ttl, // milliseconds
        limit: this.limit, // max requests per ttl
      },
    ];
  }
}
