const express = require("express");
const router = express.Router();
const heroesController = require("../controllers/heroes.controller.js");

// Coleção
router.get("/", heroesController.list);        // GET    /heroes  lista todos
router.post("/", heroesController.create);     // POST   /heroes  cria um herói

// Item específico (":id" vira req.params.id)
router.get("/:id", heroesController.getById);  // GET    /heroes/1  busca um herói
router.put("/:id", heroesController.replace);  // PUT    /heroes/1  substitui o herói inteiro
router.patch("/:id", heroesController.update); // PATCH  /heroes/1  atualiza só alguns campos
router.delete("/:id", heroesController.remove);// DELETE /heroes/1  remove o herói

module.exports = router;
