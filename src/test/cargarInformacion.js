const API_URL = 'http://localhost:3200/api/';

export const traerInfo = async()=>{

    const resp      = await fetch(`${API_URL}encuesta/encuestas`);
    const encuestas = await resp.text();

    const dataPoblaciones =  await fetch(`${API_URL}poblacion/poblaciones/`);
    const poblaciones = await dataPoblaciones.text();


    const datos = {
        encuestasVigentes: encuestas,
        poblaciones
    }

    return datos; 

}


export const getEncuestaDePoblacion = async(id = 0)=>{
    const resp      = await fetch(`${API_URL}encuesta/encuestas/${id}`);
    const encuestas = await resp.text();   

    return encuestas;

}

export const publicarEncuesta = async(datos = {})=>{

    const {
        id_encuesta,
        titulo,
        descripcion,
        id_poblacion,
        fechacierre} = datos;

    const resp      = await fetch(`${API_URL}encuesta/publicar/${id_poblacion}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(datos)

    });
    const respuesta = await resp.text();   
    
    return resp.status;
}
