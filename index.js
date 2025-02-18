const express = require('express');
const path = require('path');
const app= require('./app')
const http =require('http')
const server =http.createServer(app)

server.listen(3000,()=>{
    console.log('el servidor esta funcionando')
});
   
// Configura el middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'views/estilos')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/registro/index.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/admin/index.html'));
});