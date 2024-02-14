const dataSource = require("../database/models");
const Services = require("./Services.js");

class PessoaServices extends Services {
  constructor() {
    super("Pessoa");
    this.matriculaServices = new Services("Matricula");
  }

  async getMatriculasByEstudanteAtivas(id) {
    const estudante = await super.getOneRecordById(id);
    const listMatriculas = await estudante.getAulasMatriculadas(); // Utilizando o alias (as)
    return listMatriculas;
  }

  async getMatriculasByEstudante(id) {
    const estudante = await super.getOneRecordById(id);
    const listMatriculas = await estudante.getMatriculas();
    return listMatriculas;
  }

  async getPessoasScopeAll() {
    const pessoas = await super.getRecordsByScope("allRecords");
    return pessoas;
  }

  async cancelPessoaAndMatriculas(estudanteId) {
    return dataSource.sequelize.transaction(async (transacao) => {
      await super.updateRecord(
        { ativo: false },
        { id: estudanteId },
        transacao
      );
      await this.matriculaServices.updateRecord(
        { status: "cancelado" },
        { estudante_id: estudanteId },
        transacao
      );
    });
  }
}

module.exports = PessoaServices;
