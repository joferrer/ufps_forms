require('dotenv').config();

const express = require('express');
const app = express();

//Ruta de los servicios de encuestados.
const encuestadoRoutes = require('./routes/encuestado');

// Puerto de despliegue.
const port = process.env.PORT || 3200;

// URI de la conexión a la DB. 
const uri = process.env.MYSQL_URI;

// Necesario para leer jsons. 
app.use(express.json());

// MIDDLEWARE
app.use('/api', encuestadoRoutes);

app.listen(port, ()=>{
    console.log(`Server listen in port ${port}`);
} );