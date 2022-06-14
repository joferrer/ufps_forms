
const {Router} = require('express');
const mysql = require('mysql2');

const router = Router();
//Database
//import {pool} from '../index.js'
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


//const pool = module.pool;
//Modelo
const modeloProyecto = require('../../models/poblacion');



//Get
router.get('/poblaciones',async (req,res)=>{
    console.log('Get poblaciones');
    const sqlGet = 'SELECT * FROM POBLACIONES'
    //res.status(200).send('Conectado.');
   

    
    pool.getConnection( (err,conection)=>{
        //res.setHeader('Access-Control-Allow-Origin','*') ;
        if(err){
            res.status(400).send('Modelo fail: ' + err.message); 
            
        } 
        conection.query(sqlGet,(err,result)=>{
            if(err)res.status(400).send('Modelo fail: ');   
            else{
                res.json(result);
            }
        });
        console.log('La conexion funciona 2');
       conection.release();
    }
    )


    //res.status(200).send('Modelo cool: ');
    
});
//Post
router.post('/subir',async (req,res)=>{
    console.log('Crear poblacion');
    //res.setHeader('Access-Control-Allow-Origin','*') ;
    const poblacion = new modeloProyecto(req.body);
    console.log(poblacion.toString());

    const sqlPost = `INSERT INTO POBLACIONES(nombre) VALUES("${poblacion.nombre}")`;

  
    let statusP = 200;
    pool.getConnection( (err,conection)=>{
        if(err) res.status(400).send('Post fail :(')
        conection.query(sqlPost,(err)=>{
            if(err) res.status(400).send('Post fail :( ' + err.message) 
            else
            res.status(200).send('Post cool :)')
        });
        console.log('La conexion funciona 2');
        conection.release();
    }
    )
   

    //res.status(statusP).send('Modelo cool: '+statusP);
});
//update
//Delate

//Exportar router
module.exports = router;



