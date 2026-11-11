const { DataTypes } = require("sequelize");

const sequelize = require("../database/database");

// Define a tabela de heróis (o Sequelize cria a tabela "Heros" no SQLite).
const Hero = sequelize.define("Hero", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, // o banco gera o id sozinho
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    universe: {
        type: DataTypes.STRING,
        allowNull: false
    },
    power: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Hero;
