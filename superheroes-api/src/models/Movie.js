const {DataTypes} = require("sequelize"); //As chaves servem para desestruturar o objeto DataTypes, que é um módulo do Sequelize que fornece tipos de dados para definir os campos do modelo.

const sequelize = require("../database/database");//../ serve para voltar uma pasta na estrutura do projeto. Ele é muito utilizado em JavaScript para importar arquivos que estão em outros diretórios.

const Movie = sequelize.define("Movie",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Movie;