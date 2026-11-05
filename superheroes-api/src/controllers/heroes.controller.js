const Hero = require("../models/Hero.js")

// assícrona = assim que acabar ela já retorna, não espera
async function list(req, res) {  
    const movies = await Hero.findAll()
    return res.status(200).json(movies);
};

async function create(req, res){
    const {name, universe, power} = req.body;

    if (!name || !universe || !power){
        return res.status(400).json({
            message: "Nome, universo e poder são obrigatórios."
        });
    }

    const hero = await Hero.create({name, universe, power})
    return res.status(201).json(hero);
}

module.exports = {
    list,
    create
};

