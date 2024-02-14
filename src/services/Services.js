const dataSource = require("../database/models");

class Services {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async getAllRecords(where = {}) {
    return dataSource[this.model].findAll({ where: { ...where } });
  }

  async getRecordsByScope(scope) {
    return dataSource[this.model].scope(scope).findAll();
  }

  async getOneRecordById(id) {
    return dataSource[this.model].findByPk(id);
  }

  async getOneRecord(where) {
    return dataSource[this.model].findOne({ ...where });
  }

  async getAndCountRecords(options) {
    return dataSource[this.model].findAndCountAll({
      ...options,
    });
  }

  async createRecord(recordData) {
    return dataSource[this.model].create(recordData);
  }

  async updateRecord(dataUpdated, where) {
    const listOfRecordUpdated = dataSource[this.model].update(dataUpdated, {
      where: { ...where },
    });
    if (listOfRecordUpdated[0] === 0) {
      return false;
    }
    return true;
  }

  async deleteRecord(where) {
    return dataSource[this.model].destroy({ where: { ...where } });
  }
}

module.exports = Services;
