const {Router} = require('express');

const router = Router();

//Pool de conexiones.
const pool = require('../index.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

//TODO: Esquema del encuestado. Modelo.
router.get('/mostrar', async (req,res) =>{

    const {id} = req.params; //Id de la poblacion.
    const sqlGet = `SELECT * FROM ENCUESTADOS `;
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
//GET
router.get('/mostrar/:id', async (req,res) =>{

    const {id} = req.params; //Id de la poblacion.
    const sqlGet = `SELECT * FROM ENCUESTADOS WHERE id_poblacion = ${id}`;
    await pool.pool.getConnection( (err,conection)=>{
        res.setHeader('Access-Control-Allow-Origin','*') ;
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
/**
 * 1. Recibe los datos a insertar.
 * 2. Verifica que la población asociada al nuevo encuestado exista.
 *      2.1 Si no exista la población envia una resp con el msg de error. 
 * 3. Inserta al nuevo encuestado en la DB. 
 *      3.1 Si ocurre un error, envia la respuesta con el msg de error.
 */
router.post('/registrar/:id',async (req,res)=>{
    console.log('Crear encuestado');
    res.setHeader('Access-Control-Allow-Origin','*') ;
    const {id}   = req.params; //id de la poblacion.
    const correo = req.body.correo;
    const nombre = req.body.nombre;
    const peti = `${process.env.URL_API}poblacion/poblaciones/${id}`;

    console.log(peti+ "   **  " );
    let poblacion;
    try{

        poblacion = await fetch(peti);
        poblacion = await poblacion.json();
        
        if(poblacion.length != 1){
            res.status(404).send('No se encontró la población asociada.');
        }
        console.log(poblacion);
       

        const sqlPost = `INSERT INTO ENCUESTADOS(correo, id_poblacion, nombre) VALUES("${correo}",${id},"${nombre}") `;
        console.log("SQL : "+ sqlPost);

        await pool.pool.getConnection( (err,conection)=>{
            
            res.setHeader('Access-Control-Allow-Origin','*') ;
            if(err) res.status(400).send('Post fail encuestado 1 :(')
            conection.query(sqlPost,(err)=>{
                if(err) res.status(400).send('Post fail encuestado 2 :( ' + err.message) 
                else
                res.status(200).send('Post encuestado :)')
            });
            
            conection.release();
        }
        );


    
    }
    catch(e){
        console.log(e);
        res.status(400).send('Ah ocurrido un error inesperado.: '+ e);
    }

});

/**
 * 1. Traer los datos de la población cuyos encuestados se van a eliminar.
 * 2. Elminar todos los encuestados asociados a esa población.
 *   2.1 Si ocurre un error, lanzar en las res el msg de error.
 * 
 */
router.delete('/eliminar/encuestados:id', async (req, res)=>{

    const {id}   = req.params;

    const SLQ_DELETE = `DELETE FROM ENCUESTADOS WHERE id_poblacion = ${id}`;
    await pool.pool.query(SLQ_DELETE, (err)=>{
        if(err) {
            res.status(400).send('DELETE FAIL :('+ err.message);
        }
        else {
            res.status(200).send('DELETE COOL :D');
        }
    }); 

})

module.exports = router;