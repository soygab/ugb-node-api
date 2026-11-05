const express = require("express");
const router = express.Router();
const heroesController = require("../controllers/heroes.controller.js")

router.get("/", heroesController.list);
router.post ("/", heroesController.create);

module.exports = router;