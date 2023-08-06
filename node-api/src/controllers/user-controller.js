"use strict";

const mongoose = require("mongoose");
const User = mongoose.model("User");
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/user-respository");
const md5 = require('md5');
const emailService = require('../services/email-service');

//list
exports.get = async (req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    error500(res);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    var data = await repository.getUserById(req.params._id);
    res.status(200).send(data);
  } catch (e) {
    error500(res);
  }
};
//create
exports.post = async (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(
    req.body.nomeCompleto,
    5,
    "O nome deve conter pelo menos 5 letras"
  );
  contract.hasMinLen(
    req.body.senha,
    8,
    "A senha deve conter pelo menos 8 digitos"
  );
  contract.isEmail(req.body.email, "Email incorreto");

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.create({
      nomeCompleto: req.body.nomeCompleto,
      email: req.body.email,
      senha: md5(req.body.senha + global.SALT_KEY)
    });
    
    // emailService.send(req.body.email, 'Bem vindo ao sistema!', global.EMAIL.TMPL.replace('{0}', req.body.nomeCompleto));
    
    res
      .status(201)
      .send({ sucess: true, message: "Usuario criado com sucesso!" });
  } catch (e) {
    error500(res);
  }
};

//update
exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params._id, req.body);
    res.status(200).send({ message: "produto atualizado com sucesso!"});
  } catch (e) {
    error500(res);
  }
};

//delete
exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.body._id);
    res.status(200).send({ message: "usuario deletado!" });
  } catch (e) {
    error500(res);
  }
};

function error500(res) {
  return res
    .status(500)
    .send({ sucess: false, message: "Falha ao processar requisição" });
}
