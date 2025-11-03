import { Sequelize } from 'sequelize';
import { createPool } from 'mysql2/promise';
import 'dotenv/config';

const dbName = process.env.DB_NAME || 'university_backend_db';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || 'password';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

/**
 * Função que usa mysql2 para criar o DB antes do Sequelize tentar se conectar
 */
export const ensureDatabaseExists = async () => {
  let pool;
  try {
    console.log('Verificando existência do banco de dados...');
    
    pool = createPool({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
    });

    await pool.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    
    console.log(`✅ Banco de dados '${dbName}' criado.`);

  } catch (error) {
    console.error('❌ ERRO CRÍTICO ao criar o banco de dados:', error.message);
    process.exit(1);
  } finally {
    if (pool) {
      await pool.end();
    }
  }
};

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;