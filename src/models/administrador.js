class Administrador{
    constructor(jsonAdministrador){
        this.id_administrador = jsonAdministrador.id_administrador;
        this.correo = jsonAdministrador.correo;
        this.contrasena = jsonAdministrador.contrasena;

        this.toString = function(){
            return `id_admin:${this.id_administrador} - correo: ${this.correo}`
        }
    }
    
}
module.exports = Administrador;