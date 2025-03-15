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

// Nueva ruta de login
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario por email
        const usuario = await User.findOne({ Email: email });
        
        if (!usuario) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        // Verificar contraseña
        if (usuario.Password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Contraseña incorrecta'
            });
        }

        // Verificar si es admin
        if (email === 'admin@gmail.com' && usuario._id.toString() === '67d0d61817116778bf178167') {
            return res.json({
                success: true,
                user: {
                    id: usuario._id,
                    email: usuario.Email,
                    nombre: usuario.Nombre,
                    rol: 'admin'
                }
            });
        }

        // Usuario normal
        res.json({
            success: true,
            user: {
                id: usuario._id,
                email: usuario.Email,
                nombre: usuario.Nombre,
                rol: 'user'
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        });
    }
});

module.exports = userRouter;