require('dotenv').config();

//Express
const express = require('express');
const app = express();
//Mysql2
const mysql = require('mysql');

const { promisify }= require('util');


//Ruta de los servicios de encuestados.
const encuestadoRoutes = require('./routes/encuestado');
const poblacionRoutes = require('./routes/poblacion');
const adminRoutes = require('./routes/administrador');

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
app.use('/api/admin', adminRoutes);

app.listen(port, ()=>{
    console.log(`Server listen in port ${port}`);
} );

const pool =mysql.createPool({
    host: process.env.Host_dev,
    user: process.env.Username_dev,
    password: process.env.Password_dev,
    database: process.env.data_base,
    connectionLimit: 10,
    ssl:{
        rejectUnauthorized: true
    }
});


pool.getConnection( (err,conection)=>{
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has to many connections');
        }
        if (err.code === 'ECONNREFUSED') {
          console.error('Database connection was refused');
        }
      }
    
      if (conection) conection.release();
      console.log('DB is Connected');
    
      return;
}
);

// Promisify Pool Querys
pool.query = promisify(pool.query);


module.exports.pool = pool;
module.exports.query = pool.query;
