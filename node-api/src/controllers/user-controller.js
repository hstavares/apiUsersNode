"use strict";

const mongoose = require("mongoose");

const User = mongoose.model("User");

//list
exports.get = (req, res, next) => {
  User.find(
    {
      ativo: true,
    },
    "_id nomeCompleto email"
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getUserById = (req, res, next) => {
  User.findOne(
    {
      _id: req.params._id,
      ativo: true,
    },
    "nomeCompleto email senha ativo"
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send({});
    });
};
//create
exports.post = (req, res, next) => {
  var user = new User(req.body);
  //   user.nomeCompleto = req.body.nomeCompleto;
  //   user.email = req.body.email;
  //   user.ativo = req.body.ativo;
  //   user.senha = req.body.senha;
  user
    .save()
    .then((x) => {
      res.status(201).send({
        sucess: true,
        message: "Usuario criado com sucesso!",
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: "Falha ao cadastrar usuario",
        data: e,
      });
    });
};

//update
exports.put = (req, res, next) => {
  User.findByIdAndUpdate(req.params._id, {
    $set: {
      nomeCompleto: req.body.nomeCompleto,
      senha: req.body.senha,
      email: req.body.email,
    },
  })
    .then((x) => {
      res.status(200).send({
        sucess: true,
        message: "Usuario atualizado com sucesso!",
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: "Falha ao atualizar usuario!",
        data: e,
      });
    });
};

//delete
exports.delete =
  ("/:id",
  (req, res, next) => {
    const id = req.params.id;
    res.status(200).send(req.body);
  });
