const express = require('express');
const cors = require('cors');
const {dbConnetion} = require('../database/config')

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios";
        this.authPath =  "/api/auth";

        //conectar a db
        this.conectarDB();

        this.middlewares();
        //rutas de mi aplicacion
        this.routes();
    }
    async conectarDB(){
        await dbConnetion();
    }

    middlewares(){
        //cors
        this.app.use(cors());


        //lectura y parseo del body
        this.app.use(express.json());


        //directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.authPath , require('../routes/auth'));
        this.app.use(this.usuariosPath , require('../routes/usuarios'));
    }
    
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo');
        })
    }
}

module.exports = Server;