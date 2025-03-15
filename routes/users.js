const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
axios.get('/api/users/admin/dashboard', {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});const User = require('../modelo/user');
const validarAdmin = require('../middleware/authAdmin');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(4000).json({ 
                success: false, 
                message: 'Credenciales inválidas' 
            });
        }

        // Comparar contraseña
        const coincidePassword = await bcrypt.compare(password, usuario.password);
        if (!coincidePassword) {
            return res.status(4000).json({ 
                success: false, 
                message: 'Credenciales inválidas' 
            });
        }

        // Crear token JWT
        const token = jwt.sign(
            { userId: usuario._id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: usuario._id,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.error('Error de login:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error del servidor' 
        });
    }JWT_SECRET=tu_clave_secreta_aqui
});

// Ruta protegida solo para administradores
router.get('/admin/dashboard', validarAdmin, async (req, res) => {
    try {
        // Solo los administradores pueden acceder aquí
        const usuarios = await User.find().select('-password');
        res.json({
            success: true,
            data: usuarios
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener datos' 
        });
    }
});

// Actualiza la ruta de login para incluir el rol en la respuesta
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await User.findOne({ correo: email });
        
        if (!usuario) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        // Para el admin específico
        if (usuario.correo === 'admin@gmail.com') {
            return res.json({
                success: true,
                token: 'token_admin',
                user: {
                    _id: usuario._id,
                    correo: usuario.correo,
                    rol: 'admin',
                    nombre: usuario.nombre
                }
            });
        }

        // Para otros usuarios...
        res.json({
            success: true,
            token: 'token_usuario',
            user: {
                _id: usuario._id,
                correo: usuario.correo,
                rol: 'usuario',
                nombre: usuario.nombre
            }
        });

    } catch (error) {
        console.error('Error de login:', error);
        res.status(500).json({
            success: false,
            message: 'Error del servidor'
        });
    }
});

module.exports = router;