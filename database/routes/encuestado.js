const {Router} = require('express');

const router = Router();

//TODO: Esquema del encuestado. Modelo.

router.get('/prueba', (req,res) =>{

    console.log('Conectado');
    res.status(200).send("Status: OK")    

});

module.exports = router;