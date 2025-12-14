/**
 * La clave utilizada para almacenar el token JWT en el almacenamiento local.
 */
const TOKEN_KEY = "token";

/**
 * Guarda el token JWT en el almacenamiento local.
 * @param {string} token El token JWT a guardar.
 */
export const setToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error("No se pudo guardar el token en localStorage:", e);
  }
};

//Funcion que obtiene el token del almacenamiento local del navegador
//getItem recupera el valor asociado a la clave TOKEN_KEY del almacenamiento local
//Si no se encuentra el token, getItem devuelve null.
//Se utiliza para verificar si el usuario ha iniciado sesión o no, determinar si el usuario tiene una sesión activa
//o necesita iniciar sesión nuevamente, dependiendo de si el token está presente o no
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.error("No se pudo leer el token de localStorage:", e);
    return null;
  }
};

/**
 * Elimina el token JWT del almacenamiento local.
 */
export const removeToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error("No se pudo eliminar el token de localStorage:", e);
  }
};
