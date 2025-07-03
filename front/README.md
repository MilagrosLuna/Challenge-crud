# Challenge de Ingreso - Gobierno de la Ciudad de Buenos Aires

Este proyecto es una aplicación **CRUD de Gestión de Empleados**, desarrollada como parte del proceso de selección. Utiliza tecnologías modernas como **Next.js**, **TypeScript**, **Prisma ORM** y **MySQL**, cumpliendo los 5 niveles del desafío propuesto.

---

## Descripción del Proyecto

Permite realizar las siguientes acciones:

- ✅ Crear empleados
- ✅ Editar empleados
- ✅ Eliminar empleados(baja lógica)
- ✅ Listar empleados activos
- ✅ Asociar empleados a distintas áreas
- ✅ Crear áreas
- ✅ Editar áreas
- ✅ Eliminar áreas(baja lógica)

---

## Tecnologías

| Tecnología          | Descripción                            |
| ------------------- | -------------------------------------- |
| **Next.js**         | Framework de React para frontend y API |
| **React + TS**      | UI con componentes reutilizables       |
| **Prisma ORM**      | Manejo de base de datos                |
| **MySQL**           | Almacenamiento relacional              |
| **Tailwind CSS**    | Estilado rápido y moderno              |
| **React Hook Form** | Manejo eficiente de formularios        |

## Instalación y Configuración

### **1️⃣ Clonar el repositorio**

```sh
 git clone https://github.com/MilagrosLuna/
 cd 
```

### **2️⃣ Instalar dependencias**

```sh
 npm install
```

### **3️⃣ Configurar variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto y añade las siguientes variables:

```env
DATABASE_URL="mysql://root:@localhost:3306/crud_empleados"
```

o la correspondiente a tu sistema de gestión de MySQL

### **4️⃣ Configurar la base de datos**
Elegí MySQL ya que al ser un proyecto de dos tablas y una relación simple, es más sencillo mantener de forma ordenada la relación entre empleados y áreas. Para que la aplicación funcione correctamente, es necesario importar la base de datos en el sistema de gestión de MySQL que estés utilizando (MySQL Workbench, phpMyAdmin, línea de comandos, etc.) o crearla manualmente con el siguiente esquema:

```sql
CREATE DATABASE crud_empleados;

USE crud_empleados;

CREATE TABLE Area (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  isDeleted BOOLEAN DEFAULT false
);
CREATE TABLE Empleado (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombreCompleto VARCHAR(255) NOT NULL,
  dni VARCHAR(20) UNIQUE NOT NULL,
  fechaNacimiento DATE NOT NULL,
  esDesarrollador BOOLEAN NOT NULL,
  descripcion TEXT NOT NULL,
  areaId INT NOT NULL,
  isDeleted BOOLEAN DEFAULT false,
  FOREIGN KEY (areaId) REFERENCES Area(id)
);
INSERT INTO Area (nombre) VALUES ('Recursos Humanos');
INSERT INTO Empleado (
  nombreCompleto, dni, fechaNacimiento, esDesarrollador,
  descripcion, areaId
) VALUES (
  'Juan Pérez', '12345678', '2000-05-12', true,
  'Frontend developer', 1
);

```

### **5️⃣ Iniciar el servidor de desarrollo**

```sh
 npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

---

## 📌 Endpoints de la API

| Método | Ruta                 | Descripción                 |
| ------ | -------------------- | --------------------------- |
| GET    | `/api/empleados`     | Listar empleados activos    |
| POST   | `/api/empleados`     | Crear un nuevo empleado     |
| PUT    | `/api/empleados/:id` | Editar datos de un empleado |
| DELETE | `/api/empleados/:id` | Baja lógica (soft delete)   |
| GET    | `/api/areas`         | Listar áreas                |
| POST   | `/api/areas`         | Crear una nueva área        |
| PUT    | `/api/areas/:id`     | Editar datos de un área     |
| DELETE | `/api/areas/:id`     | Baja lógica (soft delete)   |

---

## 📌 Estimación de tareas

| Tarea                                     | Tiempo estimado |
| ----------------------------------------- | --------------- |
| Configuración del entorno y base de datos | 30 minutos      |
| Desarrollo de API REST                    | 2 horas         |
| Creación del componentes                  | 2 horas         |
| Pruebas y documentación                   | 1 hora          |



---

📌 **Autor:** [Milagros Luna]
