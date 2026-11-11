const express = require("express");
const Hero = require("./models/Hero");
const Movie = require("./models/Movie");
const heroesRoutes = require("./routes/heroes.routes.js");

const app = express();

// Middleware ("ponte") que lê o corpo (body) das requisições em JSON e o coloca em req.body
app.use(express.json());

// Alterei pois estava criando duas tabelas diferentes (não sei se era prorposital),
// porém mexi pensando no relacionamneto N:N.
Hero.belongsToMany(Movie, { through: "HeroMovies" });
Movie.belongsToMany(Hero, { through: "HeroMovies" });

// Todas as rotas de heróis começam com /heroes
app.use("/heroes", heroesRoutes);

// Middleware de 404: roda quando nenhuma rota acima respondeu.
app.use((req, res) => {
    return res.status(404).json({ message: "Rota não encontrada." });
});

app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ message: "JSON inválido no corpo da requisição." });
    }

    console.error(err);
    return res.status(500).json({ message: "Erro interno do servidor." });
});

module.exports = app;
