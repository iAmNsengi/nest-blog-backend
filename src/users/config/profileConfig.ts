import { registerAs } from '@nestjs/config';

export default registerAs('profileConfig', () => ({
  API_KEY: process.env.PROFILE_API_KEY
}));
