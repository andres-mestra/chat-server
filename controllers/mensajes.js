const { response, request } = require("express");
const Mensaje = require("../models/mensaje");


const obtenerChat = async (req = request, res = response) => {

  const miId = req.uid;
  const mensajeDe = req.params.de;

  try {

    const last30 = await Mensaje.find({
      $or: [
        { de: miId, para: mensajeDe },
        { de: mensajeDe, para: miId },
      ]
    })
      .sort({ createdAt: 'desc' })
      .limit(30)

    return res.json({
      ok: true,
      mensajes: last30,
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }

}

module.exports = {
  obtenerChat,
}