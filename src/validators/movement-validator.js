import { body } from 'express-validator';

export const createRules = [
  body('productId')
    .notEmpty()
    .withMessage('O ID do produto é obrigatório.')
    .bail()
    .isInt({ min: 1 })
    .withMessage('O ID do produto deve ser um número válido.'),
  body('type')
    .notEmpty()
    .withMessage('O tipo de movimentação é obrigatório.')
    .bail()
    .isIn(['ENTRADA', 'SAIDA', 'AJUSTE', 'DEVOLUCAO'])
    .withMessage('O tipo deve ser: ENTRADA, SAIDA, AJUSTE ou DEVOLUCAO.'),
  body('quantity')
    .notEmpty()
    .withMessage('A quantidade é obrigatória.')
    .bail()
    .isInt({ min: 1 })
    .withMessage('A quantidade deve ser um número inteiro maior que zero.'),
  body('reason')
    .optional()
    .isLength({ max: 500 })
    .withMessage('O motivo deve ter no máximo 500 caracteres.')
    .trim(),
];
