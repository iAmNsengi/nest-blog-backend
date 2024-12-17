import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV ?? 'production',
  apiVersion: process.env.API_VERSION,
  mailHost: process.env.MAIL_HOST,
  mailSMTPUsername: process.env.MAIL_SMTP_USERNAME,
  mailSMTPPassword: process.env.MAIL_SMTP_PASSWORD
}));
