import { useRef, useState } from "react";

export default function NewCard({ closePopup, onAddPlaceSubmit }) {
  const titleRef = useRef();
  const linkRef = useRef();

  // Estado para manejar la carga del formulario, la validez y los errores
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState({ title: "", link: "" }); // Estado para manejar los mensajes de error

  // Maneja los cambios en los campos del formulario
  function handleChange() {
    // Verifica la validez de los campos y actualiza el estado de error y validez del formulario
    const titleInput = titleRef.current;
    const linkInput = linkRef.current;
    setError({
      title: titleInput.validationMessage,
      link: linkInput.validationMessage,
    });
    setIsFormValid(titleInput.validity.valid && linkInput.validity.valid);
  }

  // Maneja el envío del formulario
  function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);
    // Llama a la función onAddPlaceSubmit pasada como prop con los datos del formulario
    onAddPlaceSubmit({
      cardTitle: titleRef.current.value,
      cardImage: linkRef.current.value,
    });
    // Limpia los campos del formulario después de enviar
    titleRef.current.value = "";
    linkRef.current.value = "";
    closePopup(); // Cierra el popup después de enviar el formulario
    setIsLoading(false);
  }

  // Renderiza el formulario para agregar una nueva tarjeta
  return (
    <form
      className="popup__form popup__form_add"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label htmlFor="card-name">
        <input
          type="text"
          className={`popup__input popup__input_type_place-name ${
            error.title ? "popup__input_type_error" : ""
          }`}
          id="card-name" /*"place-name"*/
          name="card-name"
          placeholder="Titulo"
          minLength="2"
          maxLength="30"
          required
          ref={titleRef}
          onChange={handleChange}
          disabled={isLoading}
        />
        <span
          className={`popup__error card-name-error ${
            error.title ? "popup__error_visible" : ""
          }`}
        >
          {error.title}
        </span>
      </label>
      <label htmlFor="card-link">
        <input
          type="url"
          className={`popup__input popup__input_type_place-link ${
            error.link ? "popup__input_type_error" : ""
          }`}
          id="card-link" /* place-link*/
          name="card-link"
          placeholder="Enlace a la imagen"
          required
          ref={linkRef}
          onChange={handleChange}
          disabled={isLoading}
        />
        <span
          className={`popup__error card-link-error ${
            error.link ? "popup__error_visible" : ""
          }`}
        >
          {error.link}
        </span>
      </label>
      // ...existing code...
      <button
        type="submit"
        className={`popup__button popup__button_add ${
          !isFormValid || isLoading ? "popup__button_disabled" : ""
        }`}
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? "Guardando..." : "Crear"}
      </button>
    </form>
  );
}
