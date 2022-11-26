const chai = require('chai');
const chaiHttp = require('chai-http');
const { after } = require('mocha');

chai.use(chaiHttp);

const app = require('../database/index').app;

describe('Suit de testing para poblacion', ()=>{
    

    it('Get POBLACIONES devuelve los datos correctos',(done)=>{
        chai.request(app).get('/api/poblacion/poblaciones').end((err,res)=>{
            console.log('NO SE QUE VERGAAAAA');
            chai.assert.equal(res.status,200,res.text,"GET POBLACIONES no devuelve status 200");
            chai.assert.equal(res.type,'application/json',"El tipo de respuesta deberia ser un json");
            chai.assert.equal(res.text,'[]',"No devuelve los datos correctamente. Esperaba []");
            done();
        })
    })

    it('Post POBLACIONES inserta correctamente',(done)=>{
        chai.request(app).post('/api/poblacion/subir').send({
            "id_poblacion": 2,
            "nombre": "Prueba"
        }).end((err,res)=>{
            chai.assert.equal(res.status,200, "Se obtuvo: "+res.text);
            done();
        })
    })
})
after(()=>{
    chai.request(app).delete('/api/poblacion/eliminarTodo').end();
})
