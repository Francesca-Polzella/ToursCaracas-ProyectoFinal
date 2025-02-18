// paso 1 conectar  desde mongoDB y crear la distancia 
const mongoose =require('mongoose')
//const userRouter= require('../controladores/users')
//const { response } = require('../app')



// paso 2 definir el Schema
const userSchema= new mongoose.Schema({
    Nombre:{
        type:String,
        require:true,
    },
    Apellido:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require:true
    },
    verified:{
        type:Boolean,
        default:false
    }
})

// paso tres configuar la respuesta al usario
userSchema.set('toJSON',{
  transform:(document,returnObject)=>{
    //resturnObject es lo que voy a solicitar
    returnObject.id =returnObject._id.toString()
    //creacion de nueva propieda que se llama id
    delete returnObject._id
    delete returnObject.__v
    delete returnObject.password
  }  
})

// paso 4 dar un nombre al modelo de datos
const user = mongoose.model('user',userSchema)
//se exporta
module.exports = user
