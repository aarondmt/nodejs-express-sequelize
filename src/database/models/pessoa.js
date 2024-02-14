"use strict";
const isCpfValid = require("../../utils/validCpfHelper.js");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.hasMany(models.Curso, {
        foreignKey: "docente_id",
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: "estudante_id",
        scope: { status: "matriculado" },
        as: "aulasMatriculadas",
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: "estudante_id",
      });
    }
  }

  Pessoa.init(
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [4, 30],
            msg: "O nome deve ter no mínimo 3 e no máximo 30 caracteres.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "Formato do email inválido.",
          },
        },
      },
      cpf: {
        type: DataTypes.STRING,
        validate: {
          cpfIsValid: (cpf) => {
            if (!isCpfValid(cpf)) throw new Error("CPF inválido.");
          },
        },
      },
      ativo: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pessoa",
      tableName: "pessoas",
      paranoid: true,
      defaultScope: {
        where: { ativo: true },
      },
      scopes: {
        allRecords: {
          where: {},
        },
      },
    }
  );

  return Pessoa;
};
