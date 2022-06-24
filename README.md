# ufps_forms

## Backend 
Para el backend es necesario crear un documento .env para el uso de las variables de entorno. 

El servidor será mysql y estará desplegado en la nube usando planet scale con la estructura dada en la documentación. 

## Dependencias. 
- express --> Para el manejo del servidor. 
- dotenv --> Variables de ambiente.
- nodemon -D --> Para la etapa de desarrollo.
- mysql --> Para manejar la conexión con la base de datos.
- fetch --> Para el manejo de peticiones HTML
- chai --> Para el manejo de las pruebas unitarias. 
- chai-http --> Para las pruebas unitarias a partir de peticiones http. 

## Servidor

El servidor de la apliación y punto central donde se definen todos los endpoints y la conexión con la base de datos es el archivo index.js ubicado en la ruta ./database/index.js. 

## Routes / Endpoints

Cada servicio cuenta con su propia endpoind. Todas las routes parten del archivo index.js principal ya mensionado anteriormente. 

Las rutas de cada servicio son: 
- /api/encuestado --> Servicios de encuestado.
- /api/poblacion --> Servicios de población.
- /api/admin --> Servicios de administrador. 
- /api/encuesta --> Servicios de encuesta.
- /api/pregunta --> Servicios de pregunta.
- /api/opcion --> Servicios de opciones. 
- /api/respuesta --> Servicios de respuestas. 

Cada ruta da acceso a los servicios de su entidad correspondiente. Hasta ahora se tienen:

### - /api/encuestado --> Servicios de encuestado.

- GET /api/encuestado/mostrar/:id -->(id = id_poblacion) Retorna todos los encuestados de una población data en el params de la petición. 

- POST /api/encuestado/registrar/:id--> (id = id_poblacion) Registra un encuestado a una población dada por petición. Tenga encuesta el siguiente body de ejemplo:

Content-Type: application/json

{
    "id_encuestado": 0,
    "correo": "nelsonbeltran@ufps.edu.co",
    "id_poblacion": 0
}


### - /api/poblacion --> Servicios de población.

- GET /api/poblacion/poblaciones --> Retornará todas las poblaciones actuales en el sistema.  

- GET /api/poblacion/poblaciones/:id -->(id = id_poblacion) Retornará la población identificada con la id correspondiente. 

- POST /api/poblacion/subir --> Crea un población nueva en la base de datos. Tenga encuesta el siguiente body de ejemplo: 

Content-Type: application/json

{
    "id_poblacion": 2,
    "nombre": "Docentes"
}

### - /api/admin --> Servicios de administrador. 

- GET /api/admin/registrados --> Retorna todos los usuarios registrados como administrador. 

- POST /api/admin/registrar --> Registra un nuevo administrador al sistema. Tenga en cuenta este body de ejemplo para su petición. 

Content-Type: application/json

{
    "id_administrador": 2,
    "correo": "joferrer@ufps.edu.co",
    "contrasena": "***"
}

- DELETE /api/admin/eliminar/:id --> (id: id_administrador) Elimina un administrador de la base de datos. 
