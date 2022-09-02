import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('TELEGRAM - API')
    .setDescription(
      'Basado en principios REST, las API devuelve metadatos JSON.',
    )
    .setVersion('0.0.1')
    .setContact('Ing. Cristian Cueto V.', '', 'ccuetovargas65@gmail.com')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'TELEGRAM - API',
    customfavIcon: 'https://nestjs.com/img/logo_text.svg',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
