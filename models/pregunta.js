class Pregunta{
    constructor(json){
        this.id_pregunta = json.id_pregunta;
        this.id_encuesta = json.id_encuesta;
        this.enunciado = json.enunciado;
        this.tipo = json.tipo;
    }

}

module.exports = Pregunta;