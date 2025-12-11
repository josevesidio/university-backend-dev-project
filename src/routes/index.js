import { Router } from 'express';
import authRoutes from './auth-routes.js';
import productRoutes from './product-routes.js';
import movementRoutes from './movement-routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/movements', movementRoutes);

export default router;