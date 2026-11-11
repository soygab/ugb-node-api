const path = require("path");
const { Sequelize } = require("sequelize");

// Configura a conexão com o SQLite.
// path.join(__dirname, ...) monta o caminho a partir DESTE arquivo, e não
// da pasta onde o comando "node" foi executado. Com "./database.sqlite" o
// banco mudava de lugar dependendo de onde eu rodava o projeto.
// __dirname = src/database  ->  ../../ sobe até a raiz de superheroes-api
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "..", "..", "database.sqlite"),
    logging: false // coloque console.log para ver o SQL gerado pelo Sequelize
});

module.exports = sequelize;
