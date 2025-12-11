/**
 * Testes Unitários - Funções Auxiliares
 * Testes para helpers e utilitários
 */

describe('Funções Auxiliares', () => {
  describe('Formatação de Data', () => {
    const formatDate = (date) => {
      const d = new Date(date);
      const day = String(d.getUTCDate()).padStart(2, '0');
      const month = String(d.getUTCMonth() + 1).padStart(2, '0');
      const year = d.getUTCFullYear();
      return `${day}/${month}/${year}`;
    };

    test('deve formatar data corretamente', () => {
      const date = new Date('2025-12-11T00:00:00Z');
      expect(formatDate(date)).toBe('11/12/2025');
    });

    test('deve adicionar zero à esquerda em dia menor que 10', () => {
      const date = new Date('2025-01-05T00:00:00Z');
      expect(formatDate(date)).toBe('05/01/2025');
    });

    test('deve adicionar zero à esquerda em mês menor que 10', () => {
      const date = new Date('2025-03-15T00:00:00Z');
      expect(formatDate(date)).toBe('15/03/2025');
    });
  });

  describe('Sanitização de String', () => {
    const sanitizeString = (str) => {
      if (!str) return '';
      return str.trim().toLowerCase();
    };

    test('deve remover espaços extras', () => {
      expect(sanitizeString('  teste  ')).toBe('teste');
    });

    test('deve converter para minúsculas', () => {
      expect(sanitizeString('TESTE')).toBe('teste');
    });

    test('deve retornar string vazia para null', () => {
      expect(sanitizeString(null)).toBe('');
    });

    test('deve retornar string vazia para undefined', () => {
      expect(sanitizeString(undefined)).toBe('');
    });
  });

  describe('Validação de ID', () => {
    const isValidId = (id) => {
      const numId = Number(id);
      return Number.isInteger(numId) && numId > 0;
    };

    test('deve aceitar ID numérico válido', () => {
      expect(isValidId(1)).toBe(true);
    });

    test('deve aceitar ID como string numérica', () => {
      expect(isValidId('123')).toBe(true);
    });

    test('deve rejeitar ID zero', () => {
      expect(isValidId(0)).toBe(false);
    });

    test('deve rejeitar ID negativo', () => {
      expect(isValidId(-1)).toBe(false);
    });

    test('deve rejeitar ID decimal', () => {
      expect(isValidId(1.5)).toBe(false);
    });

    test('deve rejeitar ID não numérico', () => {
      expect(isValidId('abc')).toBe(false);
    });
  });

  describe('Paginação', () => {
    const calculatePagination = (page, limit) => {
      const safePage = Math.max(1, parseInt(page) || 1);
      const safeLimit = Math.min(100, Math.max(1, parseInt(limit) || 10));
      const offset = (safePage - 1) * safeLimit;
      
      return { page: safePage, limit: safeLimit, offset };
    };

    test('deve calcular offset para primeira página', () => {
      const result = calculatePagination(1, 10);
      expect(result.offset).toBe(0);
    });

    test('deve calcular offset para segunda página', () => {
      const result = calculatePagination(2, 10);
      expect(result.offset).toBe(10);
    });

    test('deve usar valores padrão para página inválida', () => {
      const result = calculatePagination('abc', 10);
      expect(result.page).toBe(1);
    });

    test('deve usar valores padrão para limite inválido', () => {
      const result = calculatePagination(1, 'abc');
      expect(result.limit).toBe(10);
    });

    test('deve limitar o máximo de itens por página a 100', () => {
      const result = calculatePagination(1, 500);
      expect(result.limit).toBe(100);
    });

    test('deve garantir limite mínimo de 1', () => {
      const result = calculatePagination(1, -5);
      expect(result.limit).toBe(1);
    });

    test('deve garantir página mínima de 1', () => {
      const result = calculatePagination(-5, 10);
      expect(result.page).toBe(1);
    });
  });

  describe('Geração de Slug', () => {
    const generateSlug = (text) => {
      return text
        .toLowerCase()
        .trim()
        .replace(/[àáâãäå]/g, 'a')
        .replace(/[èéêë]/g, 'e')
        .replace(/[ìíîï]/g, 'i')
        .replace(/[òóôõö]/g, 'o')
        .replace(/[ùúûü]/g, 'u')
        .replace(/[ç]/g, 'c')
        .replace(/[ñ]/g, 'n')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    };

    test('deve converter texto para slug', () => {
      expect(generateSlug('Produto Teste')).toBe('produto-teste');
    });

    test('deve remover acentos', () => {
      expect(generateSlug('Café com Açúcar')).toBe('cafe-com-acucar');
    });

    test('deve remover caracteres especiais', () => {
      expect(generateSlug('Produto @#$ Especial!')).toBe('produto-especial');
    });

    test('deve converter múltiplos espaços em único hífen', () => {
      expect(generateSlug('Produto    Teste')).toBe('produto-teste');
    });
  });
});
