const TipoTransacao = require("./tipo_transacao");
const Transacoes = require("./transacoes");

TipoTransacao.hasMany(Transacoes, {
  foreignKey: "tipo_transacao_id",
});

Transacoes.belongsTo(TipoTransacao, {
  foreignKey: "tipo_transacao_id",
});

module.exports = { TipoTransacao, Transacoes };
