import { validationResult } from 'express-validator';
import Movement from '../model/movement.js';
import Product from '../model/product.js';
import User from '../model/user.js';

/**
 * Cria uma nova movimentação e atualiza o estoque do produto
 */
export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { productId, type, quantity, reason } = req.body;
    const userId = req.userId; // Vem do middleware de autenticação

    // Verifica se o produto existe
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    // Calcula a nova quantidade do produto
    let newQuantity = product.quantity;
    
    if (type === 'ENTRADA' || type === 'DEVOLUCAO') {
      newQuantity += quantity;
    } else if (type === 'SAIDA') {
      if (product.quantity < quantity) {
        return res.status(400).json({ 
          message: 'Quantidade insuficiente em estoque.',
          available: product.quantity,
          requested: quantity
        });
      }
      newQuantity -= quantity;
    } else if (type === 'AJUSTE') {
      // No ajuste, a quantidade informada é a quantidade final desejada
      newQuantity = quantity;
    }

    // Cria a movimentação
    const movement = await Movement.create({
      productId,
      userId,
      type,
      quantity,
      reason,
    });

    // Atualiza o estoque do produto
    await product.update({ quantity: newQuantity });

    // Busca a movimentação com as associações
    const movementWithDetails = await Movement.findByPk(movement.id, {
      include: [
        { model: Product, as: 'product', attributes: ['id', 'name'] },
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
      ],
    });

    return res.status(201).json({
      message: 'Movimentação registrada com sucesso.',
      movement: movementWithDetails,
      newStock: newQuantity,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: 'Erro ao registrar movimentação.', 
      error: error.message 
    });
  }
};

/**
 * Lista todas as movimentações
 */
export const findAll = async (req, res) => {
  try {
    const { type, productId } = req.query;
    
    const where = {};
    if (type) where.type = type;
    if (productId) where.productId = productId;

    const movements = await Movement.findAll({
      where,
      include: [
        { model: Product, as: 'product', attributes: ['id', 'name'] },
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json(movements);
  } catch (error) {
    return res.status(500).json({ 
      message: 'Erro ao buscar movimentações.', 
      error: error.message 
    });
  }
};

/**
 * Busca uma movimentação por ID
 */
export const findById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const movement = await Movement.findByPk(id, {
      include: [
        { model: Product, as: 'product' },
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
      ],
    });

    if (!movement) {
      return res.status(404).json({ message: 'Movimentação não encontrada.' });
    }

    return res.status(200).json(movement);
  } catch (error) {
    return res.status(500).json({ 
      message: 'Erro ao buscar movimentação.', 
      error: error.message 
    });
  }
};

/**
 * Busca histórico de movimentações de um produto específico
 */
export const findByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Verifica se o produto existe
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    const movements = await Movement.findAll({
      where: { productId },
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      product: {
        id: product.id,
        name: product.name,
        currentStock: product.quantity,
      },
      movements,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: 'Erro ao buscar histórico do produto.', 
      error: error.message 
    });
  }
};
