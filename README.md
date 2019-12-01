# MiAguila
Prueba técnica Mi Águila
David Reina Espinosa
david.reina@outlook.es
3144916000

Esta es mi solución planteada para cumplir con los requerimientos estipulados en el documento enviado para la prueba técnica de Desarrollador de Backend en Javascript.

Los pasos a seguir en el desarrollo de la prueba, fueron los siguientes:
- Se hizo un chequeo de calidad de datos para ingresar la información a la base de datos no relacional MongoDB, ya que los campos de fechas no eran reconocidos como tal a la hora de realizar la importación.
- Se desarrolló una solución con Node.js en la cual se crea un servidor y se exponen los métodos solicitados. Para el desarrollo se tienen en cuenta algunos patrones de diseño y los métodos de HTTP de las rutas.
- Se utiliza el paquete mongoose para la conexión con la base de datos, creando el modelo de los viajes.
- Se usa Git Flow como repositorio.
- Se utiliza Swagger para la documentación del API.

Para hacer funcionar el proyecto, hay un archivo de configuración (env.json), en el cual se exponen los puertos de creación del servidor, y también la conexión a la base de datos Mongo.
Se asume que tanto para la creación, como la actualización de viajes, le llega al API un objeto que cumple con el modelo de viajes.
En la actualización, se toman como llaves los campos conjuntos de fecha de inicio y nombres del cliente, ya que no deberían haber 2 o más registros con esta información igual. Estas llaves se usan para encontrar el registro de viaje que se quiere actualizar.
Adicionalmente, esta API está lista para ser integrada en cualquier servidor de aplicaciones para diferentes sistemas operativos como PM2, agregando algunos archivos de configuración adicionales.
