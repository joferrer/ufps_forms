class Encuesta {

    constructor(jsonE){

        this.id_encuesta  = jsonE.id_encuesta;
        this.titulo       = jsonE.titulo;
        this.id_poblacion = jsonE.id_poblacion;
        this.descripcion   = jsonE.descripcion;
        this.fechacierre  = jsonE.fechacierre;



    }

}

module.exports = Encuesta;