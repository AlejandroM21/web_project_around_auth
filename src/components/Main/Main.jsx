import { useState, useContext } from "react";

import NewCard from "./form/NewCard/NewCard";
import EditProfile from "./form/EditProfile/EditProfile";
import EditAvatar from "./form/EditAvatar/EditAvatar";
import Popup from "./Popup/Popup";
import Card from "./Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main({
  cards,
  onCardDelete,
  onCardLike,
  onAddPlaceSubmit,
}) {
  // Estado para manejar qué popup se muestra. null significa que no hay ningún popup abierto
  const [popup, setPopup] = useState(null);

  const { currentUser } = useContext(CurrentUserContext);

  // Abrir el popup de addCard, Perfile, Avatar
  const newCardPopup = {
    title: "Nuevo Lugar",

    children: (
      <NewCard
        closePopup={handleClosePopup}
        onAddPlaceSubmit={onAddPlaceSubmit} // Aquí pasamos la función onAddPlaceSubmit como prop al componente NewCard
      />
    ),
  };

  const editProfilePopup = {
    title: "Editar Perfil",
    children: <EditProfile closePopup={handleClosePopup} />,
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar closePopup={handleClosePopup} />,
  };

  // Esto cierra cualquier popup que esté abierto
  function handleClosePopup() {
    setPopup(null);
  }

  // El popup que se abre depende del argumento que se le pase a esta función
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  return (
    <main className="main">
      {/* <!-- ===== Sección Perfil ===== --> */}

      {/* Avatar */}
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={currentUser.avatar}
            alt="Avatar Por Defecto"
            className="profile__avatar-image"
          />
          {/* Botón para actualizar avatar */}
          <button
            className="profile__button-update-avatar"
            aria-label="Editar Avatar"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          ></button>
        </div>

        {/* INFO PERFIL */}
        <div className="profile__info">
          <div className="profile__info-name">
            <h2 className="profile__name">{currentUser.name}</h2>

            {/* Botón para editar perfil */}
            <button
              className="profile__button-edit"
              aria-label="Editar perfil"
              onClick={() => handleOpenPopup(editProfilePopup)}
            ></button>
          </div>
          <p className="profile__about-me block">{currentUser.about}</p>
        </div>

        {/* <!-- ===== Sección de Tarjetas ===== --> */}

        {/* NUEVA TARJETA */}
        <button
          className="profile__button-add"
          aria-label="Agregar nuevo elemento"
          title="Agregar nuevo"
          onClick={() => handleOpenPopup(newCardPopup)}
        ></button>
      </section>

      <ul className="elements">
        {cards.map((card) => (
          // Renderiza el componente Card para cada tarjeta en el estado cards
          <Card
            key={card._id} // La key ayuda a React a identificar qué ítems han cambiado, son añadidos o eliminados
            card={card} // Aqui traemos esos props del componente Cards card={{ name: "Valle de Yosemite", link: "/images/yosemite.jpg", isLiked: false,}}
            onCardLike={onCardLike} // Pasa la función onCardLike como prop onCardLike al componente Card
            onCardDelete={onCardDelete} // Pasa la función onCardDelete como prop onCardDelete al componente Card
            handleOpenPopup={handleOpenPopup} // Pasa la función handleOpenPopup como prop handleOpenPopup al componente Card
            handleClosePopup={handleClosePopup} // Pasa la función handleClosePopup como prop handleClosePopup al componente Card
          />
        ))}
      </ul>

      {/* renderización condicional de Popup */}
      {popup && ( // Si popup no es null, renderiza el componente Popup
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
