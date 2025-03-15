const jwt = require('jsonwebtoken');
const User = require('../modelo/user');

const validarAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'Acceso denegado: Token no proporcionado' 
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_clave_secreta_aqui');
        } catch (tokenError) {
            return res.status(401).json({ 
                success: false,
                message: 'Token inválido o expirado' 
            });
        }
        
        // Verificación específica para admin
        const usuario = await User.findById(decoded.userId);
        if (!usuario) {
            return res.status(404).json({ 
                success: false,
                message: 'Usuario no encontrado' 
            });
        }

        // Verificar si es el admin específico
        if (usuario.Email === 'admin@gmail.com' && 
            usuario.Password === 'Hola12345!' && 
            usuario._id.toString() === '67d0d61817116778bf178167') {
            req.usuario = usuario;
            return next();
        }

        return res.status(403).json({ 
            success: false,
            message: 'Acceso denegado: No eres administrador' 
        });

    } catch (error) {
        console.error('Error en validación de admin:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Error interno del servidor' 
        });
    }
};

module.exports = validarAdmin;