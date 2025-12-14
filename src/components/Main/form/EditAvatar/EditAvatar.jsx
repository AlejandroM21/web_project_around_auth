import { useRef, useContext, useState } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditAvatar({ closePopup, onUpdateAvatar }) {
  // Uso el contexto para obtener la información del usuario actual
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();

  // Estados para manejar la validación del formulario
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Maneja el envío del formulario
  function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid) return;
    const input = avatarRef.current; // Referencia al input para obtener su valor
    setIsLoading(true);
    handleUpdateAvatar(input.value)
      .then(() => {
        closePopup();
      })
      .catch(() => {
        setError("Error al actualizar el avatar.");
      })
      .finally(() => setIsLoading(false));
  }

  function handleChange(e) {
    const input = avatarRef.current;
    setError(input.validationMessage);
    setIsFormValid(input.validity.valid);
  }

  return (
    <form
      className="popup__form popup__form_avatar"
      noValidate
      onSubmit={handleSubmit}
    >
      <label htmlFor="avatar">
        <input
          type="url"
          className="popup__input popup__input_type_avatar-link"
          id="avatar"
          name="avatar"
          placeholder="Enlace foto de perfil"
          required
          ref={avatarRef} // Referencia al input para obtener su valor
          onChange={handleChange}
        />
        <span
          className={`popup__error avatar-error ${
            error ? "popup__error_visible" : ""
          }`}
        >
          {error}
        </span>
      </label>
      {/* Botón de guardar */}
      <button
        type="submit"
        className={`popup__button  ${
          !isFormValid ? "popup__button_disabled" : ""
        }`}
        disabled={!isFormValid}
      >
        {isLoading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
