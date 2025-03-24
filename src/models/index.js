const sequelize = require("../config/database");

const Usuario = require("./usuario");
const Categoria = require('./categoria');
const TipoTransacao = require('./tipo_transacao')
const Transacoes = require('./transacoes')

require("./associations");

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true }); // Cria as tabelas automaticamente
    console.log("Banco de dados sincronizado!");

    console.log("Associações de Transacoes:", Transacoes.associations);
    console.log("Associações de TipoTransacao:", TipoTransacao.associations);
  } catch (error) {
    console.error("Erro ao sincronizar o banco:", error);
  }
};

module.exports = { sequelize, Usuario, Categoria, TipoTransacao, Transacoes, syncDB };

