const argon2 = require('argon2');
const  { response } = require('express');
const { generarJWT } = require('../helpers/generarJWT');
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
    //Encriptar contraseña
    usuario.password = await argon2.hash( password )
    //Guardar usuario
    await usuario.save(); 
    //Generar el JWT
    const token = await generarJWT(usuario.uid)

    return res.status(201).json({
      ok: true,
      usuario: usuario.toJSON(),
      token
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

  try {

    const usuario =  await Usuario.findOne({ email })
    //Verificar si el email existe
    if(!usuario){
      return res.status(404).json({
        ok: false,
        msg: 'Email o Password no es correcto'
      })
    }

    //Verificar el password
    const validPassword = await argon2.verify( usuario.password, password )
    if ( !validPassword ) {
      return res.status(404).json({
        ok: false,
        msg: 'Password o Email no es correcto'
      })
    }

    //Generar token
    const token  = await generarJWT(usuario.id);

    return res.status(200).json({
      ok: true,
      usuario: usuario.toJSON(),
      token
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false, 
      msg: 'Hable con el administrador'
    })
  }

}

const renewToke = async (req, res = response) => {

  const { uid } = req;
  
  //Generar un nuevo token
  const token = await generarJWT(uid);

  // Obtener el usuario por UID
  const usuario = await Usuario.findById( uid );


  return res.json({
    ok: true,
    usuario: usuario.toJSON(),
    token,
  }) 
}

module.exports = {
  crearUsuario,
  login,
  renewToke,
}