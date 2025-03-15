require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const userRouter = require('./controladores/users');
const sitioRouter = require('./controladores/sitios');
const adminRouter = require('./routes/admin');
const Sitio = require('./modelo/sitios');  // Cambiado de '../modelo/sitios' a './modelo/sitios'

try {
    mongoose.connect(process.env.MONGO_URI_TEST);
    console.log('Te has conectado a la base de datos');
} catch (error) {
    console.log(error);
}

// Mover estos middlewares antes de las rutas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use(morgan('tiny'));

// Rutas estáticas después de los middlewares
app.use(express.static('public'));
app.use(express.static(__dirname));
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
app.use(express.static('views'));
app.use(express.json()); // importante colocar el json
app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true
}));
app.use(cookieParser());
app.use(morgan('tiny'));

// Rutas para backend
app.use('/api/users', userRouter);
app.use('/api/sitios', sitioRouter);
app.use('/api/admin', adminRouter); // Eliminar la duplicación
app.use('/api/admin', adminRouter);
module.exports = app;

