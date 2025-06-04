# API de Gestión de Usuarios y Roles

## 🎯 Descripción del Problema

En muchas organizaciones, la gestión manual de usuarios y roles se vuelve compleja y propensa a errores cuando crece el número de empleados. Los problemas comunes incluyen:

- **Duplicación de datos**: Usuarios registrados múltiples veces con diferentes identificaciones o correos
- **Asignación incorrecta de roles**: Empleados con permisos inadecuados para sus funciones
- **Falta de validación**: Datos incompletos o incorrectos en los registros de usuarios
- **Dificultad de consulta**: No hay manera eficiente de ver usuarios con sus roles asignados
- **Inconsistencia**: Diferentes formatos de datos y falta de estandarización

## 🚀 Solución Propuesta

Esta API REST resuelve estos problemas proporcionando:

- **Sistema centralizado** para gestión de usuarios y roles
- **Validaciones robustas** que previenen datos duplicados o incorrectos
- **Relaciones consistentes** entre usuarios y roles
- **Consultas optimizadas** para obtener información completa
- **Arquitectura escalable** que crece con las necesidades de la organización

Una API REST robusta construida con Node.js, Express, TypeScript y MongoDB que ofrece un sistema completo de gestión con validaciones automáticas y arquitectura escalable.

## 🚀 Características

- **Gestión de Roles**: Crear y listar roles del sistema
- **Gestión de Usuarios**: CRUD completo de usuarios con asignación de roles
- **Validaciones**: Validación de datos con class-validator y DTOs
- **TypeScript**: Código fuertemente tipado para mayor robustez
- **Base de datos**: MongoDB con Mongoose ODM
- **CORS**: Configurado para desarrollo con frontend
- **Manejo de errores**: Sistema centralizado de manejo de errores

## 📋 Prerequisitos

- Node.js (versión 16 o superior)
- MongoDB (local o Atlas)
- npm o yarn

## 🛠️ Instalación y Configuración

### Paso 1: Preparar el entorno

1. **Verificar Node.js**
   ```bash
   node --version  # Debe ser v16 o superior
   npm --version
   ```

2. **Instalar MongoDB** (si no lo tienes)
   - **Opción A - MongoDB Local:**
     - Descarga desde [mongodb.com](https://www.mongodb.com/try/download/community)
     - Sigue las instrucciones de instalación para tu SO
   - **Opción B - MongoDB Atlas (Cloud):**
     - Crea una cuenta gratuita en [MongoDB Atlas](https://www.mongodb.com/atlas)
     - Crea un cluster gratuito
     - Obtén tu cadena de conexión

### Paso 2: Configurar el proyecto

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Manolinhopng/parcialElectiva3Back.git
   cd gestion-usuarios-roles
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   # Puerto del servidor
   PORT=5000
   
   # Base de datos - Elige una opción:
   
   # Opción 1: MongoDB Local
   MONGODB_URI=mongodb://localhost:27017/usuarios_roles
   
   # Opción 2: MongoDB Atlas (reemplaza con tus datos)
   # MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/usuarios_roles?retryWrites=true&w=majority
   ```

### Paso 3: Ejecutar el proyecto

1. **Iniciar MongoDB** (solo si usas instalación local)
   ```bash
   # En Windows
   mongod
   
   # En macOS/Linux
   sudo systemctl start mongod
   # o
   brew services start mongodb/brew/mongodb-community
   ```

2. **Ejecutar la aplicación**
   ```bash
   # Modo desarrollo (con auto-reload)
   npm run dev
   
   # O compilar y ejecutar
   npm run build
   npm start
   ```

3. **Verificar que funciona**
   - Abre tu navegador en: http://localhost:5000
   - Deberías ver: "API de Gestión de Usuarios y Roles - ¡Funcionando!"

### Paso 4: Probar la API

1. **Crear tu primer rol**
   ```bash
   curl -X POST http://localhost:5000/api/roles \
     -H "Content-Type: application/json" \
     -d '{
       "nombre": "Administrador",
       "descripcion": "Acceso completo al sistema"
     }'
   ```

2. **Verificar que se creó**
   ```bash
   curl http://localhost:5000/api/roles
   ```

3. **Crear un usuario** (usa el ID del rol creado)
   ```bash
   curl -X POST http://localhost:5000/api/users \
     -H "Content-Type: application/json" \
     -d '{
       "nombres": "Juan",
       "apellidos": "Pérez",
       "identificacion": "12345678",
       "email": "juan.perez@email.com",
       "rolId": "REEMPLAZA_CON_EL_ID_DEL_ROL"
     }'
   ```

### ⚠️ Solución de Problemas Comunes

**Error: "MongoDB connection failed"**
- Verifica que MongoDB esté ejecutándose
- Confirma que la URL en MONGODB_URI sea correcta
- Para Atlas, verifica usuario, password y whitelist IP

**Error: "Port 5000 already in use"**
- Cambia el puerto en el archivo `.env`: `PORT=3001`
- O termina el proceso que usa el puerto 5000

**Error: "Cannot find module"**
- Ejecuta `npm install` nuevamente
- Verifica que estés en el directorio correcto del proyecto

**Error de validación al crear usuarios**
- Asegúrate de crear al menos un rol antes de crear usuarios
- Verifica que el `rolId` sea un ObjectId válido de MongoDB

## 🏗️ Estructura del Proyecto

```
src/
├── config/
│   └── database.ts          # Configuración de MongoDB
├── controllers/
│   ├── role.controller.ts   # Controladores de roles
│   └── user.controller.ts   # Controladores de usuarios
├── interfaces/
│   ├── role.interface.ts    # Interfaces de roles
│   └── user.interface.ts    # Interfaces de usuarios
├── middleware/
│   └── validation.middleware.ts # Middleware de validación
├── models/
│   ├── roleModel.ts         # Modelo de roles
│   └── userModel.ts         # Modelo de usuarios
├── routes/
│   ├── role.routes.ts       # Rutas de roles
│   └── user.routes.ts       # Rutas de usuarios
├── utils/
│   └── asyncHandler.ts      # Utilidad para manejo de errores async
├── validations/
│   ├── role.validation.ts   # DTOs y validaciones de roles
│   └── user.validation.ts   # DTOs y validaciones de usuarios
└── index.ts                 # Punto de entrada de la aplicación
```

## 📡 API Endpoints

### Roles

#### Obtener todos los roles
```http
GET /api/roles
```

**Respuesta:**
```json
[
  {
    "_id": "64a7b8c9d1e2f3g4h5i6j7k8",
    "nombre": "Administrador",
    "descripcion": "Acceso completo al sistema",
    "createdAt": "2023-07-07T10:30:00.000Z",
    "updatedAt": "2023-07-07T10:30:00.000Z"
  }
]
```

#### Crear un nuevo rol
```http
POST /api/roles
Content-Type: application/json

{
  "nombre": "Administrador",
  "descripcion": "Acceso completo al sistema"
}
```

### Usuarios

#### Obtener todos los usuarios
```http
GET /api/users
```

#### Obtener usuarios con nombres de roles
```http
GET /api/users/with-roles
```

**Respuesta:**
```json
[
  {
    "id": "64a7b8c9d1e2f3g4h5i6j7k8",
    "fullName": "Juan Pérez",
    "rolNombre": "Administrador"
  }
]
```

#### Crear un nuevo usuario
```http
POST /api/users
Content-Type: application/json

{
  "nombres": "Juan",
  "apellidos": "Pérez",
  "identificacion": "12345678",
  "email": "juan.perez@email.com",
  "rolId": "64a7b8c9d1e2f3g4h5i6j7k8"
}
```

## 🔧 Validaciones

### Roles
- **nombre**: Requerido, máximo 50 caracteres, único
- **descripcion**: Opcional, máximo 200 caracteres

### Usuarios
- **nombres**: Requerido, máximo 100 caracteres
- **apellidos**: Requerido, máximo 100 caracteres
- **identificacion**: Requerido, máximo 20 caracteres, único
- **email**: Requerido, formato válido, máximo 100 caracteres, único
- **rolId**: Requerido, debe ser un ObjectId válido de MongoDB

## 🏷️ Códigos de Estado HTTP

- `200` - OK: Operación exitosa
- `201` - Created: Recurso creado exitosamente
- `400` - Bad Request: Datos de entrada inválidos
- `409` - Conflict: Recurso ya existe (duplicado)
- `412` - Precondition Failed: Condición previa no cumplida
- `500` - Internal Server Error: Error interno del servidor

## 🛡️ Manejo de Errores

La API incluye un sistema robusto de manejo de errores:

- Validación automática de DTOs con mensajes descriptivos
- Verificación de duplicados antes de crear recursos
- Validación de existencia de roles antes de asignar usuarios
- Manejo centralizado de errores asíncronos

## 🧪 Guía de Pruebas Paso a Paso

### Usando curl (Terminal)

1. **Crear roles del sistema**
   ```bash
   # Crear rol de Administrador
   curl -X POST http://localhost:5000/api/roles \
     -H "Content-Type: application/json" \
     -d '{
       "nombre": "Administrador",
       "descripcion": "Acceso completo al sistema"
     }'

   # Crear rol de Usuario
   curl -X POST http://localhost:5000/api/roles \
     -H "Content-Type: application/json" \
     -d '{
       "nombre": "Usuario",
       "descripcion": "Acceso básico"
     }'
   ```

2. **Listar todos los roles**
   ```bash
   curl http://localhost:5000/api/roles
   ```

3. **Crear usuarios** (reemplaza ROLE_ID con un ID real)
   ```bash
   curl -X POST http://localhost:5000/api/users \
     -H "Content-Type: application/json" \
     -d '{
       "nombres": "María",
       "apellidos": "González",
       "identificacion": "87654321",
       "email": "maria.gonzalez@email.com",
       "rolId": "ROLE_ID_AQUI"
     }'
   ```

4. **Ver usuarios con roles**
   ```bash
   curl http://localhost:5000/api/users/with-roles
   ```

### Usando Postman

1. **Importar colección**: Crear requests con los siguientes endpoints:
   - `GET http://localhost:5000/api/roles`
   - `POST http://localhost:5000/api/roles`
   - `GET http://localhost:5000/api/users`
   - `POST http://localhost:5000/api/users`
   - `GET http://localhost:5000/api/users/with-roles`

2. **Headers necesarios**: 
   ```
   Content-Type: application/json
   ```

## 🔄 Scripts Disponibles

```bash
npm run dev      # Ejecutar en modo desarrollo
npm run build    # Compilar TypeScript
npm start        # Ejecutar versión compilada
```

## 🏛️ Arquitectura

El proyecto sigue una arquitectura por capas:

1. **Rutas**: Definen los endpoints y aplican middleware
2. **Controladores**: Manejan la lógica de negocio
3. **Modelos**: Definen la estructura de datos en MongoDB
4. **Validaciones**: DTOs con class-validator para validar entrada
5. **Interfaces**: Tipado TypeScript para consistencia
6. **Middleware**: Funciones intermedias para validación y manejo de errores

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

Tu nombre - [tu.email@ejemplo.com]

## 🔮 Roadmap

- [ ] Autenticación JWT
- [ ] Paginación en listados
- [ ] Filtros y búsqueda
- [ ] Logs del sistema
- [ ] Tests unitarios
- [ ] Documentación con Swagger
- [ ] Docker support
