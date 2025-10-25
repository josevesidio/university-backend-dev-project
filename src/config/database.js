import { createPool } from 'mysql2/promise';
const poolConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'university_backend_db',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let pool;

/**
 * Função responsável por estabelecer e gerenciar a conexão com o banco de dados MySQL,
 * garantindo que o banco de dados de destino exista.
 */
export const connectDB = async () => {
    const baseConfig = { ...poolConfig };
    const DB_NAME = baseConfig.database;
    delete baseConfig.database; 

    if (!DB_NAME) {
        console.error('❌ ERRO: O nome do banco de dados (DB_NAME) não foi configurado.');
        process.exit(1);
    }
    
    try {
        console.log('Tentando conectar ao servidor MySQL para verificar/criar o DB...');
        
        const tmpPool = createPool(baseConfig);
        
        await tmpPool.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
        console.log(`✅ Banco de dados '${DB_NAME}' garantido. (Criado ou já existente)`);
        
        await tmpPool.end(); 
        
        console.log('Criando Pool de Conexões definitivo...');
        
        pool = createPool(poolConfig);
        
        const connection = await pool.getConnection();
        connection.release(); 

        console.log(`🔗 Pool de conexões definitivo com '${DB_NAME}' estabelecido com sucesso!`);
        
        return pool; 

    } catch (error) {
        console.error('❌ ERRO CRÍTICO ao conectar com o servidor MySQL:', error.message);
        
        process.exit(1);
    }
};

/**
 * Exporta o pool de conexões para ser usado pelos Models e Services para executar queries.
 * @returns {import('mysql2/promise').Pool | null}
 */
export const getDBPool = () => {
    if (!pool) {
        console.warn("Aviso: O pool de DB não foi inicializado. Certifique-se de chamar connectDB() primeiro.");
    }
    return pool || null;
}
