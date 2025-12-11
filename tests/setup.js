/**
 * Setup para os testes
 * Configura variáveis de ambiente e helpers para os testes
 */

// Configuração do ambiente de teste
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.PORT = 3001;

/**
 * Helper para gerar token JWT de teste
 */
import jwt from 'jsonwebtoken';

export const generateTestToken = (userId = 1) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

/**
 * Dados de teste reutilizáveis
 */
export const testData = {
  user: {
    email: 'teste@email.com',
    password: 'Senha@123',
  },
  product: {
    name: 'Produto Teste',
    description: 'Descrição do produto teste',
    price: 99.99,
    quantity: 100,
  },
  movement: {
    type: 'ENTRADA',
    quantity: 10,
    reason: 'Movimentação de teste',
  },
};
