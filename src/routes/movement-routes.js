import { Router } from 'express';
import { create, findAll, findById, findByProduct } from '../controllers/movement-controller.js';
import { createRules } from '../validators/movement-validator.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Todas as rotas de movimentação requerem autenticação
router.use(authMiddleware);

/**
 * POST /api/movements
 * Cria uma nova movimentação
 */
router.post('/', createRules, create);

/**
 * GET /api/movements
 * Lista todas as movimentações
 * Query params opcionais: type, productId
 */
router.get('/', findAll);

/**
 * GET /api/movements/:id
 * Busca uma movimentação por ID
 */
router.get('/:id', findById);

/**
 * GET /api/movements/product/:productId
 * Busca histórico de movimentações de um produto
 */
router.get('/product/:productId', findByProduct);

export default router;
