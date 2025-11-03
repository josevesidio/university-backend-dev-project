import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';

/**
 * Registra um novo usuário
 */
export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Este e-mail já está em uso.' });
    }

    const newUser = await User.create({
      email,
      password,
    });

    res.status(201).json({
      message: 'Usuário registrado com sucesso! Verifique seu e-mail.',
      userId: newUser.id,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor ao registrar usuário.' });
  }
};

/**
 * Autentica um usuário (Login)
 */
export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuário ou senha inválida.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Usuário ou senha inválida.' });
    }

    if (!user.is_email_verified) {
      return res.status(403).json({ error: 'Por favor, valide seu e-mail antes de fazer login.' });
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: 'Login bem-sucedido!',
      token: token,
      userId: user.id,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor ao fazer login.' });
  }
};