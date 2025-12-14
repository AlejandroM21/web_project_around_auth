import { useState } from "react";

export default function RemoveCard({ onCardDelete, card, onClose }) {
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    Promise.resolve(onCardDelete(card)) // Asegura que onCardDelete sea tratado como una promesa
      .then(() => {
        onClose(); // Cierra el popup después de eliminar la tarjeta
      })
      .catch((error) => {
        console.error("Error al eliminar la tarjeta:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <form
      className="popup__form popup__form_trash"
      noValidate
      name="trash"
      onSubmit={handleSubmit}
    >
      <button
        type="submit"
        className="popup__button popup__button_add"
        aria-label="Confirmar eliminación"
        disabled={isLoading}
      >
        {isLoading ? "Eliminando..." : "Si"}
      </button>
    </form>
  );
}
