# 🗺️ Alrededor de los EE.UU. (Versión React)

## Alrededor de los EE.UU. es una aplicación web interactiva desarrollada con React. Permite a los usuarios registrarse, iniciar sesión, gestionar su perfil, agregar tarjetas con imágenes, interactuar con ellas (dar "me gusta") y eliminarlas dinámicamente. El proyecto está construido sobre una arquitectura de componentes moderna, aprovechando el manejo del estado, hooks y Context API de React.

## 📚 Tabla de Contenido

- [🎯 Objetivo del Proyecto](#-objetivo-del-proyecto)
- [🧰 Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [⚙️ Funcionalidades Clave](#️-funcionalidades-clave)
- [🖼️ Captura de Pantalla](#️-captura-de-pantalla)
- [🚀 Cómo Visualizar el Proyecto](#-cómo-visualizar-el-proyecto)
- [🧪 Mejoras Futuras](#-mejoras-futuras)
- [👨‍💻 Autor](#-autor)

## 🎯 Objetivo del Proyecto

Este proyecto fue creado como parte del curso de desarrollo web de TripleTen para aplicar conceptos esenciales de desarrollo front-end, incluyendo la manipulación del estado, la gestión de componentes y el uso de hooks en React.

El proyecto se construyó con una arquitectura modular y escalable utilizando HTML5 para la estructura semántica, CSS3 para el diseño responsivo y React (con JSX y ES6+) para toda la lógica interactiva.

- La arquitectura del proyecto se basa en los siguientes principios:
- **Componentes Funcionales y Reutilizables**: Diseño modular donde cada parte de la interfaz es un componente funcional e independiente (`Card`, `Popup`, `Main`), promoviendo la reutilización y mantenibilidad del código.
- **Manejo de Estado con Hooks**: Uso de `useState` para el estado local de los componentes, `useEffect` para manejar efectos secundarios (como llamadas a la API) y `useContext` para un estado global accesible.
- **Manejo de Formularios**: Implementación de formularios para la edición de perfil, avatar y adición de tarjetas, combinando `useRef` para acceso directo a los inputs y `useState` para gestionar la validación en tiempo real y los estados de carga.
- **Renderizado Condicional**: Los pop-ups y otros elementos se muestran u ocultan en función del estado de la aplicación.
- **Manejo de Eventos**: Eventos como clics y envíos de formularios se gestionan con funciones pasadas como props entre componentes.
- **Context API**: Para proveer estado global (como la información del usuario) a componentes anidados sin necesidad de pasar props manualmente a través de todos los niveles (prop drilling).

---

## 🧰 Tecnologías Utilizadas

- ✅ **React** – Biblioteca de JavaScript para construir interfaces de usuario.
- 🛠️ **Vite** – Herramienta de desarrollo para un inicio y recarga en caliente (HMR) ultrarrápidos.
- 🎨 **JSX** – Extensión de sintaxis de JavaScript para describir la interfaz.
- 🎨 **CSS3** – Diseño responsivo y modular.
- ⚙️ **JavaScript (ES6+)** – Lógica de la aplicación con sintaxis moderna.
- ⚛️ **Hooks de React** – `useState`, `useEffect`, `useContext` y `useRef` para el manejo del estado, ciclo de vida, contexto y referencias a elementos DOM.
- 🌐 **Context API** - Para la gestión de estado global del usuario.
- 🧩 **Componentes Reutilizables y Puros** - optimización del rendimiento y aplicación de Higher Order Components (HOC).
- 🌐 **APIs REST** – comunicación cliente/servidor en tiempo real.
- 🔄 **Programación Asíncrona** – setTimeout, Promises, Promise.all.
- 🔐 **Autenticación JWT** – Registro, login y almacenamiento seguro en localStorage.
- 🧪 **Validación de formularios en tiempo real** – Habilita/deshabilita botones y muestra errores dinámicamente.
- 🛠️ **Git & GitHub** – control de versiones y despliegue.

---

## ⚙️ Funcionalidades Clave

- 🏗️ Arquitectura modular y escalable basada en componentes de React.
- ✏️ Edición del perfil y del avatar a través de modales.
- ➕ Añadir nuevas tarjetas mediante formularios con validación.
- ❤️ Dar "me gusta" dinámicamente mediante la actualización del estado de la tarjeta.
- 🗑️ Eliminar tarjetas de forma dinámica y con pop-up de confirmación.
- 🔍 Ampliar imágenes con pop-ups.
- ✏️ Registro y login de usuarios con validación de formularios.
- 🌐 Integración con API externa para registro, login y verificación de token.

---

## 🖼️ Captura de Pantalla

### Vista principal

---

## 🚀 Cómo Visualizar el Proyecto

Puedes ver el proyecto en acción aquí:
👉 [https://github.com/AlejandroM21/web_project_around_react](https://alejandrom21.github.io/web_project_around_react/)

---

## 🧪 Mejoras Futuras

- Subida de imágenes desde el dispositivo.
- Implementación de rutas protegidas avanzadas y re-direcciones automáticas.
- Mejoras en seguridad y manejo de tokens.
- Integración completa con backend propio para CRUD de usuario y tarjetas.

---

## 👨‍💻 Autor

Desarrollado por **Alejandro Meléndez**  
Proyecto académico realizado para **TripleTen - Programa de Desarrollo Web**.
