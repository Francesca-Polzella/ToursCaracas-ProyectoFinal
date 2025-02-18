//const express = require('express');
//const { Verify } = require('mz/crypto.js');
const userRouter = require('express').Router();
const User = require('../modelo/user')

// Mueve la importación del modelo `user` dentro de las rutas para evitar dependencias circulares
userRouter.post('/', async (request, response) => {
    //const user = require('../modelo/user.js');
    const { Nombre, Apellido, Email, Password, Password2 } = request.body;
    console.log(Nombre, Apellido, Email, Password, Password2);

    if (!Nombre || !Apellido || !Email || !Password || !Password2) {
        return response.status(404).json({ error: 'Todos los campos son requeridos' });
    } else {
        try {
            // Guardar en la base de datos
            let usuario = new User();
            usuario.Nombre = Nombre;
            usuario.Apellido = Apellido;
            usuario.Email = Email;
            usuario.Password = Password;

            await usuario.save();
            const usuarios = await user.find();
            console.log(usuarios);

            return response.status(200).json({ msg: 'Se ha creado nuevo usuario' });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: 'Error al guardar el usuario' });
        }
    }
});

// Editar el usuario
userRouter.post('/edit-user', async (req, res) => {
    const user = require('../modelo/user.js');
    // Implementar la lógica para editar el usuario
    try{
      const {Nombre,Apellido,Email,Password,Password2,id} = req.body
      if(!Nombre && !Apellido && !Email && !Password && !Password2){
         return res.status(200).json({error:'Todods los campos son obligatorios'})
      }else{
         const updateUser = await user.findOneAndUpdate({_id:id},
            {Nombre:Nombre,
               Email:Email,
               Password:Password})
               await updateUser.save()
            return res.status(200).json({msg:'Se han actualizado los datos correctamente'})
      }

    }catch(error){
      return res.status(404).json({error:'Error'})
    }
});

// Eliminar usuario
userRouter.post('/eliminar-user', async (req, res) => {
    const user = require('../modelo/user.js');
    // Implementar la lógica para eliminar el usuario
    const {id}= req.body

    try{
      const usario = await user.deleteOne({_id:id})
      return res.status(200).json({msg:'Se elimino el usuario'})
    }catch (error){
      return res.status(404).json({error:'Error'})
    }
});

// Consultar usuario
userRouter.get('/consultar-user', async (req, res) => {
    //const user = require('../modelo/user.js');
    // Implementar la lógica para consultar el usuario
});

// Listado de usuarios
userRouter.get('/lista-user', async (req, res) => {
   console.log('hola')
    //const user = require('../modelo/user.js');
    // Implementar la lógica para listar los usuarios
   try{
   //user = new user()
      const listado = await User.find()
      console.log(listado)
      return res.status(200).json({texOk:true,data:listado})
   }catch(error){
    //  return res.status(404).json({error:'Ha ocurrido un error'})
   }
});

//verificar el registro
userRouter.get('/validar-confirmacion/:email',async(req,res)=>{
   try{
      //obtener los parametros de res
      const {Email} = res.param
      console.log(Email)

      //verificar que el usuario est verificado
       const usuario =await user.findOne({Email:Email})
      if(!usuario){
         res.send('Error: El usuario no esta registrado')
      }else if(usuario.verified){
         res.send('Error: Eel usuario ya esta registrado')
      }else{
         //actualizar la verificacion
         const actualizarUsusario = await user.findOneAndUpdate({Email:Email},{verified:true})
         await actualizarUsusario.save()
         //redireccionar
         //return res.redirect()
         // falta crear la ruta de frontend para la confirmacion 
      }

   }catch(error){
      console.log(error)
   }
})

module.exports = userRouter;