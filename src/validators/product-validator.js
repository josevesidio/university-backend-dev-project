import { body } from 'express-validator';

export const createRules = [
  body('name')
    .notEmpty()
    .withMessage('O nome é obrigatório.')
    .bail()
    .isLength({ min: 2, max: 255 })
    .withMessage('O nome deve ter entre 2 e 255 caracteres.')
    .trim(),
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('A descrição deve ter no máximo 1000 caracteres.')
    .trim(),
  body('price')
    .notEmpty()
    .withMessage('O preço é obrigatório.')
    .bail()
    .isFloat({ min: 0 })
    .withMessage('O preço deve ser um número válido maior ou igual a zero.'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('A quantidade deve ser um número inteiro maior ou igual a zero.'),
];

export const updateRules = [
  body('name')
    .optional()
    .isLength({ min: 2, max: 255 })
    .withMessage('O nome deve ter entre 2 e 255 caracteres.')
    .trim(),
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('A descrição deve ter no máximo 1000 caracteres.')
    .trim(),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('O preço deve ser um número válido maior ou igual a zero.'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('A quantidade deve ser um número inteiro maior ou igual a zero.'),
];
