const express = require('express');
const userRouter = express.Router();
const User = require('../modelo/user');

// Ruta para crear un nuevo usuario
userRouter.post('/', async (request, response) => {
    const { Nombre, Apellido, Email, Password, Password2 } = request.body;
    console.log(Nombre, Apellido, Email, Password, Password2);

    if (!Nombre || !Apellido || !Email || !Password || !Password2) {
        return response.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    if (Password !== Password2) {
        return response.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return response.status(400).json({ error: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario
        const usuario = new User({
            Nombre,
            Apellido,
            Email,
            Password
        });

        await usuario.save();
        return response.status(201).json({ msg: 'Se ha creado nuevo usuario' });
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        return response.status(500).json({ error: 'Error al guardar el usuario' });
    }
});

// Ruta para editar un usuario
userRouter.post('/edit-user', async (req, res) => {
    const { Nombre, Apellido, Email, Password, Password2, id } = req.body;

    if (!Nombre || !Apellido || !Email || !Password || !Password2) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    if (Password !== Password2) {
        return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    try {
        const updateUser = await User.findByIdAndUpdate(id, {
            Nombre,
            Apellido,
            Email,
            Password
        }, { new: true });

        if (!updateUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        return res.status(200).json({ msg: 'Se han actualizado los datos correctamente' });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

// Ruta para eliminar un usuario
userRouter.post('/eliminar-user', async (req, res) => {
    const { id } = req.body;

    try {
        const usuario = await User.findByIdAndDelete(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        return res.status(200).json({ msg: 'Se eliminó el usuario' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        return res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});

// Ruta para listar los usuarios
userRouter.get('/lista-user', async (req, res) => {
    try {
        const listado = await User.find();
        return res.status(200).json({ texOk: true, data: listado });
    } catch (error) {
        console.error('Error al listar los usuarios:', error);
        return res.status(500).json({ error: 'Error al listar los usuarios' });
    }
});

module.exports = userRouter;