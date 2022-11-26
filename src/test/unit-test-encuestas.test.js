import {expect, jest, test} from '@jest/globals';
import { publicarEncuesta, traerInfo } from './cargarInformacion';

const API_URL = 'http://localhost:3200/api/';



describe('Pruebas de funcion para encuestas', ()=>{

  test('Debe retornar todas las encuestas', async()=>{
      
    const {encuestasVigentes} = await traerInfo(); 
    const resp      = await fetch(`${API_URL}encuesta/encuestas`);
    const encuestas = await resp.text();
    expect(encuestas).toBe(encuestasVigentes);

  })

  
    
    test('Se publica la encuesta correctamente',async ()=>{
        const encuesta = {
          "id_encuesta": 0,
          "titulo": "Encuesta de nivel de satisfacción en la materia de AYD",
          "descripcion": "Esta es es una encuesta que busca medir el nivel de satisfacción de los estudiantes de la UFPS.",
          "id_poblacion": 9,
          "fechacierre": "2022-12-31 20:57:15.798"
      }
        const resp = await publicarEncuesta(encuesta);
        expect(resp).toEqual(200);
    });

    test('No debe aceptar publicar una encuesta sin poblacion asignada', async ()=>{
      const encuesta = {
        "id_encuesta": 0,
        "titulo": "Encuesta de nivel de satisfacción en la materia de AYD",
        "descripcion": "Esta es es una encuesta que busca medir el nivel de satisfacción de los estudiantes de la UFPS.",
        "fechacierre": "2022-10-13 20:57:15.798"
    }
      const resp = await publicarEncuesta(encuesta);
      expect(resp).toEqual(400);
    })

    test('No debe aceptar publicar una encuesta sin un titulo', async ()=>{
      const encuesta = {
        "id_encuesta": 0,
        "titulo": "",
        "descripcion": "Esta es es una encuesta que busca medir el nivel de satisfacción de los estudiantes de la UFPS.",
        "id_poblacion": 0,
        "fechacierre": "2022-10-13 20:57:15.798"
    }
      const resp = await publicarEncuesta(encuesta);
      expect(resp).toEqual(400);
      
    })

    test('No debe aceptar publicar una encuesta anterior a la fecha', async ()=>{
      const encuesta = {
        "id_encuesta": 0,
        "titulo": "Encuesta de nivel de satisfacción en la materia de AYD",
        "descripcion": "Esta es es una encuesta que busca medir el nivel de satisfacción de los estudiantes de la UFPS.",
        "id_poblacion": 0,
        "fechacierre": "2022-10-11 20:57:15.798"
    }
      const resp = await publicarEncuesta(encuesta);
      expect(resp).toEqual(400);
    })

  ;

})
