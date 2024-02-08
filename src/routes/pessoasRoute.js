const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController.js");

const pessoaController = new PessoaController();

const router = Router();

router.get("/pessoas", (req, res) => pessoaController.getAll(req, res));
router.get("/pessoas/:id", (req, res) => pessoaController.getById(req, res));
router.post("/pessoas", (req, res) => pessoaController.add(req, res));
router.put("/pessoas/:id", (req, res) => pessoaController.update(req, res));
router.delete("/pessoas/:id", (req, res) => pessoaController.remove(req, res));

module.exports = router;
