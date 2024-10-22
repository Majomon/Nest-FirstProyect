import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { AuthGuard } from './guards/auth.guard';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import { config as auth0Config } from './config/auth0.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Para hacerlo global
  // Manera 1 - La manera 2 esta en el archivo app-module.ts
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInterceptors(new MyInterceptor())
  app.use(auth(auth0Config));
  app.useGlobalPipes(
    new ValidationPipe({
      // Se va a manejar unicamente los datos que espero tener por ejemplo si paso age en el post de users ahora va a ignorar tal dato
      whitelist: true,
      exceptionFactory: (errors) => {
        const cleanError = errors.map((error) => {
          return { property: error.property, constraints: error.constraints };
        });

        return new BadRequestException({
          alert:
            'Se han detectado los siguientes errores en la petición, y te mandamos este msj personalizado',
          errors: cleanError,
        });
      },
    }),
  );
  app.use(loggerGlobal);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
