const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../modelo/user');
const validarAdmin = require('../middleware/authAdmin');

// Corregir la ruta del endpoint
router.post('/login', async (req, res) => {
    try {
        const { Email, Password } = req.body;
        console.log('Received credentials:', { Email, Password }); // Debug log

        // Verificación directa para admin
        if (Email === 'admin@gmail.com' && Password === 'Hola12345!') {
            // Crear token sin verificar en base de datos
            const adminToken = jwt.sign(
                { 
                    role: 'admin'
                },
                process.env.JWT_SECRET || 'tu_clave_secreta_aqui',
                { expiresIn: '24h' }
            );

            return res.status(200).json({
                success: true,
                token: adminToken,
                user: {
                    email: Email,
                    role: 'admin'
                }
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Credenciales inválidas'
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            success: false,
            message: 'Error del servidor'
        });
    }
});

// Usar el middleware en las rutas de admin
router.get('/dashboard', validarAdmin, (req, res) => {
    res.json({ success: true, message: 'Acceso permitido al dashboard de admin' });
});

module.exports = router;