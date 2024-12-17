import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );
  /**
   * Swagger config
   */

  const config = new DocumentBuilder()
    .setTitle('Blogs App - App API')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense(
      'MIT License',
      'https://github.com/git/git-scm.com/blob/gh-pages/MIT-LICENSE.txtt'
    )
    .addServer('http://localhost:3000')
    .setVersion('1.0.1')
    .build();
  // Instantiate the document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //enable cors
  app.enableCors();

  // add global interceptors
  app.useGlobalInterceptors(new DataResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
