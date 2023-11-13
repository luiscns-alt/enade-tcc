import { LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './utils/logging.interceptor';

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';
  const logLevels: LogLevel[] = isProduction
    ? ['error', 'warn', 'log']
    : ['error', 'warn', 'log', 'debug', 'verbose'];

  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API de Gestão de Questionários')
    .setDescription(
      'Esta API permite o cadastro e gerenciamento de questionários, autenticação e registro de usuários, e coleta e armazenamento de respostas dos usuários.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(new LoggerInterceptor());

  await app.listen(process.env.PORT || 3000);
}
bootstrap().then(() =>
  console.log(`Application is running on: ${process.env.PORT || 3000}`),
);
