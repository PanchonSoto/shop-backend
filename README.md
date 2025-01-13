# Proyecto Setup

Readme para levantar el proyecto de la prueba técnica full stack.

## Pasos de Instalación

### 1. Instalar Dependencias
Ejecuta el siguiente comando para instalar todas las dependencias necesarias:
```bash
npm install
```

### 2. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:
```env
PORT=
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_PASSWORD=
POSTGRES_HOST=
JWT_SEED=
```

Completa los valores según tu configuración.

### 3. Configurar Docker
- Asegúrate de que Docker esté instalado y funcionando.
- Verifica que no haya ningún contenedor de PostgreSQL ejecutándose en el puerto que usarás.
- En la raíz del proyecto, ejecuta el siguiente comando:
```bash
docker compose up -d
```

### 4. Migraciones
Para que Sequelize pueda utilizar las migraciones, transpila los archivos a JavaScript ejecutando:
```bash
npm run migrate
```

### 5. Seeds
Para que Sequelize genere los seed, puedes ejecutar el siguiente comando:
```bash
npm run seed
```
Para que Sequelize borre los seed, puedes ejecutar el siguiente comando:
```bash
npm run deleteseed
```

### 6. Ejecutar el Servidor en Modo Desarrollo
Inicia el servidor con el siguiente comando:
```bash
npm run dev
```

## Notas
- Asegúrate de que el archivo `.env` tenga valores válidos antes de iniciar el proyecto.
- Si necesitas detener los contenedores Docker, puedes usar:
```bash
docker compose down

## 🚀 Endpoints principales
# API Documentation

## Postman Collection
Accede a la colección de Postman para probar la API:
[Postman Collection](https://karlo-shop-api.postman.co/workspace/Karlo-shop-API-Workspace~285f9f23-624a-46c4-8ef7-ccf4649337a0/collection/34052977-a31b6ffc-aa57-4821-99e8-d69e729236f4?action=share&creator=34052977)
> **Nota:** Esta colección de Postman está configurada para apuntar a `localhost`. Asegúrate de tener la API corriendo localmente en tu máquina antes de ejecutar los endpoints.

## Auth
- **Login**
  `POST /api/auth/login`

- **Register**
  `POST /api/auth/register`

- **Activate Account**
  `POST /api/auth/activate`

## Users
- **Delete User**
  `DELETE /api/user/delete/7`

- **Obtener Users**
  `GET /api/user`

- **Update Users**
  `PUT /api/user/update/7`

## Negocio
- **Obtener Negocios**
  `GET /api/negocio/`

- **Update Negocios**
  `PUT /api/negocio/update/4`

- **Crear Negocio**
  `POST /api/negocio/create/6` *(userid)*

- **Borrar Negocio**
  `DELETE /api/negocio/delete/4`

## Products
- **Obtener Producto**
  `GET /api/products/`

- **Update Producto**
  `PUT /api/products/update/1`

- **Crear Producto**
  `POST /api/products/create`

- **Borrar Producto**
  `DELETE /api/products/delete/1`

## Orders
- **Obtener Orders**
  `GET /api/orders`

- **Crear Order**
  `POST /api/orders/create`

- **Actualizar Order**
  `PUT /api/orders/update/2`
