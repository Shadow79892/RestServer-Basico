const {model,Schema} = require('mongoose');


//Esquema para la creacion de usuarios.
const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true,'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'La contraseña es obligatorio']
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required: true
        // enum: ['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },

});


//esto es para retirar la password para que no sea vista en el front end.
UsuarioSchema.methods.toJSON = function(){
    const {__v,password,_id,...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}




module.exports = model('Usuario', UsuarioSchema);