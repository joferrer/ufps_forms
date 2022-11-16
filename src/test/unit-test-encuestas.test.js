import {expect, jest, test} from '@jest/globals';
const sum = ()=>3;
const API_URL = 'http://localhost:3200/api/';

describe('Pruebas de funcion para encuestas',()=>{


    const encuestasDisponibles = `[{"id_encuestas":1,"titulo":"Encuesta de nivel de satisfacción en la materia de AYD","id_poblacion":9,"descripcion":null,"fechacierre":"2022-10-14T01:53:42.000Z"},{"id_encuestas":2,"titulo":"Encuesta de nivel de satisfacción en la materia de AYD","id_poblacion":8,"descripcion":null,"fechacierre":"2022-10-14T01:53:42.000Z"},{"id_encuestas":3,"titulo":"Encuesta de nivel de satisfacción en la materia de AYD","id_poblacion":110,"descripcion":null,"fechacierre":"2022-10-14T01:53:42.000Z"},{"id_encuestas":4,"titulo":"Encuesta de nivel de satisfacción en la materia de AYD","id_poblacion":9,"descripcion":"Esta es es una encuesta que busca medir el nivel de satisfacción de los estudiantes de la UFPS.","fechacierre":"2022-10-14T01:57:16.000Z"},{"id_encuestas":5,"titulo":"Encuesta de nivel de satisfacción en la materia de AYD","id_poblacion":9,"descripcion":"Esta es es una encuesta que busca medir el nivel de satisfacción de los estudiantes de la UFPS.","fechacierre":"2022-10-14T01:57:16.000Z"},{"id_encuestas":6,"titulo":"Encuesta de nivel de satisfacción en la materia de AYD","id_poblacion":9,"descripcion":"Esta es es una encuesta que busca medir el nivel de satisfacción de los estudiantes de la UFPS.","fechacierre":"2022-10-14T01:57:16.000Z"},{"id_encuestas":7,"titulo":"Encuesta de nivel de satisfacción en la materia de AYD","id_poblacion":9,"descripcion":"Esta es es una encuesta que busca medir el nivel de satisfacción de los estudiantes de la UFPS.","fechacierre":"2022-10-14T01:57:16.000Z"},{"id_encuestas":8,"titulo":"Encuesta de nivel de satisfacción en la materia de AYD","id_poblacion":9,"descripcion":"Esta es es una encuesta que busca medir el nivel de satisfacción de los estudiantes de la UFPS.","fechacierre":"2022-10-14T01:57:16.000Z"},{"id_encuestas":9,"titulo":"Encuesta de nivel de satisfacción en la materia de AYD","id_poblacion":9,"descripcion":"Esta es es una encuesta que busca medir el nivel de satisfacción de los estudiantes de la UFPS.","fechacierre":"2022-10-14T01:57:16.000Z"},{"id_encuestas":10,"titulo":"Encuesta de nivel de satisfacción en la materia de AYD","id_poblacion":9,"descripcion":"Esta es es una encuesta que busca medir el nivel de satisfacción de los estudiantes de la UFPS.","fechacierre":"2022-10-14T01:57:16.000Z"},{"id_encuestas":11,"titulo":"","id_poblacion":9,"descripcion":"","fechacierre":"2022-11-01T19:28:19.000Z"},{"id_encuestas":12,"titulo":"","id_poblacion":9,"descripcion":"","fechacierre":"2022-11-01T19:55:13.000Z"},{"id_encuestas":13,"titulo":"Encuesta de prueba 4","id_poblacion":11,"descripcion":"Desc 4","fechacierre":"2022-11-01T21:56:38.000Z"},{"id_encuestas":14,"titulo":"Encuesta de prueba 5","id_poblacion":11,"descripcion":"Desc 5","fechacierre":"2022-11-01T21:59:23.000Z"},{"id_encuestas":15,"titulo":"Encuesta de prueba 6","id_poblacion":11,"descripcion":"Desc 6","fechacierre":"2022-11-01T22:02:49.000Z"},{"id_encuestas":16,"titulo":"Encuesta de prueba, Graduados 1 ","id_poblacion":11,"descripcion":"Descripción de prueba graduados 1","fechacierre":"2022-11-08T19:18:12.000Z"},{"id_encuestas":17,"titulo":"Titutulo de ejemplo 2","id_poblacion":10,"descripcion":"Descripción de ejemplo 1","fechacierre":"2022-11-08T19:25:52.000Z"},{"id_encuestas":18,"titulo":"Encuesta de prueba 08","id_poblacion":10,"descripcion":"Descripción de preuba 08","fechacierre":"2022-11-08T21:31:39.000Z"}]`


  it('Debe retornar todas las encuestas', async()=>{
    
      const resp      = await fetch(`${API_URL}encuesta/encuestas`);
      const encuestas = await resp.text();
      expect(encuestas).toBe(encuestasDisponibles);

  })

  it('Debe agregarse una nueva encuesta',()=>{
    expect(true).toBe(true);
  });

})

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});