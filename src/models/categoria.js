const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Categoria = sequelize.define('categoria', {
  categoria_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'categoria',  
  timestamps: false        
});

module.exports = Categoria;
