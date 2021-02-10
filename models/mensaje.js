const { Schema, model } = require('mongoose')

const MensajeShema = Schema({

  de: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  para: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  }
},{
  //Adiciona la fecha de creación y modificación
  timestamps: true,
});

//Serializar respuesta, para no exponer el password
MensajeShema.method('toJSON', function() {
  const { __v, ...object } = this.toObject();
  return object;
})

module.exports = model('Mensaje', MensajeShema)