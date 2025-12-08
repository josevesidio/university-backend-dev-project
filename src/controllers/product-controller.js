import { validationResult } from 'express-validator';
import Product from '../model/product.js';

/**
 * Cria um novo produto
 */
export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, description, price, quantity } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      quantity,
    });

    return res.status(201).json({
      message: 'Produto criado com sucesso.',
      product,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar produto.', error: error.message });
  }
};

/**
 * Lista todos os produtos
 */
export const findAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar produtos.', error: error.message });
  }
};

/**
 * Busca um produto por ID
 */
export const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar produto.', error: error.message });
  }
};

/**
 * Atualiza um produto
 */
export const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    await product.update({ name, description, price, quantity });

    return res.status(200).json({
      message: 'Produto atualizado com sucesso.',
      product,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar produto.', error: error.message });
  }
};

/**
 * Deleta um produto
 */
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    await product.destroy();

    return res.status(200).json({ message: 'Produto deletado com sucesso.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao deletar produto.', error: error.message });
  }
};
