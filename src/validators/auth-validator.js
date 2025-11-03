import { body } from 'express-validator';

// Regras para a rota de REGISTRO
export const registerRules = [
  body('email')
    .notEmpty().withMessage('O e-mail é obrigatório.')
    .bail()
    .isEmail().withMessage('Por favor, forneça um e-mail válido.')
    .normalizeEmail(),
    
  body('password')
    .notEmpty().withMessage('A senha é obrigatória.')
    .bail()
    .isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres.')
    .trim(),
];

// Regras para a rota de LOGIN
export const loginRules = [
  body('email')
    .notEmpty().withMessage('O e-mail é obrigatório.')
    .bail()
    .isEmail().withMessage('Por favor, forneça um e-mail válido.')
    .normalizeEmail(),

  body('password', 'A senha é obrigatória.')
    .notEmpty()
    .trim(),
];