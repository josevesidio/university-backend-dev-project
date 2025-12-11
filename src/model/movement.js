import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Product from './product.js';
import User from './user.js';

const Movement = sequelize.define('Movement', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'product_id',
    references: {
      model: Product,
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: User,
      key: 'id',
    },
  },
  type: {
    type: DataTypes.ENUM('ENTRADA', 'SAIDA', 'AJUSTE', 'DEVOLUCAO'),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'movements',
  timestamps: true,
});

// Associações
Movement.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Movement.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Movement;
