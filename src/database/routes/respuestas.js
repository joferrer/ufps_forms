const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const {Router} = require('express');


const router = Router();

//Pool de conexiones.
const pool = require('../index.js');

/**
 * Dar las respuestas de una pregunta.
 */
router.get('/respuestas/:id', async (req,res)=>{
    const {id} = req.params; // id de la pregunta. 

    const sqlGet = `SELECT * FROM RESPUESTAS WHERE id_pregunta = ${id}`;

    await pool.pool.getConnection( (err,conection)=>{
        res.setHeader('Access-Control-Allow-Origin','*') ;
        console.log('La conexion funciona 2');
        if(err){
            res.status(400).send('Error de conexion a la DB: ' + err.message); 
            
        } 
        conection.query(sqlGet,(err,result)=>{
            if(err)res.status(400).send('Error en la consulara GET '+err.message);   
            else{
                res.status(200).json(result);
            }
        });
        
       conection.release();
    }
    )

});

/**
 * POST: de opciones.
 * id: id de la pregunta asociada. 
 */
 router.post('/responder',async (req,res)=>{
    const id = req.body.id_pregunta;//id de la pregunta asociada.
    const id_encuestado = req.body.id_encuestado;
    
    const peti = `${process.env.URL_API}pregunta/pregunta/${id}`;
    
    console.log(peti+ "   **  " );
    let pregunta;
    try{
        pregunta = await fetch(peti);
        pregunta = await pregunta.json();
        
        if(pregunta.length != 1){
            res.status(400).send('No se encontró la pregunta asociada a esa respuesta.');
        }
        console.log(pregunta);

        const sqlPost = `INSERT INTO RESPUESTAS(id_opcion, id_pregunta, id_encuestado) VALUES(${req.body.id_opcion},${id},${id_encuestado}) `;
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