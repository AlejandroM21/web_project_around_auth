import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditProfile({ closePopup }) {
  // Uso el contexto para obtener la información del usuario actual
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  // Estados para manejar los valores de los inputs del formulario
  const [values, setValues] = useState({ name: "", job: "" });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect para actualizar los valores del formulario cuando currentUser cambia (o cuando el popup se abre)
  useEffect(() => {
    if (currentUser) {
      // Asegura que currentUser no sea null o undefined
      setValues({
        name: currentUser.name,
        job: currentUser.about,
      });
      setIsFormValid(true); // Asumimos que los datos iniciales son válidos
      setErrors({}); // Limpia los errores al abrir el formulario con datos existentes
    }
  }, [currentUser]); // Se ejecuta cuando currentUser cambia

  // Manejador de cambios genérico para todos los inputs
  const handleChange = (e) => {
    const { name, value, validationMessage } = e.target; // Extrae el nombre, valor y mensaje de validación del input que disparó el evento
    setValues({ ...values, [name]: value }); // Actualiza el estado de valores con el nuevo valor del input
    setErrors({ ...errors, [name]: validationMessage }); // Actualiza el estado de errores con el mensaje de validación del input
    setIsFormValid(e.target.closest("form").checkValidity()); // Actualiza el estado de validez del formulario
  };

  // Maneja el envío del formulario
  function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid) return; // Si el formulario no es válido, no hacer nada
    setIsLoading(true);
    handleUpdateUser({ name: values.name, job: values.job })
      .then(() => {
        closePopup(); // Cierra el popup después de que la actualización sea exitosa
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <label htmlFor="name">
        <input
          type="text"
          className={`popup__input ${
            errors.name ? "popup__input_type_error" : ""
          }`}
          name="name"
          id="name"
          placeholder="Nombre"
          minLength="2"
          maxLength="40"
          required
          onChange={handleChange}
          value={values.name || ""} // El valor del input está controlado por el estado
        />
        <span
          className={`popup__error name-error ${
            errors.name ? "popup__error_visible" : ""
          }`}
        >
          {errors.name}
        </span>
      </label>

      <label htmlFor="about-me">
        <input
          type="text"
          // className="popup__input"
          className={`popup__input ${
            errors.job ? "popup__input_type_error" : ""
          }`}
          name="job"
          id="about-me"
          placeholder="Acerca de mi"
          minLength="2"
          maxLength="200"
          required
          onChange={handleChange}
          value={values.job || ""} // El valor del input está controlado por el estado
        />
        <span
          className={`popup__error about-me-error ${
            errors.job ? "popup__error_visible" : ""
          }`}
        >
          {errors.job}
        </span>
      </label>

      <button
        type="submit"
        className={`popup__button ${
          !isFormValid ? "popup__button_disabled" : ""
        }`}
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
