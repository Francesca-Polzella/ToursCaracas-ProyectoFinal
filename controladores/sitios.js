const express = require('express');
const path = require('path');
const sitioRouter = express.Router();
// Keep only one of these - let's use the path.join version
const Sitio = require(path.join(__dirname, '../modelo/sitios'));

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

    if (!nombre || !descripcion || !info || !numero || !coords){
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