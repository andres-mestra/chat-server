const { request, response } = require('express');
const jwt = require('jsonwebtoken')

const validarJWT = ( req = request , res = response, next ) => {
  try {

    const token = req.header('x-token');
    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: 'No hay token en la petición'
      })
    }

    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    next();

  } catch (error) {
    console.log(error)
    return res.status(401).json({
      ok: false,
      msg: 'Token no es valido',
    });
  }
}

module.exports = {
  validarJWT
}