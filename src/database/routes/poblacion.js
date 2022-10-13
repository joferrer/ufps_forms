
const {Router} = require('express');


const router = Router();

//Pool de conexiones.
const pool = require('../index.js');



//Modelo
const modeloProyecto = require('../../models/poblacion');



/**
 * Retorna todas las poblaciones existentes actualmente en el sistema. 
 */
router.get('/poblaciones',async (req,res)=>{
    console.log('Get poblaciones');
    const sqlGet = 'SELECT * FROM POBLACIONES'
    //res.status(200).send('Conectado.');
   

    
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


    //res.status(200).send('Modelo cool: ');
    
});
/**
 * Retorna una poblacion data su id.
 * id: id de la población que se está buscando. 
 */
router.get('/poblaciones/:id',async (req,res)=>{
    console.log('Get poblaciones');
    const {id} = req.params;
    const sqlGet = `SELECT * FROM POBLACIONES WHERE id_poblacion = ${id}`
    //res.status(200).send('Conectado.');
   

    
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


    //res.status(200).send('Modelo cool: ');
    
});
//Post
router.post('/subir',async (req,res)=>{
    console.log('Crear poblacion');
    //res.setHeader('Access-Control-Allow-Origin','*') ;
    const poblacion = new modeloProyecto(req.body);
    //console.log(poblacion.toString());

    const sqlPost = `INSERT INTO POBLACIONES(nombre) VALUES("${poblacion.nombre}")`;

  
   
    await pool.pool.getConnection( (err,conection)=>{
        if(err) res.status(400).send('Post fail :(')
        conection.query(sqlPost,(err)=>{
            if(err) res.status(400).send('Post fail :( ' + err.message) 
            else
            res.status(200).send('Post cool :)')
        });
        console.log('La conexion funciona 2');
        conection.release();
    }
    );
   

    //res.status(statusP).send('Modelo cool: '+statusP);
});
//update
//DELETE ALL
router.delete('/eliminarTodo',async (req,res)=>{
    const {id} = req.params;
    const deleteSql = `DELETE FROM POBLACIONES `;
    await pool.pool.query(deleteSql, (err)=>{
        if(err) {
            res.send('DELETE FAIL :(');
        }
        else {
            res.status(200).send('DELETE COOL :D');
        }
    });

});

//Delete con id
router.delete('/eliminar/:id',async (req,res)=>{
    const {id} = req.params;
    const deleteSql = `DELETE FROM POBLACIONES WHERE id_poblacion = ${id}`;
    await pool.pool.query(deleteSql, (err)=>{
        if(err) {
            res.send('DELETE FAIL :(');
        }
        else {
            res.status(200).send('DELETE COOL :D');
        }
    });

});


//Exportar router
module.exports = router;



