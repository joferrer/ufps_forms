//
const {Router} = require('express');
const router = Router();

//Pool de conexiones.
const pool = require('../index.js');


//Modelo
const modeloAdmin = require('../../models/administrador');
//Get
router.get('/registrados', async(req,res)=>{
     //console.log("Admin get conectado");
     const sqlGet = "SELECT * FROM ADMINISTRADORES";
    await pool.pool.query(sqlGet,(err,result)=>{
        if(err)res.status(400).send('GET ADMINISTRADOR FAIL :( ');   
            else{
                res.status(200).json(result);
            }
    });

     
})

//Post
router.post('/login', async (req,res)=>{

    const administrador = new  modeloAdmin(req.body);
    //console.log(administrador.toString());

    const sqlPost = `INSERT INTO ADMINISTRADORES(correo, contrasena) 
    VALUES("${administrador.correo}", "${administrador.contrasena}")`;

    
    
    await pool.pool.query(sqlPost,(err)=>{
        if(err) res.status(400).send('Post fail :( ' + err.message) 
        else
            res.status(200).send('Post cool :)')
            });

});

//DELETE 
router.delete('/eliminar/:id',async (req,res)=>{
    const {id} = req.params;
    const deleteSql = `DELETE FROM ADMINISTRADORES WHERE id_administrador =${id}`;
    await pool.pool.query(deleteSql, (err)=>{
        if(err) {
            res.send('DELETE FAIL :(');
        }
        else {
            res.status(200).send('DELETE COOL :D');
        }
    });

});

//DELETE ALL
router.delete('/eliminarTodo',async (req,res)=>{
    const {id} = req.params;
    const deleteSql = `DELETE FROM ADMINISTRADORES `;
    await pool.pool.query(deleteSql, (err)=>{
        if(err) {
            res.send('DELETE FAIL :(');
        }
        else {
            res.status(200).send('DELETE COOL :D');
        }
    });

});

module.exports = router;