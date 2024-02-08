const Services = require("./Services.js");

class PessoaServices extends Services {
  constructor() {
    super("Pessoa");
  }

  async getMatriculasByEstudante(id) {
    const estudante = await super.getOneRecordById(id);
    const listMatriculas = await estudante.getMatriculas();
    // const listMatriculas = await estudante.aulasMatriculadas(); Utilizando o alias (as)
    return listMatriculas;
  }
}

module.exports = PessoaServices;
