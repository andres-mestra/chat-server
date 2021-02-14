const Usuario = require('../models/usuario')

const  usuarioConectado = async (uid) => {
  const usuario = await Usuario.findById(uid);
  usuario.online = true;
  await usuario.save();
  return usuario.toJSON();
}

const usuarioDesconectado = async (uid) => {
  const usuario = await Usuario.findById(uid);
  usuario.online = false;
  await usuario.save()
  return usuario.toJSON();
}

const getUsuarios = async () => {
  
  const usuarios = await Usuario
  .find()
  .sort('-online')

  return usuarios;
}


module.exports = {
  usuarioConectado,
  usuarioDesconectado,
  getUsuarios,
}