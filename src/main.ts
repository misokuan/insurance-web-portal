import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Billing API')
    .setVersion('1.0')
    .addApiKey({
      type: 'apiKey',
      in: 'header',
      name: 'Role',
      description: 'Key in your role - User / Admin',
    }, 'Role')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
