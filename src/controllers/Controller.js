const dataSource = require("../database/models");
const converteIds = require("../utils/conversorDeStringHelper.js");

class Controller {
  constructor(entityService) {
    this.entityService = entityService;
  }

  async getAll(req, res) {
    try {
      const listEntities = await this.entityService.getAllRecords();
      return res.status(200).json(listEntities);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro interno do servidor! ${error.message}` });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const oneEntity = await this.entityService.getOneRecordById(id);
      return res.status(200).json(oneEntity);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro interno do servidor! ${error.message}` });
    }
  }

  async getOne(req, res) {
    const { ...params } = req.params;
    const where = converteIds(params);
    try {
      const oneEntity = await this.entityService.getOneRecord(where);
      return res.status(200).json(oneEntity);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro interno do servidor! ${error.message}` });
    }
  }

  async add(req, res) {
    const dataToCreating = req.body;
    const transaction = await dataSource.sequelize.transaction();
    try {
      const dataCreated = await this.entityService.createRecord(
        dataToCreating,
        transaction
      );
      await transaction.commit();
      return res.status(201).json(dataCreated);
    } catch (error) {
      await transaction.rollback();
      return res
        .status(500)
        .json({ message: `Erro interno do servidor! ${error.message}` });
    }
  }

  async update(req, res) {
    const { ...params } = req.params;
    const where = converteIds(params);
    const newDataToUpdate = req.body;
    try {
      const isUpdated = await this.entityService.updateRecord(
        newDataToUpdate,
        where
      );
      if (!isUpdated) {
        return res.status(400).json({ message: "Registro não foi atualizado" });
      }
      return res
        .status(200)
        .json({ message: "O registro foi atualizado com sucesso!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro interno do servidor! ${error.message}` });
    }
  }

  async remove(req, res) {
    const { ...params } = req.params;
    const where = converteIds(params);
    try {
      await this.entityService.deleteRecord(where);
      return res.status(200).json({ message: "Dado apagado com sucesso!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro interno do servidor! ${error.message}` });
    }
  }
}

module.exports = Controller;
