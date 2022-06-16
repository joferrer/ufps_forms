class Encuesta {

    constructor(jsonE){

        this.id_encuesta = jsonE.id_encuesta;
        this.nombre = jsonE.nombre;
        this.porcentaje = jsonE.porcentaje;
        this.id_poblacion = jsonE.id_poblacion

    }

}

module.exports = Encuesta;