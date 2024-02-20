// FORMA ANTIGUA DE EJECUTAR EL SERVIDOR CON EXPRESS
// const express = require('express');

// const app = express();

// // DEFINIMOS EL PUERTO
// const port = process.env.PORT || 4000;

// app.listen( port, ( ) => {
//     console.log(`El servidor está funcionando en el puerto ${port}`);
// });

// FORMA RECIENTE DE EJECUTAR EL SERVIDOR CON EXPRESS

import express from 'express';
import router from './routes/app.js'
import db from './config/db.js';


const app = express();

// CONECTAMOS LA BASE DE DATOS
db.authenticate()
    .then( () => console.log('¡Base de datos conectada exitosamente!'))
    .catch( err => console.log(err) )

// DEFINIMOS EL PUERTO
const port = process.env.PORT || 4000;

// HABILITAR PUG QUE ES EL VIEW ENGINE 
app.set('view engine', 'pug');

// MIDDLEWARE
// OBTENER EL AÑO ACTUAL
app.use( ( req, res, next ) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    next();
});

// AGREGAR BODY PARSER PARA LEER LOS DATOS DEL FORMULARIO
app.use( express.urlencoded({ extended: true }) )


// DEFINIR LA CARPETA PUBLICA
app.use(express.static('public'));

// AGREGAR ROUTER
app.use('/', router );


app.listen( port, ( ) => {
    console.log(`SERVER HAVE BEEN EXECUTE SUCCESS IN THE PORT: ${port}`)
})

