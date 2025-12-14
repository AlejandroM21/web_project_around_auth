import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import Login from "./Main/Login/Login";
import InfoTooltip from "./Main/InfoTooltip/InfoTooltip";
import Register from "./Main/Register/Register";
import ProtectedRoute from "./Main/ProtectedRoute/ProtectedRoute";
import { setToken, getToken, removeToken } from "../utils/token";
import * as auth from "../utils/auth";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import logo_avatar from "../../public/logo_avatar.jpg";

function App() {
  // ==== GESTIÓN DE AUTENTICACIÓN Y RUTAS PROTEGIDAS ==== //

  //Estados para manejar el InfoTooltip
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState(""); // mensaje dinámico
  const [tooltipSuccess, setTooltipSuccess] = useState(false); // para icono

  // Estado para manejar si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Estado para almacenar datos del usuario después del login o registro
  const [userData, setUserData] = useState({ email: "" });

  // hook de navegación para redirigir después del registro
  const navigate = useNavigate();

  // hook de localización para obtener la ruta actual
  const location = useLocation();

  // -------------------- MANEJO DE REGISTRO --------------------

  // Maneja el registro de un nuevo usuario
  const handleRegistration = ({ email, password }) => {
    // Si el correo electrónico o la contraseña están vacíos, no se envía la solicitud.
    if (!email || !password) {
      return;
    }
    auth;
    auth
      .register(email, password)
      .then(() => {
        setTooltipSuccess(true); // icono de éxito
        setTooltipMessage("¡Correcto! Ya estás registrado."); // mensaje
        setIsTooltipOpen(true); // abrir modal
        navigate("/signin");
      })
      .catch(() => {
        setTooltipSuccess(false);
        setTooltipMessage("Usuario ya Registrado.");
        setIsTooltipOpen(true);
      });
  };

  // -------------------- MANEJO DE LOGIN --------------------

  // Maneja el inicio de sesión de un usuario existente
  const handleLogin = ({ email, password }) => {
    // Si el email de usuario o la contraseña están vacíos, no se envía la solicitud.
    if (!email || !password) {
      return;
    }

    // Llama a la función authorize del módulo auth con el nombre de usuario y la contraseña
    return auth
      .authorize(email, password) // Pasamos 'email' como el 'identifier'
      .then((data) => {
        // Si la respuesta contiene un token, el inicio de sesión fue exitoso

        if (data.token) {
          setToken(data.token); // Guarda el token en el almacenamiento local
          setIsLoggedIn(true); // Actualiza el estado para reflejar que el usuario está logueado
          setUserData({ email }); // Almacena los datos del usuario en el estado
          const redirectPath = location.state?.from?.pathname || "/"; // obtiene la ruta original o usa "/" como predeterminado
          navigate(redirectPath); // redirige al usuario a la ruta original o a "/" despues del inicio de sesion
          console.log("Inicio de sesión exitoso", data);
        }
        return data;
      })
      .catch(() => {
        setTooltipSuccess(false);
        setTooltipMessage("Uy, algo salió mal. Por favor, inténtalo de nuevo.");
        setIsTooltipOpen(true);
      });
  };

  // -------------------- MANEJO DE LOGOUT --------------------
  const handleSignOut = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/signin");
  };

  // -------------------- MANTENER SESION AL REFRESCAR LA PAGINA --------------------

  // Si existe, mantiene al usuario logueado al refrescar la pagina
  useEffect(() => {
    const jwt = getToken(); // obtiene el token JWT del almacenamiento local

    // Si no hay token, salir de la función
    if (!jwt) {
      return;
    }

    // Si hay un token, llama a la función checkToken del modulo, para verificar su validez
    auth

      .checkToken(jwt) // envía una solicitud GET a /users/me con el token en el encabezado de autorización
      .then(({ data }) => {
        // si la respuesta es exitosa, inicia la sesión del usuario, guarda sus
        // datos en el estado y lo dirige a /.
        setUserData({ email: data.email }); // Asume que la respuesta tiene una propiedad 'email'
        setIsLoggedIn(true); // actualiza el estado para indicar que el usuario ha iniciado sesión
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ==== GESTIÓN DE TARJETAS (CARDS) ==== //

  // Estado para manejar las tarjetas
  const [cards, setCards] = useState([]);

  // useEffect para cargar las tarjetas iniciales cuando el componente se monta
  useEffect(() => {
    // Llama a la función getInitialCards del archivo api.js y usa el objeto
    api
      .getInitialCards()
      .then((data) => {
        // Actualiza el estado de las tarjetas con los datos obtenidos
        setCards(data);
      })
      .catch((err) => {
        console.log("Error al obtener las tarjetas:", err);
      });
  }, []); // El array vacío significa que esto se ejecuta solo una vez al montar el componente

  // Actualiza el estado de las tarjetas cuando se da like o dislike a una tarjeta
  // (pasa la tarjeta actual como argumento)
  function handleCardLike(card) {
    const isLiked = card.isLiked; // Verifica si la tarjeta ya está marcada como "me gusta"

    // Llama a la función changeLikeCardStatus del archivo api.js con el ID de la tarjeta y el nuevo estado de like
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          //
          state.map(
            (currentCard) =>
              currentCard._id === card._id ? newCard : currentCard // Actualiza la tarjeta en el estado si los IDs coinciden, de lo contrario la deja igual
          )
        );
      })
      .catch((error) => console.error(error));
  }

  // Elimina una tarjeta (pasa la tarjeta actual como argumento)
  function handleCardDelete(card) {
    // Llama a la función deleteCard del archivo api.js con el ID de la tarjeta a eliminar
    const cardId = card._id; // Extrae el ID de la tarjeta
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(
          // currentCard es cada tarjeta en el estado actual. Filtra todas las tarjetas excepto la que tiene el ID igual a cardId
          // (la tarjeta eliminada) y actualiza el estado con el nuevo array de tarjetas
          (state) => state.filter((currentCard) => currentCard._id !== cardId)
        );
      })
      .catch((error) => console.error(error));
  }

  //function para agregar una nueva tarjeta
  function handleAddPlaceSubmit(newCardData) {
    api
      .addCard(newCardData) // Llama a la función addCard del archivo api.js con los datos de la nueva tarjeta
      .then((newCard) => {
        setCards([newCard, ...cards]); // Agrega la nueva tarjeta al inicio del array de tarjetas en el estado
      })
      .catch((err) => {
        console.log("Error al agregar una nueva tarjeta:", err);
      });
  }

  // ==== ACTUALIZAR PERFIL Y AVATAR ==== //

  // Estado para manejar la información del usuario
  const [currentUser, setCurrentUser] = useState({
    name: "Cargando...",
    about: "Cargando...",
    avatar: logo_avatar,
  });

  // Actualiza la información del usuario cuando se edita el perfil
  function handleUpdateUser(data) {
    // Retorna la promesa para que el componente que llama pueda manejar el estado de carga y los errores
    return api
      .updateUserInfo(data) //
      .then((updatedUser) => {
        setCurrentUser(updatedUser); // Actualiza el estado currentUser con la nueva información del usuario
      })
      .catch((err) => {
        console.log("Error al actualizar la información del usuario:", err);
      });
  }

  // Actualiza la foto de perfil del usuario cuando se cambia el avatar
  function handleUpdateAvatar(avatarUrl) {
    // Retorna la promesa para que el componente que llama pueda manejar el estado de carga y los errores
    return api
      .updateAvatar(avatarUrl) //
      .then((updatedUser) => {
        setCurrentUser(updatedUser); // Actualiza el estado currentUser con la nueva información del usuario
      })
      .catch((err) => {
        console.log("Error al actualizar la foto de perfil del usuario:", err);
      });
  }

  // useEffect para cargar la información del usuario cuando el componente se monta
  useEffect(() => {
    api
      .getUserInfo() //  Llama a la función getUserInfo del archivo api.js y usa el objeto
      .then((userData) => {
        setCurrentUser(userData);
      });
  }, []);

  // Proporciona el contexto CurrentUserContext a los componentes hijos (Header, Main, Footer)
  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        // handleClosePopup,
        // handleOpenPopup,
      }}
    >
      <div className="page__content">
        <Header
          isLoggedIn={isLoggedIn}
          userEmail={userData.email}
          onSignOut={handleSignOut}
          currentPath={location.pathname}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onCardLike={handleCardLike}
                  cards={cards}
                  onCardDelete={handleCardDelete}
                  onAddPlaceSubmit={handleAddPlaceSubmit}
                />
                <Footer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signin"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                <div className="loginContainer">
                  <Login handleLogin={handleLogin} />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                <div className="registerContainer">
                  <Register handleRegistration={handleRegistration} />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/" : "/signin"} replace />}
          />
        </Routes>
        <InfoTooltip
          isOpen={isTooltipOpen}
          isSuccess={tooltipSuccess}
          message={tooltipMessage}
          onClose={() => setIsTooltipOpen(false)}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
