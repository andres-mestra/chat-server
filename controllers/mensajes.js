const { response } = require("express");


const obtenerChat = ( req, res = response ) => {
  
  const miId = req.uid;

  return res.json({
    ok: true,
    miId,
  })

}

module.exports = {
  obtenerChat,
}