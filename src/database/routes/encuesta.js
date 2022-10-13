const {Router} = require('express');


const router = Router();

//Pool de conexiones.
const pool = require('../index.js');

const modeloEncuesta = require('../../models/encuenta');

/**
 * GET de todas las encuestas en general. 
 */
router.get('/encuestas',async (req,res)=>{

    const sqlGet = 'SELECT * FROM ENCUESTAS';
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
 * GET de todas las encuestas de una población por su id. 
 * id: id de la poblacion. 
 */
router.get('/encuestas/:id',async (req,res)=>{
    const {id} = req.params;//id de la población. 
    const sqlGet= `SELECT * FROM ENCUESTAS WHERE id_poblacion = ${id}`;

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

//Encuesta por id. 
router.get('/encuestas/encuesta/:id',async (req,res)=>{
    const {id} = req.params; //Id de la encuesta.
    const sqlGet = `SELECT * FROM ENCUESTAS WHERE id_encuestas = ${id}`;
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

/**
 * POST para publicar una encuesta. 
 * id: id de la población asociada. Solo una población. 
 */
router.post('/publicar/:id',async (req,res)=>{
    const {id} = req.params;// Población asociada. 

    //Comprobar que la población exista antes de asociarle una encuesta.
    const poblacionSQL = `SELECT * FROM POBLACIONES WHERE id_poblacion = ${id}`;
    
    const encuesta = new modeloEncuesta(req.body) ;
    const postEncuesta = `INSERT INTO ENCUESTAS(nombre,porcentaje,id_poblacion) VALUES("${encuesta.nombre}",${encuesta.porcentaje},${id}) `;

    await pool.pool.getConnection((err,conection)=>{
        if(err){
            res.status(400).send('Error de conexion a la DB: ' + err.message); 
            
        } 
        conection.query(poblacionSQL,(err,result)=>{
            if(err)res.status(400).send('Fallo al encontrar la población '+err.message);   
            else if(result.length != 1){
                res.status(400).send('NO se encontró la poblacion asociada :( ') 
            }
            else{

                //Crear la encuesta asociada. 
                conection.query(postEncuesta,(err)=>{
                    if(err) res.status(400).send('Post encuesta fail :( ' + err.message) 
                    else
                    res.status(200).send('Encuesta publicada.')
                });
                
            }
        });
    });



    

    

});

//Encuesta DELETE
router.delete('/eliminar/:id',async (req,res)=>{});

//Encuesta PUT
router.put('/publicar/:id',async (req,res)=>{});


module.exports = router;


