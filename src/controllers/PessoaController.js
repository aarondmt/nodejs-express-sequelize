const Controller = require("./Controller.js");
const PessoaServices = require("../services/PessoaServices.js");

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
  constructor() {
    super(pessoaServices);
  }

  async getMatriculasAtivas(req, res) {
    const { estudante_id } = req.params;
    try {
      const listMatriculas =
        await pessoaServices.getMatriculasByEstudanteAtivas(
          Number(estudante_id)
        );
      return res.status(200).json(listMatriculas);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Erro interno do servidor! ${error.message}` });
    }
  }

  async getMatriculas(req, res) {
    const { estudante_id } = req.params;
    try {
      const listMatriculas = await pessoaServices.getMatriculasByEstudante(
        Number(estudante_id)
      );
      return res.status(200).json(listMatriculas);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Erro interno do servidor! ${error.message}` });
    }
  }

  async getAllPessoas(req, res) {
    try {
      const pessoas = await pessoaServices.getPessoasScopeAll();
      return res.status(200).json(pessoas);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Erro interno do servidor! ${error.message}` });
    }
  }
}

module.exports = PessoaController;
