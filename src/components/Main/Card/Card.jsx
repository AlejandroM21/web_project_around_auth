import ImagePopup from "../form/ImagePopup/ImagePopup";
import RemoveCard from "../form/RemoveCard/RemoveCard";

export default function Card({
  card,
  onCardDelete,
  onCardLike,
  handleOpenPopup,
  handleClosePopup,
}) {
  // Desestructuro las propiedades de la tarjeta
  const { name, link, isLiked } = card;

  // Abrir el popup de Image y Trash
  const imageComponent = {
    title: "",
    children: <ImagePopup card={card} />,
  };

  // Maneja el clic en el botón de eliminar tarjeta
  const handleCardDelete = () => {
    onCardDelete(card);
  };
  // Configuración del popup de confirmación de eliminación
  const confirmatiotrash = {
    title: "¿Estás seguro/a?",
    children: (
      <RemoveCard
        onCardDelete={handleCardDelete}
        card={card}
        onClose={handleClosePopup}
      />
    ),
  };

  // Clase condicional para el botón de like dar style activo si isLiked es true
  const cardLikeButtonClassName = `elements__card-favorite ${
    isLiked ? "elements__card-favorite_active" : "" // Si isLiked es true, añade la clase "_active"
  }`;

  // Maneja el clic en el botón de like
  function handleLikeClick() {
    onCardLike(card); // Llama a la función onCardLike pasada como prop con la tarjeta actual
  }

  return (
    <article className="elements__card">
      {/* Botón para eliminar */}
      <button
        className="elements__trash"
        aria-label="Eliminar tarjeta"
        onClick={() => handleOpenPopup(confirmatiotrash)}
      ></button>

      {/* Imagen de la tarjeta */}
      <img
        className="elements__card-image"
        src={link}
        alt={`fotografia de ${name}`}
        onClick={() => handleOpenPopup(imageComponent)}
      />

      {/* Información de la tarjeta */}
      <div className="elements__card-info">
        <h3 className="elements__card-title block">{name}</h3>

        {/* Botón para Like */}
        <button
          className={cardLikeButtonClassName}
          aria-label="Like card"
          type="button"
          onClick={handleLikeClick} // Llama a handleLikeClick cuando se hace clic en el botón
        ></button>
      </div>
    </article>
  );
}
