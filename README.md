proyecto de buscador de cursos

Instrucciones de Instalación

Clonar el Repositorio:
Cliente: Dirígete a la carpeta del cliente:
Instala las dependencias:

npm install

luego en la consola cd client y alli ejecutas npm start y debe iniciar todo. 

MongoDB:
nombre: cursosApp
coleccion cursos: cursos_UTN
coleccion usuarios: users
coleccion articulos: blogs

-------

Para ejecutar el cliente en modo desarrollo:

npm run dev

El cliente debería ahora estar corriendo en http://localhost:5173 (o el puerto que Vite use por defecto).

Configurar el lado del Servidor:
cd server Instala las dependencias:

npm install

Nota: Asegúrate de tener configurada la conexión a tu base de datos para eso corre mongo compass y agarra la direccion que te dan y la pones en la ruta de de servidor.js y el nombre de la base de datos ponle cursosApp asi te corre como a mi

node servidor.js corres el server.

