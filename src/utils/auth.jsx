//Especifica la BASE_URL de la API de autenticación
export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

//Función para manejar el registro de un nuevo usuario
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    // Realiza una solicitud POST a la ruta de registro de la API
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`); // si la respuesta es exitosa, devuelve los datos en formato JSON; de lo contrario, rechaza la promesa con un mensaje de error
  });
};

//Función para manejar el inicio de sesión de un usuario existente
export const authorize = (email, password) => {
  // Realiza una solicitud POST a la ruta de inicio de sesión de la API
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

// //Función para verificar el token del usuario
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado de autorización
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};
