const express = require('express');
const cors = require('cors');
const {dbConnetion} = require('../database/config');
const fileUpload = require('express-fileupload');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:       "/api/auth",
            buscar:     "/api/buscar",
            cargas:     "/api/uploads",
            usuarios:   "/api/usuarios",
            categorias: "/api/categorias",
            productos:  "/api/productos"
        }

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

        //carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use(this.paths.auth ,      require('../routes/auth'));
        this.app.use(this.paths.buscar ,    require('../routes/buscar'));
        this.app.use(this.paths.cargas ,    require('../routes/uploads'));
        this.app.use(this.paths.categorias ,require('../routes/categorias'));
        this.app.use(this.paths.productos , require('../routes/productos'));
        this.app.use(this.paths.usuarios ,  require('../routes/usuarios'));
    }   
    
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo');
        })
    }
}

module.exports = Server;