const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/authMiddleware'); // Middleware para autenticação
const { criarCategoria, excluirCategoria, buscarCategorias } = require('../controllers/categoryController');

// Criar uma categoria
router.post('/categorias', verificarToken, criarCategoria);

// Excluir uma categoria
router.delete('/categorias/:categoria_id', verificarToken, excluirCategoria);

// Endpoint para pegar todas as categorias
router.get("/categorias", verificarToken, buscarCategorias);

module.exports = router;
