const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TipoTransacao = sequelize.define("tipo_transacao", {
  tipo_transacao_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  transacao: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  tableName: "tipo_transacao",
  timestamps: false,
});

module.exports = TipoTransacao;
