const Perfil = require('../models/perfil');
const Usuario = require('../models/usuario');

// Função para criar um perfil
const criarPerfil = async (req, res) => {
  try {
    const { foto_perfil, descricao, nome } = req.body;
    const usuario_id = req.usuario_id;

    // Verifica se os dados necessários foram passados
    if (!descricao) {
      return res.status(400).json({ mensagem: "Foto de perfil e descrição são obrigatórios." });
    }

    const usuario = await Usuario.findOne({ where: { usuario_id } });

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    // Criação do perfil
    const novoPerfil = await Perfil.create({
      foto_perfil,
      descricao,
      usuario_id,
      nome
    });

    res.status(201).json({
      mensagem: "Perfil criado com sucesso.",
      perfil: novoPerfil
    });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro no servidor", erro: error.message });
  }
};

// Função para buscar um perfil por ID do usuário
const buscarPerfil = async (req, res) => {
  try {
    const usuario_id = req.usuario_id;

    // Verifica se o usuário está autenticado
    if (!usuario_id) {
      return res.status(400).json({ mensagem: "Usuário não encontrado." });
    }

    const perfil = await Perfil.findOne({
      where: { usuario_id }
    });

    if (!perfil) {
      return res.status(404).json({ mensagem: "Perfil não encontrado." });
    }

    res.status(200).json(perfil);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar perfil", erro: error.message });
  }
};

// Função para atualizar o perfil
const atualizarPerfil = async (req, res) => {
  try {
    const { perfil_id } = req.params;
    const { foto_perfil, descricao, nome } = req.body;
    const usuario_id = req.usuario_id;

    // Verifica se os dados foram passados
    if (!descricao) {
      return res.status(400).json({ mensagem: "Campo 'descrição' deve ser fornecido." });
    }

    const perfilExistente = await Perfil.findOne({
      where: { perfil_id, usuario_id }
    });

    if (!perfilExistente) {
      return res.status(404).json({ mensagem: "Perfil não encontrado." });
    }

    // Atualiza o perfil
    if (foto_perfil) perfilExistente.foto_perfil = foto_perfil;
    if (descricao) perfilExistente.descricao = descricao;
    if (nome) perfilExistente.nome = nome;

    await perfilExistente.save();

    res.status(200).json({
      mensagem: "Perfil atualizado com sucesso.",
      perfil: perfilExistente
    });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao atualizar perfil", erro: error.message });
  }
};

// Função para excluir o perfil
const excluirPerfil = async (req, res) => {
  try {
    const { perfil_id } = req.params;
    const usuario_id = req.usuario_id;

    const perfil = await Perfil.findOne({
      where: { perfil_id, usuario_id }
    });

    if (!perfil) {
      return res.status(404).json({ mensagem: "Perfil não encontrado." });
    }

    await perfil.destroy();

    res.status(200).json({ mensagem: "Perfil excluído com sucesso." });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao excluir perfil", erro: error.message });
  }
};

module.exports = { criarPerfil, buscarPerfil, atualizarPerfil, excluirPerfil };
