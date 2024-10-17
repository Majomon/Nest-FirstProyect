import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { AuthGuard } from './guards/auth.guard';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Para hacerlo global
  // Manera 1 - La manera 2 esta en el archivo app-module.ts
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInterceptors(new MyInterceptor())
  app.useGlobalPipes(new ValidationPipe());
  app.use(loggerGlobal);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
