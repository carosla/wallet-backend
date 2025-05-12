const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Perfil = sequelize.define('perfil', {
  perfil_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  foto_perfil: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "usuario_id",
    },
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'perfil',  
  timestamps: false        
});

module.exports = Perfil;
