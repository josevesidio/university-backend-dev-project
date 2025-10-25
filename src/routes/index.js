import { Router } from 'express';

const router = Router();

router.get('/users', (req, res) => {
    res.status(200).json({
        message: "Rota de usuários acessada com sucesso (GET /users)",
        data: [{ id: 1, name: "Usuário Exemplo" }]
    });
});

router.post('/posts', (req, res) => {
    res.status(200).json({
        message: "Rota de criação de post acessada com sucesso (POST /posts)",
        received: req.body || {}
    });
});

export default router;