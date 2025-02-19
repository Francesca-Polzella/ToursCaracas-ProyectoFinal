const express = require('express');
const path = require('path');
const app = require('./app');
const http = require('http');
const server = http.createServer(app);

server.listen(3000, () => {
    console.log('el servidor esta funcionando');
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