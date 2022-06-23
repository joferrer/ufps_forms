const {Router} = require('express');

const router = Router();

//Pool de conexiones.
const pool = require('../index.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

//TODO: Esquema del encuestado. Modelo.

//GET
router.get('/mostrar/:id', async (req,res) =>{

    const {id} = req.params; //Id de la poblacion.
    const sqlGet = `SELECT * FROM ENCUESTADOS WHERE id_poblacion = ${id}`;
    await pool.pool.getConnection( (err,conection)=>{
        //res.setHeader('Access-Control-Allow-Origin','*') ;
        console.log('La conexion funciona 2');
        if(err){
            res.status(400).send('Error de conexion a la DB: ' + err.message); 
            
        } 
        conection.query(sqlGet,(err,result)=>{
            if(err)res.status(400).send('Error en la consulta GET por id_encuesta '+err.message);   
            else{
                res.status(200).json(result);
            }
        });
        
       conection.release();
    })  

});

//POST
router.post('/registrar/:id',async (req,res)=>{
    console.log('Crear encuestado');

    const {id} = req.params; //id de la poblacion.
    const correo = req.body.correo;

    const peti = `${process.env.URL_API}poblacion/poblaciones/${id}`;
    
    console.log(peti+ "   **  " );
    let poblacion;
    try{
        poblacion = await fetch(peti);
        poblacion = await poblacion.json();
        
        if(poblacion.length != 1){
            res.status(400).send('No se encontró la encuesta asociada.');
        }
        console.log(poblacion);
       

        const sqlPost = `INSERT INTO ENCUESTADOS(correo, id_poblacion) VALUES("${correo}",${id}) `;
        console.log("SQL : "+ sqlPost);

        await pool.pool.getConnection( (err,conection)=>{
            if(err) res.status(400).send('Post fail pregunta 1 :(')
            conection.query(sqlPost,(err)=>{
                if(err) res.status(400).send('Post fail pregunta :( ' + err.message) 
                else
                res.status(200).send('Post pregunta :)')
            });
            console.log('La conexion funciona 2');
            conection.release();
        }
        );


    
    }
    catch(e){
        console.log(e);
        res.status(400).send('Ah ocurrido un error inesperado.: '+ e);
    }
    

    


});

module.exports = router;