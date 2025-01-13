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

### 5. Ejecutar el Servidor en Modo Desarrollo
Inicia el servidor con el siguiente comando:
```bash
npm run dev
```

## Notas
- Asegúrate de que el archivo `.env` tenga valores válidos antes de iniciar el proyecto.
- Si necesitas detener los contenedores Docker, puedes usar:
```bash
docker compose down
