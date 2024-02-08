const Controller = require("./Controller.js");
const PessoaServices = require("../services/PessoaServices.js");

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
  constructor() {
    super(pessoaServices);
  }

  async getMatriculas(req, res) {
    const { estudanteId } = req.params;
    try {
      const listMatriculas = await pessoaServices.getMatriculasByEstudante(
        Number(estudanteId)
      );
      return res.status(200).json(listMatriculas);
    } catch (error) {
      req
        .status(500)
        .json({ message: `Erro interno do servidor! ${error.message}` });
    }
  }
}

module.exports = PessoaController;
