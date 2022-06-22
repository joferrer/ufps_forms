const {Router} = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = Router();

//Pool de conexiones.
const pool = require('../index.js');

const modeloPregunta = require('../../models/pregunta');


/**
 * Preguntas por encuesta. 
 * id: id de la encuesta de la cual se quieren las preguntas.
 */
router.get('/preguntas/:id',async (req,res)=>{
    const {id} = req.params; //id de la encuesta.
    const sqlGet = `SELECT * FROM PREGUNTAS WHERE id_encuestas = ${id}`;
    await pool.pool.getConnection( (err,conection)=>{
        //res.setHeader('Access-Control-Allow-Origin','*') ;
        console.log('La conexion funciona 2');
        if(err){
            res.status(400).send('Error de conexion a la DB: ' + err.message); 
            
        } 
        conection.query(sqlGet,(err,result)=>{
            if(err)res.status(400).send('Error al buscar las preguntas de la encuesta. '+err.message);   
            else{
                res.status(200).json(result);
            }
        });
        
       conection.release();
    }
    )
    
   
});
/**
 * Agregar una pregunta a un encuesta.
 * id: id de la encuesta. 
 */
router.post('/agregarpregunta/:id', async (req,res)=>{
    const {id} = req.params;
    
    const peti = `${process.env.URL_API}encuesta/encuestas/encuesta/${id}`;
    
    console.log(peti+ "   **  " );

    let encuesta;
    try{
        encuesta = await fetch(peti);
        encuesta = await encuesta.json();
        
        if(encuesta.length != 1){
            res.status(400).send('No se encontró la encuesta asociada.');
        }
        console.log(encuesta);
       
        const pregunta = new modeloPregunta(req.body);


        const sqlPost = `INSERT INTO PREGUNTAS(enunciado, tipo, id_encuestas) VALUES("${pregunta.enunciado}",${pregunta.tipo},${encuesta[0].id_encuestas})`
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
    

    
    //res.status(200).send('changos');
});
/**
 * Eliminar pregunta de una encuesta.
 */
router.delete('/eliminar/:id', async (req,res)=>{
    const {id} = req.params;
    const sqlDelete = `DELETE FROM PREGUNTAS WHERE id_pregunta = ${id}`;

    await pool.pool.getConnection( (err,conection)=>{
        if(err) res.status(400).send('Post fail pregunta 1 :(')
        conection.query(sqlDelete,(err)=>{
            if(err) res.status(400).send('DELETE fail pregunta :( ' + err.message) 
            else
            res.status(200).send('DELETE pregunta :)')
        });
        console.log('La conexion funciona 2');
        conection.release();
    }
    );


});

module.exports = router;