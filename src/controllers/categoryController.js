const Categoria = require('../models/categoria');  
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const criarCategoria = async (req, res) => {
  try {
    const categoria = req.body.categoria;
    const usuario_id = req.usuario_id; 
    const usuario = await Usuario.findOne({ where: { usuario_id: usuario_id } });

    if (!categoria || !usuario) {
      return res.status(400).json({ mensagem: "Preencha todos os campos." });
    }

    const novaCategoria = await Categoria.create({ 
      categoria, 
      usuario_id 
    });

    res.status(201).json({
      mensagem: "Categoria cadastrada com sucesso",
      categoria: { id: novaCategoria.categoria_ID, categoria: novaCategoria.categoria, usuario_id: novaCategoria.usuario_id },
    });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro no servidor", erro: error.message });
  }
};


// Função para excluir uma categoria pelo ID
const excluirCategoria = async (req, res) => {
  try {
    const { categoria_id } = req.params;

    const categoria = await Categoria.findByPk(categoria_id);

    if (!categoria) {
      return res.status(404).json({ mensagem: "Categoria não encontrada." });
    }

    await categoria.destroy();

    res.status(200).json({ mensagem: "Categoria excluída com sucesso." });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro no servidor", erro: error.message });
  }
};

// função para buscar categoria
const buscarCategorias = async (req, res) => {
  try {
    const usuario_id = req.usuario_id;

    if (!usuario_id) {
      return res.status(400).json({ mensagem: "Usuário não encontrado." });
    }

    const categorias = await Categoria.findAll({
      where: { usuario_id }
    });

    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar categorias", erro: error.message });
  }
};


module.exports = { criarCategoria, excluirCategoria, buscarCategorias };
