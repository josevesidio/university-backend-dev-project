import { Router } from 'express';
import { register, login } from '../controllers/auth-controller.js';
import { registerRules, loginRules } from '../validators/auth-validator.js';

const router = Router();

/**
 * @route   POST /auth/register
 * @desc    Registra um novo usuário
 * @access  Public
 */
router.post(
  '/register',
  registerRules,
  register
);

/**
 * @route   POST /auth/login
 * @desc    Autentica um usuário (faz login)
 * @access  Public
 */
router.post(
  '/login',
  loginRules,
  login
);

export default router;