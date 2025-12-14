class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //en cada llamada a fetch se usa este metodo para comprobar la respuesta
  // y parsearla a json o rechazar la promesa si hay un error
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  // Estas funciónes hacen una solicitud  a la URL `${this._baseUrl}/...`
  // y usan los encabezados almacenados en this._headers.
  // Luego, procesa la respuesta usando el método _checkResponse para asegurarse
  // de que la respuesta sea válida y convertirla a JSON.

  // Obtener la información del usuario de la API
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Obtener las tarjetas iniciales de la API
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Actualizar la información del usuario en la API
  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      }),
    }).then(this._checkResponse);
  }

  // Añadir una nueva tarjeta a la API
  addCard(data) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.cardTitle,
        link: data.cardImage,
      }),
    }).then(this._checkResponse);
  }

  // Eliminar una tarjeta de la API
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Dar like a una tarjeta en la API
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Quitar like a una tarjeta en la API
  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Actualizar la foto de perfil del usuario en la API
  updateAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then(this._checkResponse);
  }
  // Cambiar el estado de like de una tarjeta (dar like o quitar like)
  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.likeCard(cardId) : this.unlikeCard(cardId); // Si isLiked es true, llama a likeCard, de lo contrario llama a unlikeCard
  }
}

// Crear una instancia de la clase Api con la URL base y las cabeceras necesarias
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "d2f948a1-8287-4cb2-abd9-f6054e402bb4",
    "Content-Type": "application/json",
  },
});

export default api;
