import { ObjectSchema, ValidateOptions } from 'yup';
import { Request, Response, NextFunction } from 'express';

type ValidationField = 'query' | 'body' | 'psrams';

export function validationMiddleware(schema: ObjectSchema<object>, validationField: ValidationField) {
    return function (req: Request, res: Response, next: NextFunction) {
      const dataToValidate = req[validationField];
  
      schema.validateSync(dataToValidate, { strict: true });
  
      next();
    }
  }