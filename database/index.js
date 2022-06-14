require('dotenv').config();

//Express
const express = require('express');
const app = express();
//Mysql2
const mysql = require('mysql2');
const poblacion = require('../models/poblacion');

//Ruta de los servicios de encuestados.
const encuestadoRoutes = require('./routes/encuestado');
const poblacionRoutes = require('./routes/poblacion');

// Puerto de despliegue.
const port = process.env.PORT || 3200;

// URI de la conexión a la DB. 
const uri = process.env.MYSQL_URI;

// Necesario para leer jsons. 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// MIDDLEWARE
app.use('/api', encuestadoRoutes);
app.use('/api',poblacionRoutes);

app.listen(port, ()=>{
    console.log(`Server listen in port ${port}`);
} );


/*
const pool = mysql.createPool({

    host: process.env.Host_dev,
    user: process.env.Username_dev,
    database: process.env.data_base,
    password: process.env.Password_dev,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0



}); */

/*
const conexion = pool.getConnection( (err,conection)=>{
    if(err) throw err;
    conection.release();
    console.log('La conexion funciona 2');
}
);*/


//Exportar db
//module.exports = pool;

/**
 * 
 * 
 * require('dotenv').config();

const mysql = require('mysql2');

const connection = mysql.createConnection(process.env.DATABASE_URL);

console.log('Connected to PlanetScale!');

connection.end();

 */