import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateBody(DtoClass: any) {
  return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    const dtoObject = plainToInstance(DtoClass, req.body);
    const errors = await validate(dtoObject);

    if (errors.length > 0) {
      const messages = errors.flatMap(error =>
        Object.values(error.constraints ?? {})
      );

      res.status(400).json({
        success: false,
        message: 'Datos inválidos',
        errors: messages,
      });

      return; // muy importante: prevenir que se llame next() o retorne algo más
    }

    // si pasa la validación
    req.body = dtoObject; // opcional
    next();
  };
}
