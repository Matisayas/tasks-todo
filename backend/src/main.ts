import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { seed } from 'seed/seed';
import { AppModule } from './app.module';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  try {
    await seed(); // Llama a la función de seed
    console.log('Base de datos sembrada con usuarios predeterminados.');
  } catch (error) {
    console.error('Error al sembrar la base de datos:', error);
  }

  await app.listen(process.env.BACKEND_PORT || 4000);
}

bootstrap();
