import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// Para hacerlo para una o unas rutas en especifico
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Estás ejecutando un método ${req.method} en la ruta ${req.url} - Este no es global`,
    );
    next();
  }
}

// Global
export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  console.log('Logger Global');
  next();
}
