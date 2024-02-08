const dataSource = require("../models");

class Services {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async getAllRecords() {
    return dataSource[this.model].findAll();
  }

  async getOneRecordById(id) {
    return dataSource[this.model].findByPk(id);
  }

  async createRecord(recordData) {
    return dataSource[this.model].create(recordData);
  }

  async updateRecord(dataUpdated, id) {
    const listOfRecordUpdated = dataSource[this.model].update(dataUpdated, {
      where: { id: id },
    });
    if (listOfRecordUpdated === 0) {
      return false;
    }
    return true;
  }

  async deleteRecord(id) {
    return dataSource[this.model].destroy({ where: { id: id } });
  }
}

module.exports = Services;
