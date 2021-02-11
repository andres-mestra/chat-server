const  { response } = require('express')


const crearUsuario = async (req, res = response ) => {
  return res.json({
    ok: true,
    usuario: 'ABC',
  })
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