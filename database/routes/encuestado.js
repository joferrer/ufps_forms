const {Router} = require('express');

const router = Router();
const pool = require('../index');

//TODO: Esquema del encuestado. Modelo.

//GET
router.get('/prueba', (req,res) =>{

    console.log('Conectado');
    pool.getConnection()
    res.status(200).send("Status: OK")    

});

//POST
router.post('/registrar',(req,res)=>{
    console.log('Crear encuestado');

    


});

module.exports = router;