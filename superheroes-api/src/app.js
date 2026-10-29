const express = require("express");
const sequelize = require("./database/database");
const Hero = require("./models/Hero");
const Movie = require("./models/Movie");
const app = express();

Hero.belongsToMany(Movie, {
    through: "HeroMovies" 
});

Movie.belongsToMany(Hero, {
    through: "MoviesHero" 
});

sequelize
    .sync()
    .then(() => {})
    .catch((error) => {})
module.exports = app;