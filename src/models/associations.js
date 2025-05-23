const TipoTransacao = require("./tipo_transacao");
const Transacoes = require("./transacoes");
const Categoria = require('./categoria');
const Usuario = require('./usuario')
const Perfil = require('./perfil')

// Uma categoria pode ter várias transações
Categoria.hasMany(Transacoes, {
  foreignKey: "categoria_id",
});

// Um tipo de transação (entrada/saída) pode ter várias transações
TipoTransacao.hasMany(Transacoes, {
  foreignKey: "tipo_transacao_id",
});

// Cada transação pertence a uma categoria
Transacoes.belongsTo(Categoria, {
  foreignKey: "categoria_id",
});

// Cada transação pertence a um tipo de transação (entrada/saída)
Transacoes.belongsTo(TipoTransacao, {
  foreignKey: "tipo_transacao_id",
});

// Um usuário tem um perfil
Usuario.hasOne(Perfil, {
  foreignKey: "usuario_id",
});

// E o perfil pertence a um usuário
Perfil.belongsTo(Usuario, {
  foreignKey: "usuario_id"
});



module.exports = { TipoTransacao, Transacoes, Categoria, Usuario, Perfil };
