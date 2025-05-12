const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/authMiddleware'); // Middleware para autenticação
const { atualizarPerfil, buscarPerfil, criarPerfil, excluirPerfil } = require('../controllers/perfilController');

// Criar um perfil
router.post('/perfil', verificarToken, criarPerfil);

// Excluir um perfil
router.delete('/perfil/:perfil_id', verificarToken, excluirPerfil);

// Endpoint para pegar todos os perfis
router.get("/perfil", verificarToken, buscarPerfil);

// Endpoint para atualizar todos os perfis
router.put("/perfil/:perfil_id", verificarToken, atualizarPerfil);

module.exports = router;
