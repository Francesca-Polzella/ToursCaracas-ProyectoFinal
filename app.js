require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const userRouter = require('./controladores/users');

try {
    mongoose.connect(process.env.MONGO_URI_TEST);
    console.log('Te has conectado a la base de datos');
} catch (error) {
    console.log(error);
}

// Configura la carpeta 'public' para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de frontend
app.use('/', express.static(path.resolve(__dirname, 'views', 'home')));
app.use('/img', express.static(path.resolve(__dirname, 'views', 'img')));
app.use('/componentes', express.static(path.resolve(__dirname, 'views', 'componentes')));
app.use('/rutaHistorica', express.static(path.resolve(__dirname, 'views', 'rutaHistorica')));
app.use('/rutaCultural', express.static(path.resolve(__dirname, 'views', 'rutaCultural')));
app.use('/rutaGastronomica', express.static(path.resolve(__dirname, 'views', 'rutaGastronomica')));
app.use('/noticias', express.static(path.resolve(__dirname, 'views', 'noticias')));
app.use('/login', express.static(path.resolve(__dirname, 'views', 'login')));
app.use('/registro', express.static(path.resolve(__dirname, 'views', 'registro')));
app.use('/img2', express.static(path.resolve(__dirname, 'img2')));
app.use('/estilos', express.static(path.resolve(__dirname, 'views', 'estilos')));
app.use('/admin', express.static(path.resolve(__dirname, 'views', 'admin')));
app.use('/editar', express.static(path.resolve('views', 'admin', 'editar.html')));
app.use('/nuevo', express.static(path.resolve('views', 'admin', 'nuevo.html')));

app.use(express.json()); // importante colocar el json
app.use(cors());
app.use(cookieParser());
app.use(morgan('tiny'));

// Rutas para backend
app.use('/api/users', userRouter);

// Ruta para agregar un nuevo sitio
app.post('/api/sitios/nuevo', (req, res) => {
    const sitio = req.body;
    // Aquí puedes agregar la lógica para guardar el sitio en la base de datos
    // Por ejemplo:
    // Sitio.create(sitio, (err, newSitio) => {
    //     if (err) {
    //         return res.status(500).json({ success: false, message: 'Error al agregar el sitio' });
    //     }
    //     res.status(201).json({ success: true, data: newSitio });
    // });
    res.status(201).json({ success: true, data: sitio });
});

module.exports = app;

