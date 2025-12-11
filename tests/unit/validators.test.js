/**
 * Testes Unitários - Validadores
 * Testes básicos para validação de dados
 */

describe('Validadores', () => {
  describe('Validação de Email', () => {
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    test('deve aceitar email válido', () => {
      expect(isValidEmail('usuario@email.com')).toBe(true);
    });

    test('deve aceitar email com subdomínio', () => {
      expect(isValidEmail('usuario@sub.email.com')).toBe(true);
    });

    test('deve rejeitar email sem @', () => {
      expect(isValidEmail('usuarioemail.com')).toBe(false);
    });

    test('deve rejeitar email sem domínio', () => {
      expect(isValidEmail('usuario@')).toBe(false);
    });

    test('deve rejeitar email vazio', () => {
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('Validação de Senha', () => {
    const isValidPassword = (password) => {
      // Mínimo 6 caracteres
      if (!password || typeof password !== 'string') return false;
      return password.length >= 6;
    };

    test('deve aceitar senha com 6 ou mais caracteres', () => {
      expect(isValidPassword('123456')).toBe(true);
    });

    test('deve aceitar senha forte', () => {
      expect(isValidPassword('Senha@123')).toBe(true);
    });

    test('deve rejeitar senha com menos de 6 caracteres', () => {
      expect(isValidPassword('12345')).toBe(false);
    });

    test('deve rejeitar senha vazia', () => {
      expect(isValidPassword('')).toBe(false);
    });

    test('deve rejeitar senha nula', () => {
      expect(isValidPassword(null)).toBe(false);
    });
  });

  describe('Validação de Produto', () => {
    const isValidProduct = (product) => {
      if (!product) return false;
      if (!product.name || product.name.length < 2) return false;
      if (typeof product.price !== 'number' || product.price <= 0) return false;
      if (typeof product.quantity !== 'number' || product.quantity < 0) return false;
      return true;
    };

    test('deve aceitar produto válido', () => {
      const product = {
        name: 'Produto Teste',
        price: 99.99,
        quantity: 10,
      };
      expect(isValidProduct(product)).toBe(true);
    });

    test('deve aceitar produto com quantidade zero', () => {
      const product = {
        name: 'Produto Teste',
        price: 50.0,
        quantity: 0,
      };
      expect(isValidProduct(product)).toBe(true);
    });

    test('deve rejeitar produto sem nome', () => {
      const product = {
        price: 99.99,
        quantity: 10,
      };
      expect(isValidProduct(product)).toBe(false);
    });

    test('deve rejeitar produto com preço negativo', () => {
      const product = {
        name: 'Produto Teste',
        price: -10,
        quantity: 10,
      };
      expect(isValidProduct(product)).toBe(false);
    });

    test('deve rejeitar produto com preço zero', () => {
      const product = {
        name: 'Produto Teste',
        price: 0,
        quantity: 10,
      };
      expect(isValidProduct(product)).toBe(false);
    });
  });

  describe('Validação de Movimentação', () => {
    const validTypes = ['ENTRADA', 'SAIDA', 'DEVOLUCAO', 'AJUSTE'];

    const isValidMovement = (movement) => {
      if (!movement) return false;
      if (!validTypes.includes(movement.type)) return false;
      if (typeof movement.quantity !== 'number' || movement.quantity <= 0) return false;
      if (!movement.productId) return false;
      return true;
    };

    test('deve aceitar movimentação de ENTRADA válida', () => {
      const movement = {
        type: 'ENTRADA',
        quantity: 10,
        productId: 1,
      };
      expect(isValidMovement(movement)).toBe(true);
    });

    test('deve aceitar movimentação de SAIDA válida', () => {
      const movement = {
        type: 'SAIDA',
        quantity: 5,
        productId: 1,
      };
      expect(isValidMovement(movement)).toBe(true);
    });

    test('deve aceitar movimentação de DEVOLUCAO válida', () => {
      const movement = {
        type: 'DEVOLUCAO',
        quantity: 3,
        productId: 1,
      };
      expect(isValidMovement(movement)).toBe(true);
    });

    test('deve aceitar movimentação de AJUSTE válida', () => {
      const movement = {
        type: 'AJUSTE',
        quantity: 100,
        productId: 1,
      };
      expect(isValidMovement(movement)).toBe(true);
    });

    test('deve rejeitar movimentação com tipo inválido', () => {
      const movement = {
        type: 'INVALIDO',
        quantity: 10,
        productId: 1,
      };
      expect(isValidMovement(movement)).toBe(false);
    });

    test('deve rejeitar movimentação com quantidade zero', () => {
      const movement = {
        type: 'ENTRADA',
        quantity: 0,
        productId: 1,
      };
      expect(isValidMovement(movement)).toBe(false);
    });

    test('deve rejeitar movimentação sem productId', () => {
      const movement = {
        type: 'ENTRADA',
        quantity: 10,
      };
      expect(isValidMovement(movement)).toBe(false);
    });
  });
});
