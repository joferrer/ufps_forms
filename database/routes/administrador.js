//
const {Router} = require('express');
const router = Router();

//Pool de conexiones.
const pool = require('../index.js');


//Modelo
const modeloAdmin = require('../../models/administrador');
//Get
router.get('/registrados', async(req,res)=>{
     console.log("Admin get conectado");
     const sqlGet = "SELECT * FROM ADMINISTRADORES";
    await pool.pool.query(sqlGet,(err,result)=>{
        if(err)res.status(400).send('GET ADMINISTRADOR FAIL :( ');   
            else{
                res.status(200).json(result);
            }
    });

     rconection.release();
})

//Post
router.post('/login', async (req,res)=>{

    const administrador = new  modeloAdmin(req.body);
    console.log(administrador.toString());

    const sqlPost = `INSERT INTO ADMINISTRADORES(correo, contrasena) 
    VALUES("${administrador.correo}", "${administrador.contrasena}")`;

    
    
    await pool.pool.query(sqlPost,(err)=>{
        if(err) res.status(400).send('Post fail :( ' + err.message) 
        else
            res.status(200).send('Post cool :)')
            });
    
    console.log('La conexion funciona 2');
            
       

    

});
module.exports = router;