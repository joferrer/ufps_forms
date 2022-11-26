import {expect, jest, test} from '@jest/globals';


// Hacer 1000 peticiones get 

const peticiones = async ()=>{
    let exitos = 0;
    for(let i= 0; i<1000;i++){

        try {
            const resp = await fetch(`${API_URL}encuesta/encuestas/9`);
            console.log("status: "+ resp.status)
            if(resp.status == 200) exitos++;
            
        } catch (error) {
            return exitos;
        }
    }
    
}
describe('Pruebas de volumen de peticiones', ()=>{
    test('Se espera 1000 peticiones exitosas', async ()=>{
        const exitos = await peticiones();
        expect(exitos).toEqual(1000);
    })
    
})