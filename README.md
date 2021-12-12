<h1 align="center">
 GoUML
</h1>

<details open="open">
<summary>Contenido</summary>

- [Objetivo](#objetivo)
- [Tecnologías usadas](#tecnologías-usadas)
- [Instalación](#instalación)
  - [`npm install`](#npm-install)
  - [`npm start`](#npm-start)
- [Características](#características)
- [Características que no se pudieron implementar](#características-que-no-se-pudieron-implementar)
- [Arquitectura](#arquitectura)
- [Deploy-Repositorio](#deploy-repositorio)
</details>

---

## Objetivo

GoUML es un sitio web para UML que soporta creación de clases, herencia y dependencias, donde se puede trabajar tanto en Canvas como en SVG, sitio que fue desarrollado con ReactJS

## Tecnologías usadas

- ReactJS
- JS
- CSS
- HTML

## Instalación

Una vez descargado, se puede ejecutar en la dirección del proyecto:

Para instalar todos los paquetes necesarios:

### `npm install`

Para iniciar el proyecto:

### `npm start`

Ejecuta la aplicación en el modo de desarrollo.
Abra [http://localhost:3000](http://localhost:3000) para verlo en su navegador.

## Características

Tanto para `canvas` como para `SVG`

- Crear clases.
![new](https://github.com/IsmaDavidAA/onlineUML/blob/main/src/images/nueva%20clase.gif)
- Relación de herencia.
- Relación de dependencia.
- Guardar en localStorage.
![save](https://github.com/IsmaDavidAA/onlineUML/blob/main/src/images/guardar%20diagrama.gif)
- Eliminar de localStorage.
- Limpiar pantalla eliminando todas las clases en una sola acción.

## Características que no se pudieron implementar

Tanto para `canvas` como para `SVG`

- Gestionar los modelos.
- Responsive.
- Lineas de relaciones con mejor estética.
- Editar y eliminar clases.
- Editar y eliminar relaciones entre clases.

## Arquitectura

### App
Este fichero app.js ya viene incluido con React, es el que renderiza en el index.js, es decir, es el que muestra en la vista cuando lo levantamos. 
Este componente es base para para continua con el proyecto , ya que en el podremos configurar las rutas internas para la nevegación.

![a](https://github.com/IsmaDavidAA/onlineUML/blob/main/src/images/app.png)
### Constants
En este componente definimos los tipos de relaciones que tiene cada clase: dependencia, herencia o en algún caso ninguno.

![co](https://github.com/IsmaDavidAA/onlineUML/blob/main/src/images/constants.png)
### GlobalStyles
El fichero definimos los estilos de forma global, es decir, de toda la app en general.

![g](https://github.com/IsmaDavidAA/onlineUML/blob/main/src/images/globalStyles.png)
### Utils
Este archivo es para trabajar la parte matemática o lógica, en este caso tenemos el fichero Calculator.js.

![ca](https://github.com/IsmaDavidAA/onlineUML/blob/main/src/images/calculator.png)
#### Calculator
El fichero Calculator.js, es el que realiza los calculos de tamaño de la clase (según el tamaño del nombre y las cantidades de atributos o métodos), separadores de linea, genera los IDs de cada clase,etc.
### Views
Ete archivo es para la visualización del usuario dentro de la pizarra de la app.
Nuestro directorio de archivos es de la siguiente manera:

![v](https://github.com/IsmaDavidAA/onlineUML/blob/main/src/images/views.png)
#### HomeView
El fichero es para las funcionalidades del inicio de la app, es decir, direcciona los botones, ya sea la ventana de svg o canvas.

#### CanvasView
El fichero es para la creación y visualización de nuevas clases, con su respectivo datos como: nombre, atributo, método, tipo de relación, etc., es decir, las graficaciones con canvas.
#### SvgView
El fichero es para la creación y visualización de nuevas clases, con su respectivo datos como: nombre, atributo, método, tipo de relación, etc., es decir, las graficaciones con svg.
### Components
Un componente es un archivo js que se usa para construir interfaces de usuario de manera rápida y eficiente. Es la parte lógica que controla un trozo de pantalla como por ejemplo el nav, el footer, un article, un section, etc.
Nuestro directorio de archivos se ve de la siguiente manera:

![com](https://github.com/IsmaDavidAA/onlineUML/blob/main/src/images/componentes.png)
### Hooks
Los hooks son funciones que te permiten "enganchar" el estado de React y el ciclo de vida desde los componentes de función.
Nuestro directorio de archivos se ve de la siguiente manera:

![h](https://github.com/IsmaDavidAA/onlineUML/blob/main/src/images/hooks.png)
#### useModal
El fichero es para definir el estado del modelo, open o close.
#### useClasses
El fichero es para definir los estados de cada clase, con sus respectivos datos, también guarda todas las clases en un map y en el localstorage.
### Events
Este fichero es para el manejo de eventos que realizamos en la app.
Nuestro directorio de archivos se ve de la siguiente manera:

![e](https://github.com/IsmaDavidAA/onlineUML/blob/main/src/images/events.png)
#### Events
Es para las funcionalidades del manejo de mouse, a la hora de relacionar dos clases dentro de la pizarra, tanto svg como canvas.
## Deploy-Repositorio

Abra [https://umlcanvassvg.herokuapp.com/](https://umlcanvassvg.herokuapp.com/) para probar la aplicación.

Abra [https://github.com/IsmaDavidAA/onlineUML#readme](https://github.com/IsmaDavidAA/onlineUML#readme) para descargar el codigo fuente y ver mas detalles.
