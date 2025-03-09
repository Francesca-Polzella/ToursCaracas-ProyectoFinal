const express = require('express');
const userRouter = express.Router();
const User = require('../modelo/user');

// Ruta para crear un nuevo usuario
userRouter.post('/', async (req, res) => {
    const { Nombre, Apellido, Email, Password, Password2 } = req.body;

    if (!Nombre || !Apellido || !Email || !Password || !Password2) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    if (Password !== Password2) {
        return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario
        const usuario = new User({
            Nombre,
            Apellido,
            Email,
            Password
        });

        await usuario.save();
        return res.status(201).json({ msg: 'Se ha creado nuevo usuario' });
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        return res.status(500).json({ error: 'Error al guardar el usuario' });
    }
});

module.exports = userRouter;