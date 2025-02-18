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

// Rutas de frontend
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/img', express.static(path.resolve('views', 'img')));
app.use('/componentes', express.static(path.resolve('views', 'componentes')));
app.use('/rutaHistorica', express.static(path.resolve('views', 'rutaHistorica')));
app.use('/rutaCultural', express.static(path.resolve('views', 'rutaCultural')));
app.use('/rutaGastronomica', express.static(path.resolve('views', 'rutaGastronomica')));
app.use('/noticias', express.static(path.resolve('views', 'noticias')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/registro', express.static(path.resolve('views', 'registro')));
app.use('/img2', express.static(path.resolve('img2')));
app.use('/estilos', express.static(path.resolve('views', 'estilos')));
app.use('/admin', express.static(path.resolve('views', 'admin')));
app.use('/editar', express.static(path.resolve('views', 'admin', 'editar.html')));
app.use('/nuevo', express.static(path.resolve('views', 'admin', 'nuevo.html')));

app.use(express.json()); // importante colocar el json
app.use(cors());
app.use(cookieParser());
app.use(morgan('tiny'));

// Rutas para backend
app.use('/api/users', userRouter);

module.exports = app;

