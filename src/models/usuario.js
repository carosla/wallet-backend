const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define('usuarios', {
  usuario_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dt_criacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Preenche automaticamente com a data e hora atual
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,  // Define um valor padrão como 'false' para admin
  },
}, {
  sequelize,
  tableName: 'usuarios',  // Nome da tabela
  timestamps: false,      // Desabilita colunas de createdAt e updatedAt
});

module.exports = Usuario;  // Certifique-se de exportar o modelo corretamente
