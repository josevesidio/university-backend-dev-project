import { Router } from 'express';
import { create, findAll, findById, update, remove } from '../controllers/product-controller.js';
import { createRules, updateRules } from '../validators/product-validator.js';

const router = Router();

/**
 * POST /api/products
 * Cria um novo produto
 */
router.post('/', createRules, create);

/**
 * GET /api/products
 * Lista todos os produtos
 */
router.get('/', findAll);

/**
 * GET /api/products/:id
 * Busca um produto por ID
 */
router.get('/:id', findById);

/**
 * PUT /api/products/:id
 * Atualiza um produto
 */
router.put('/:id', updateRules, update);

/**
 * DELETE /api/products/:id
 * Deleta um produto
 */
router.delete('/:id', remove);

export default router;
