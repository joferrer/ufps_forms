# UFPS_FORMS

## Composición 

El repositorio cuenta con cuatro carpetas importante: 
- database: En esta carpeta se encuetra el index.js y las routes del servido.
- models: En esta carpeta están los modelos (Schemas) de los datos. 
- node_module: En esta carpeta están los modulos de node.
- test: En esta carpeta están las pruebas unitarias.



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

## Servicios de encuestado.

### GET /api/encuestado/mostrar/:id -->(id = id_poblacion) 

Retorna todos los encuestados de una población data en el params de la petición. 

### POST /api/encuestado/registrar/:id--> (id = id_poblacion) 

Registra un encuestado a una población dada por petición. Tenga encuesta el siguiente body de ejemplo:

  Content-Type: application/json

  {
    "id_encuestado": 0,
    "correo": "nelsonbeltran@ufps.edu.co",
    "id_poblacion": 0
  }


## Servicios de población.

### GET /api/poblacion/poblaciones

Retornará todas las poblaciones actuales en el sistema.  

### GET /api/poblacion/poblaciones/:id -->(id = id_poblacion)

Retornará la población identificada con la id correspondiente. 

### POST /api/poblacion/subir 

 Crea un población nueva en la base de datos. Tenga encuesta el siguiente body de ejemplo: 

  Content-Type: application/json

  {
    "id_poblacion": 2,
    "nombre": "Docentes"
  }

## Servicios de administrador. 


### GET /api/admin/registrados 

Retorna todos los usuarios registrados como administrador. 


### POST /api/admin/registrar 

Registra un nuevo administrador al sistema. Tenga en cuenta este body de ejemplo para su petición. 

  Content-Type: application/json

  {
    "id_administrador": 2,
    "correo": "joferrer@ufps.edu.co",
    "contrasena": "***"
  }

### DELETE /api/admin/eliminar/:id --> (id: id_administrador) 

Elimina un administrador de la base de datos. 

## Servicios de encuesta.

### GET /api/encuesta/encuestas 

Retorna todas las encuestas presentes en el sistema. 

### GET /api/encuesta/encuestas/:id (id: id_poblacion)

Retorna todas las encuestas asociadas a una población dada.

### GET /api/encuesta/encuesta/:id (id: id_encuesta)

Busca y retorna la encuesta identificada con la id dada. 


### POST /api/encuesta/publicar/:id (id: id_poblacion)


Crea una nueva encuesta asociada la la población dada. Tenga en cuenta el siguiente body de ejemplo:

Content-Type: application/json

{
    "id_encuesta": 0,
    "nombre": "Encuesta de nivel de satisfacción con UFPS-FORMS",
    "porcentaje": 0,
    "id_poblacion": 0
}

## Servicios de pregunta.

### GET /api/pregunta/preguntas 

Retorna todas las preguntas del sistema. 

### GET /api/pregunta/:id (id: id_pregunta)

Busca y retorna una pregunta dada su id

### GET /api/pregunta/preguntas/:id (id: id_encuesta)

Busca y retorna todas las preguntas asociadas a una encuesta dada su id. 

### POST /api/pregunta/agregarpregunta/:id (id: id_encuesta)

Crea y asocia una pregunta a una encuesta dada su id. Tenga en cuenta el siguiente body de ejemplo: 

Content-Type: application/json

{
    "id_pregunta": 0,
    "enunciado": "¿Cuan satifecho esta con UFPS-FORMS?",
    "tipo": 0,
    "id_encuesta": 0
}

### DELETE /api/pregunta/eliminar/:id (id: id_pregunta)

Elimina una pregunta dada su id. 