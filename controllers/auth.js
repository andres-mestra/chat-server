const argon2 = require('argon2');
const  { response } = require('express')
const Usuario = require(('../models/usuario'))

const crearUsuario = async (req, res = response ) => {

  const { nombre, email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email })
    if( usuario ){
      return res.status(400).json({
        ok: false,
        msg: 'Existe un usuario con este email',
      })
    }

    usuario = new Usuario(req.body)
    usuario.password = await argon2.hash( password )
    await usuario.save(); 
    usuario = usuario.toJSON()
    

    return res.status(201).json({
      ok: true,
      uid: usuario.uid,
      nombre: usuario.nombre,
    })

    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false, 
      msg: 'Hable con el administrador'
    })
  }

}

const login = async (req, res = response) => {

  const { email, password } = req.body;

  return res.json({
    ok: true,
    msg: 'login',
    email,
    password,
  })
}

const renewToke = async (req, res = response) => {
  return res.json({
    ok: true,
    msg:  'renew'
  }) 
}

module.exports = {
  crearUsuario,
  login,
  renewToke,
}