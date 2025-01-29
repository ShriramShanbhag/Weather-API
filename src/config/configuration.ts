import 'dotenv/config';
import { z } from 'zod';

interface IEnvs {
  PORT: string;
  NODE_ENV: 'development' | 'production';
  REDIS_HOST: string;
  REDIS_PORT: string;
  WEATHER_API_KEY: string;
  WEATHER_API_URL: string;
  THROTTLE_TTL: string;
  THROTTLE_LIMIT: string;
}

const envs = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().default('6379'),
  WEATHER_API_KEY: z.string(),
  WEATHER_API_URL: z.string(),
  THROTTLE_TTL: z.string().default('172800'),
  THROTTLE_LIMIT: z.string().default('10'),
});

const { data, error } = envs.safeParse(process.env);

if (error) {
  throw new Error(error.message);
}

const {
  PORT,
  NODE_ENV,
  REDIS_HOST,
  REDIS_PORT,
  WEATHER_API_KEY,
  WEATHER_API_URL,
  THROTTLE_TTL,
  THROTTLE_LIMIT,
} = data as IEnvs;

export default () => ({
  port: PORT,
  nodeEnv: NODE_ENV,
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
  weather: {
    apiKey: WEATHER_API_KEY,
    baseUrl: WEATHER_API_URL,
  },
  throttle: {
    ttl: THROTTLE_TTL,
    limit: THROTTLE_LIMIT,
  },
});
