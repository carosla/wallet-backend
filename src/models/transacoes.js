const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const TipoTransacao = require("./tipo_transacao");

const Transacoes = sequelize.define("transacoes", {
  transacao_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "categoria",
      key: "categoria_id",
    },
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "usuario_id",
    },
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tipo_transacao_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "tipo_transacao",
      key: "tipo_transacao_id",
    },
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Sem descrição"
  },
}, {
  sequelize,
  tableName: "transacoes",
  timestamps: false,
});

module.exports = Transacoes;
