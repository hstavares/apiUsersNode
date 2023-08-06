"use strict";

const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.get = async () => {
  const res = await User.find(
    {
      ativo: true,
    },
    "_id nomeCompleto email"
  );
  return res;
};

exports.getUserById = async (_id) => {
  const res = await User.findOne(
    {
      _id: _id,
      ativo: true,
    },
    "nomeCompleto email senha ativo"
  );
  return res;
};

exports.create = async (data) => {
  var user = new User(data);
  await user.save();
};

exports.update = async (_id, data) => {
  await User.findByIdAndUpdate(_id, {
    $set: {
      nomeCompleto: data.nomeCompleto,
      senha: data.senha,
      email: data.email,
    },
  });
};

exports.delete = async (_id) => {
  await User.findOneAndRemove({ _id: _id });
};

exports.authorize = async (data) => {
  const res = await User.findOne({
    email: data.email,
    senha: data.senha
  })
  return res;
}
