const Sequelize = require("sequelize");
const Controller = require("./Controller.js");
const MatriculaServices = require("../services/MatriculaServices.js");

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor() {
    super(matriculaServices);
  }

  async getMatriculasPorEstudante(req, res) {
    const { estudante_id } = req.params;
    try {
      const { count, rows } = await matriculaServices.getAndCountRecords({
        where: { estudante_id: Number(estudante_id), status: "matriculado" },
        limit: 2,
        order: [["id", "DESC"]],
      });
      return res.status(200).json({ quantidade: count, matriculas: rows });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro interno do servidor! ${error.message}` });
    }
  }

  async getCursosLotados(req, res) {
    const lotacaoCurso = 2;
    try {
      const cursosLotados = await matriculaServices.getAndCountRecords({
        where: { status: "matriculado" },
        attributes: ["curso_id"],
        group: ["curso_id"],
        having: Sequelize.literal(`count(curso_id) >= ${lotacaoCurso}`),
      });
      return res.status(200).json(cursosLotados.count);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro interno do servidor! ${error.message}` });
    }
  }
}

module.exports = MatriculaController;
