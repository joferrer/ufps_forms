

class Poblacion {

    /*
    constructor(id_poblacion, nombre){

        this.id_poblacion = id_poblacion;
        this.nombre = nombre;
        this.setNombre = function(nuevoNombre){
            this.nombre = nuevoNombre;
        }
        this.toString = function(){
            return `id_poblacion:${this.id_poblacion} - nombre: ${this.nombre}`
        }
    }*/
    constructor(jsonD){
        this.id_poblacion = jsonD.id_poblacion;
        this.nombre = jsonD.nombre;
        this.setNombre = function(nuevoNombre){
            this.nombre = nuevoNombre;
        }
        this.toString = function(){
            return `id_poblacion:${this.id_poblacion} - nombre: ${this.nombre}`
        }
    }
}

module.exports = Poblacion;