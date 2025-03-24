require('dotenv').config(); // Carregar variáveis do arquivo .env

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  dialect: 'postgres',
  logging: false, // Para desativar logs SQL, use 'true' para depuração
  dialectOptions: {
    ssl: {
      require: true, // Exige SSL
      rejectUnauthorized: false, // Para aceitar certificados SSL autoassinados
    },
  },
});

sequelize.authenticate()
  .then(() => {
    console.log("📡 Banco de dados conectado com sucesso!");
    sequelize.sync();
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar no banco de dados:", error.message);
  });

module.exports = sequelize;
