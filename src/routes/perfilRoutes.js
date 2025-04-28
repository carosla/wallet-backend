const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/authMiddleware'); // Middleware para autenticação
const { atualizarPerfil, buscarPerfil, criarPerfil, excluirPerfil } = require('../controllers/perfilController');

// Criar uma categoria
router.post('/perfil', verificarToken, criarPerfil);

// Excluir uma categoria
router.delete('/perfil/:perfil_id', verificarToken, excluirPerfil);

// Endpoint para pegar todas as categorias
router.get("/perfil", verificarToken, buscarPerfil);

// Endpoint para atualizar todas as categorias
router.put("/perfil/:perfil_id", verificarToken, atualizarPerfil);

module.exports = router;
