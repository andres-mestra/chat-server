

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            //TODO: Validar jwt
            // si jwt no es valido, desconectar

            //TODO: Saber que usuario esta activo mediante UID
            
            //TODO: Emitir todos los usuarios conectados

            //TODO: Socket join, uid

            //TODO: Escuchar cuando el cliente envia un mensaje
            //mensaje-personal

            //TODO: Disconnect
            //Marcar en db que el usuario se desconecto
        
        });
    }


}


module.exports = Sockets;