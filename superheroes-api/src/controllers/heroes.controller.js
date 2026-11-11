const Hero = require("../models/Hero.js");

const FIELDS = ["name", "universe", "power"];

// Verifica se o valor é uma string com algum conteúdo (não vazia nem só espaços).
function isFilledString(value) {
    return typeof value === "string" && value.trim() !== "";
}

// Busca o herói pelo id da URL.
// Devolve o herói, ou null (e já responde com o erro) se o id for inválido
// ou o herói não existir. Assim não repete essa lógica em cada endpoint.
async function findHeroOrRespond(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ message: "O id deve ser um número inteiro positivo." });
        return null;
    }

    const hero = await Hero.findByPk(id); // findByPk = busca pela chave primária
    if (!hero) {
        res.status(404).json({ message: "Herói não encontrado." });
        return null;
    }

    return hero;
}

// GET /heroes
// Assícrona = assim que acabar ela já retorna, não espera.
async function list(req, res) {
    const heroes = await Hero.findAll(); 
    return res.status(200).json(heroes);
}

// GET /heroes/:id
async function getById(req, res) {
    const hero = await findHeroOrRespond(req, res);
    if (!hero) return; // a resposta de erro já foi enviada

    return res.status(200).json(hero);
}

// POST /heroes
async function create(req, res) {
    const { name, universe, power } = req.body ?? {};

    if (![name, universe, power].every(isFilledString)) {
        return res.status(400).json({
            message: "Nome, universo e poder são obrigatórios."
        });
    }

    const hero = await Hero.create({
        name: name.trim(),
        universe: universe.trim(),
        power: power.trim()
    });

    return res.status(201).json(hero); // 201 = Created
}

// PUT /heroes/:id
// Substituição COMPLETA: o cliente deve enviar todos os campos.
// (Diferente do PATCH, que aceita só os campos que quer mudar.)
async function replace(req, res) {
    const hero = await findHeroOrRespond(req, res);
    if (!hero) return;

    const { name, universe, power } = req.body ?? {};

    if (![name, universe, power].every(isFilledString)) {
        return res.status(400).json({
            message: "PUT exige nome, universo e poder. Para atualizar só alguns campos, use PATCH."
        });
    }

    await hero.update({
        name: name.trim(),
        universe: universe.trim(),
        power: power.trim()
    });

    return res.status(200).json(hero);
}

// PATCH /heroes/:id
// Atualização PARCIAL: altera só os campos enviados no body.
async function update(req, res) {
    const hero = await findHeroOrRespond(req, res);
    if (!hero) return;

    const body = req.body ?? {};
    const changes = {};

    for (const field of FIELDS) {
        // "in" verifica se o campo foi enviado, mesmo que o valor seja inválido
        if (field in body) {
            if (!isFilledString(body[field])) {
                return res.status(400).json({
                    message: `O campo "${field}" deve ser um texto não vazio.`
                });
            }
            changes[field] = body[field].trim();
        }
    }

    if (Object.keys(changes).length === 0) {
        return res.status(400).json({
            message: "Envie ao menos um campo para atualizar: name, universe ou power."
        });
    }

    await hero.update(changes);
    return res.status(200).json(hero);
}

// DELETE /heroes/:id
async function remove(req, res) {
    const hero = await findHeroOrRespond(req, res);
    if (!hero) return;

    await hero.destroy();
    return res.status(204).send(); // 204 = No Content (deu certo, não tem conteúdo na resposta)
}

module.exports = {
    list,
    getById,
    create,
    replace,
    update,
    remove
};
