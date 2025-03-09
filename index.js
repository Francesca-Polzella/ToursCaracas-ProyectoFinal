const express = require('express');
const path = require('path');
const app = require('./app');
const http = require('http');
const server = http.createServer(app);

// Cambiar el puerto a 3001 o cualquier otro puerto disponible
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`el servidor esta funcionando en el puerto ${PORT}`);
});

// Configura el middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'views')));

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin', 'index.html'));
});

// Ruta para la página de edición
app.get('/editar', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin', 'editar.html'));
});

// Ruta para la página de nuevo
app.get('/nuevo', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin', 'nuevo.html'));
});

const userRouter = express.Router();

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

const sitioRouter = express.Router();
// Change this:
// const Sitio = require('../modelo/sitio');
// To this:
const Sitio = require('./modelo/sitios');

// Ruta para obtener todos los sitios
sitioRouter.get('/', async (req, res) => {
    try {
        const sitios = await Sitio.find();
        res.json(sitios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los sitios' });
    }
});

// Ruta para crear un nuevo sitio
sitioRouter.post('/nuevo', async (req, res) => {
    const { nombre, descripcion, info, numero, coords } = req.body;

    if (!nombre || !descripcion || !info || !numero || !coords) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const nuevoSitio = new Sitio({ nombre, descripcion, info, numero, coords });
        await nuevoSitio.save();
        res.status(201).json({ success: true, data: nuevoSitio });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el sitio' });
    }
});

// Ruta para editar un sitio existente
sitioRouter.put('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, info, numero, coords } = req.body;

    if (!nombre || !descripcion || !info || !numero || !coords) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const sitio = await Sitio.findByIdAndUpdate(id, { nombre, descripcion, info, numero, coords }, { new: true });
        if (!sitio) {
            return res.status(404).json({ error: 'Sitio no encontrado' });
        }
        res.status(200).json({ success: true, data: sitio });
    } catch (error) {
        res.status(500).json({ error: 'Error al editar el sitio' });
    }
});

module.exports = sitioRouter;