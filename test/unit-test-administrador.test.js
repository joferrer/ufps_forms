const chai = require('chai');
const chaiHttp = require('chai-http');
const { after } = require('mocha');

chai.use(chaiHttp);

const app = require('../database/index').app;

describe('Suit de testing para administrador', ()=>{
    it('Conexion get ADMISTRADOR debe tener status 200',(done)=>{
        chai.request(app).get('/api/admin/registrados').end((err,res)=>{
            chai.assert.equal(res.status,200);
            done();
        })
    })

    it('Get ADMINISTRADOR devuelve los datos correctos',(done)=>{
        chai.request(app).get('/api/admin/registrados').end((err,res)=>{
            chai.assert.equal(res.type,'application/json' , "Se esperaba una respuesta json");
            chai.assert.equal(res.text,'[]');
            done();
        })
    })

    it('Post ADMINISTRADOR se conecta correctamente',(done)=>{
        chai.request(app).post('/api/admin/login').send({
            "id_administrador": 2,
            "correo": "joferrer@ufps.edu.co",
            "contrasena": "qwerrt"
        }).end((err,res)=>{
            chai.assert.equal(res.status,200, "El post no devuelve 200");
            

            done();
        })
    })
    it("Post ADMINISTRADOR inserta correctamente",(done)=>{
        chai.request(app).get('/api/admin/registrados').end((err,res)=>{
            chai.assert.equal(res.type,'application/json','El tipo de retorno deberia ser un json');
            chai.assert.equal(res.body[0].correo,'joferrer@ufps.edu.co');
            chai.assert.equal(res.body[0].contrasena,'qwerrt');
            //'[{"id_administrador":1,"correo":"joferrer@ufps.edu.co","contrasena":"qwerrt"}]', "No se posteo correctamente el administrador."
            done();
        })
    })
})

chai.request(app).delete('/api/admin/eliminarTodo').end();
