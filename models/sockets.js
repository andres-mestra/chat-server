const { comprobarJWT } = require("../helpers/generarJWT");
const { 
    usuarioConectado, 
    usuarioDesconectado, 
    getUsuarios,
    grabarMensaje, 
} = require("../controllers/sockets");


class Sockets {

    constructor(io) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {
             
            //Validar jwt
            // si jwt no es valido, desconectar
            const [valido, uid] = comprobarJWT(socket.handshake?.query['x-token'])
            if (!valido) {
                console.log('Socket no identificado');
                return socket.disconnect();
            }

            //Marcar en db que el usuario se conecto
            await usuarioConectado(uid);

            //Unir a una sala de socket.io
            socket.join( uid );

            //TODO: Saber que usuario esta activo mediante UID

            //Emitir todos los usuarios conectados
            this.io.emit('lista-de-usuarios', await getUsuarios())

            //TODO: Socket join, uid

            //TODO: Escuchar cuando el cliente envia un mensaje
            socket.on('mensaje-personal', async (payload) => {
                const mensaje = await grabarMensaje(payload)
            })
            //mensaje-personal


            
            //Marcar en db que el usuario se desconecto
            socket.on('disconnect',  async () => {
                await usuarioDesconectado(uid)

                //Emitir todos los usuarios conectados
                this.io.emit('lista-de-usuarios', await getUsuarios())
            })

        });
    }


}


module.exports = Sockets;