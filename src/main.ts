import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { AuthGuard } from './guards/auth.guard';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import { config as auth0Config } from './config/auth0.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // Document builder
  const swaggerConfig = new DocumentBuilder()
    .setTitle('DemoTest')
    .setDescription(
      'Esta es una API contruida  con Nest para ser empleada en un proyecto de prueba',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
