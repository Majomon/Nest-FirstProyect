
# Instalación y Uso de Docker en el Proyecto

Esta documentación detalla los pasos necesarios para crear y correr una imagen Docker en el proyecto. Asegúrate de seguir cada paso con precisión.

## Pasos previos

Antes de comenzar, elimina las siguientes carpetas si existen:

1. **Eliminar la carpeta `dist`**: 
   ```bash
   rm -rf dist
   ```

2. **Eliminar la carpeta `node_modules`**:
   ```bash
   rm -rf node_modules
   ```

## Pasos para construir y correr la imagen Docker

1. **Construir la imagen Docker**:

   Para construir la imagen del proyecto con Docker, usa el siguiente comando:
   ```bash
   docker build .
   ```

2. **Construir la imagen con un nombre personalizado**:

   Si deseas asignar un nombre específico a la imagen durante la construcción, usa el flag `-t` seguido del nombre que elijas:
   ```bash
   docker build . -t nombre-imagen
   ```

3. **Correr la imagen**:

   Para levantar (correr) la imagen Docker y exponerla en un puerto, usa el siguiente comando. En este caso, el puerto 3001 de la máquina local se conectará al puerto 3000 del contenedor:
   ```bash
   docker run -p 3001:3000 nombre-imagen
   ```

## Utilidades adicionales

- **Verificar imágenes en ejecución**:

   Para listar las imágenes que están corriendo actualmente:
   ```bash
   docker ps
   ```

- **Detener una imagen en ejecución**:

   Si necesitas detener una imagen que está corriendo, puedes hacerlo con el siguiente comando, reemplazando `nombre-imagen` por el nombre o ID de la imagen:
   ```bash
   docker stop nombre-imagen
   ```
---

¡Y eso es todo! Ahora deberías tener tu proyecto corriendo con Docker.
