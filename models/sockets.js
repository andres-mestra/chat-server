const { comprobarJWT } = require("../helpers/generarJWT");


class Sockets {

    constructor(io) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {

            const [valido, uid] = comprobarJWT(socket.handshake?.query['x-token'])
            if (!valido) {
                console.log('Socket no identificado');
                return socket.disconnect();
            }
            
            console.log( 'Cliente conectado', uid )

            //TODO: Validar jwt
            // si jwt no es valido, desconectar

            //TODO: Saber que usuario esta activo mediante UID

            //TODO: Emitir todos los usuarios conectados

            //TODO: Socket join, uid

            //TODO: Escuchar cuando el cliente envia un mensaje
            //mensaje-personal

            //TODO: Disconnect
            //Marcar en db que el usuario se desconecto
            socket.on('disconnect', () => {
                console.log( 'Cliente desconectado', uid )
            })

        });
    }


}


module.exports = Sockets;