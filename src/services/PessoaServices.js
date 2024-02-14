const Services = require("./Services.js");

class PessoaServices extends Services {
  constructor() {
    super("Pessoa");
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
}

module.exports = PessoaServices;
