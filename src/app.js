import 'dotenv/config';
import express from 'express';
import { json } from 'express';
import cors from 'cors';
import { connectDB } from './config/database.js';
import routes from './routes/index.js';

const PORT = process.env.PORT || 3000;
const API_PREFIX = '/api';

const app = express();

connectDB();

app.use(cors());

app.use(json());

app.use(API_PREFIX, routes);

const getAvailableRoutes = (router, prefix) => {
    const routesArray = [];

    router.stack.forEach(layer => {
        if (layer.route) {
            const path = prefix + layer.route.path;

            const methods = Object.keys(layer.route.methods)
                .filter(method => layer.route.methods[method])
                .map(m => m.toUpperCase());

            routesArray.push({ path, methods });
        }
    });

    return routesArray;
};

app.get('/', (req, res) => {
    const availableRoutes = getAvailableRoutes(routes, API_PREFIX);

    availableRoutes.push({ path: '/', methods: ['GET'] });

    res.status(200).json({
        message: 'Servidor Express está online, abaixo listaremos as rotas disponíveis.',
        routes: availableRoutes,
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

export default app;
