const Usuario = require('../models/usuario');
const Transacoes = require('../models/transacoes');
const TipoTransacao = require('../models/tipo_transacao');
const Categoria = require('../models/categoria');

const criarTransacao = async (req, res) => {
  try {
    const { categoria_id, valor, data, tipo_transacao, descricao } = req.body;

    if (!categoria_id || !valor || !data || !tipo_transacao || !descricao) {
      console.log('categoria_id:', categoria_id,
                  'valor:', valor,
                  'data:', data,
                  'tipo_transacao:', tipo_transacao,
                  'descricao:', descricao,
      )
      return res.status(400).json({ mensagem: "Preencha todos os campos." });
    }

    const usuario_id = req.usuario_id;  // Certifique-se de que é req.usuario_id e não req.usuarioId

    // Verificando o usuário
    const usuario = await Usuario.findOne({ where: { usuario_id: usuario_id } });

    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário não encontrado." });
    }

    // Verificando o tipo de transação
    const tipoTransacao = await TipoTransacao.findOne({ where: { transacao: tipo_transacao } });

    if (!tipoTransacao) {
      return res.status(400).json({ mensagem: "Tipo de transação não encontrado." });
    }

    // Criando a transação
    const novaTransacao = await Transacoes.create({
      categoria_id,
      usuario_id,
      tipo_transacao_id: tipoTransacao.tipo_transacao_id,  // Associando o tipo de transação
      data,
      valor,
      descricao
    });

    res.status(201).json({
      mensagem: "Transação criada com sucesso.",
      transacao: novaTransacao,
    });

  } catch (error) {
    res.status(500).json({ mensagem: "Erro no servidor", erro: error.message });
  }
};

const excluirTransacao = async (req, res) => {
  try {
    const { transacao_id } = req.params;
    const usuario_id = req.usuario_id; // Obtém o ID do usuário autenticado

    if (!transacao_id) {
      return res.status(400).json({ mensagem: "ID da transação é obrigatório." });
    }

    // Verifica se a transação pertence ao usuário autenticado
    const transacao = await Transacoes.findOne({
      where: { transacao_id, usuario_id },
    });

    if (!transacao) {
      return res.status(404).json({ mensagem: "Transação não encontrada ou não pertence ao usuário." });
    }

    // Exclui a transação
    await transacao.destroy();

    return res.status(200).json({ mensagem: "Transação excluída com sucesso." });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro no servidor", erro: error.message });
  }
};

// Função para listar as transações do usuário
const listarTransacoes = async (req, res) => {
  try {
    const usuario_id = req.usuario_id; 

    if (!usuario_id) {
      return res.status(400).json({ mensagem: "Usuário não encontrado." });
    }

    const transacoes = await Transacoes.findAll({
      where: { usuario_id }, 
      include: [{
        model: TipoTransacao,
        attributes: ['transacao'], 
      }
        ],
    });

    if (transacoes.length === 0) {
      return res.status(404).json({ mensagem: "Não há transações para este usuário." });
    }

    res.status(200).json(transacoes);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro no servidor", erro: error.message });
  }
};

module.exports = { criarTransacao, excluirTransacao, listarTransacoes };
