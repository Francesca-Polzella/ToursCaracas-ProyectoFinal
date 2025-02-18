const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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

userSchema.set('toJSON',{
    transform:(document,returnObject)=>{
        returnObject.id = returnObject._id.toString()
        delete returnObject._id

    }
})

const User = mongoose.model('User',userSchema)

module.exports = User