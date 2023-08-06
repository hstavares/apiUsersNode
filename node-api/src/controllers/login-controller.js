"use strict";

const mongoose = require("mongoose");
const User = mongoose.model("User");
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/user-respository");
const md5 = require("md5");
const authService = require("../services/auth-service");

exports.authenticate = async (req, res, next) => {
  try {
    const user = await repository.authorize({
      email: req.body.email,
      senha: md5(req.body.senha + global.SALT_KEY),
    });

    if (!user) {
      res.status(404).send({ message: "usuario ou senha inválido(s)" });
      return;
    }

    const token = await authService.generateToken({
      _id: user._id,
      email: user.email,
      nome: user.nomeCompleto,
    });

    res.status(200).send({
      token: token,
      data: {
        _id: user._id,
        email: user.email,
        nome: user.nomeCompleto,
      },
    });
  } catch (e) {
    res.status(500).send({ message: "falha ao processar requisição" });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);

    const user = await repository.getUserById(data._id);

    if (!user) {
      res.status(401).send({ message: "Sessão expirou" });
      return;
    }

    const tokenData = await authService.generateToken({
      _id: user._id,
      email: user.email,
      nome: user.nomeCompleto,
    });
    res.status(200).send({
      token: token,
      data: {
        _id: user._id,
        email: user.email,
        nome: user.nomeCompleto,
      },
    });
  } catch (e) {
    res.status(500).send({ message: "falha ao processar requisição" });
  }
};
