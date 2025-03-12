const jwt = require('jsonwebtoken');
const User = require('../modelo/user');

const validarAdmin = async (req, res, next) => {
    try {
        // Verificar el token
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'Acceso denegado: Token no proporcionado' 
            });
        }

        // Decodificar el token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (tokenError) {
            return res.status(401).json({ 
                success: false,
                message: 'Token inválido o expirado' 
            });
        }
        
        // Buscar el usuario y verificar rol
        const usuario = await User.findById(decoded.userId).exec();
        if (!usuario) {
            return res.status(404).json({ 
                success: false,
                message: 'Usuario no encontrado' 
            });
        }

        if (usuario.rol !== 'admin') {
            return res.status(403).json({ 
                success: false,
                message: 'Acceso denegado: Se requieren permisos de administrador' 
            });
        }

        // Agregar usuario a la request
        req.usuario = usuario;
        return next();

    } catch (error) {
        console.error('Error en validación de admin:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Error interno del servidor' 
        });
    }
};

module.exports = validarAdmin;