import { useFormWithValidation } from "../../../utils/useFormWithValidation";
import { Link } from "react-router-dom";
import "../../../../blocks/register.css";

// Componente de registro de usuario
// Componente de registro de usuario
const Register = ({ handleRegistration }) => {
  // Usamos el hook de validación
  const { values, handleChange, errors, isFormValid, resetForm } =
    useFormWithValidation();

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Llamamos a la función de registro pasada desde App.jsx
    handleRegistration(values)
      .then(() => {
        // Registro exitoso → mostramos tooltip
        resetForm();
      })
      .catch(() => {});
  };

  // Renderiza el formulario de registro y los enlaces relacionados
  return (
    <div className="register">
      <p className="register__welcome">Regístrate</p>
      <form className="register__form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="email"></label>
        <input
          className="register__input"
          id="email"
          name="email"
          type="email"
          value={values.email || ""}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
        />

        <span className="register__error">{errors.email}</span>

        <label htmlFor="password"></label>
        <input
          className="register__input"
          id="password"
          name="password"
          type="password"
          value={values.password || ""}
          onChange={handleChange}
          placeholder="Contraseña"
          required
          minLength={6}
        />
        <span className="register__error">{errors.password}</span>
        <div className="register__button-container">
          <button
            type="submit"
            className="register__button"
            disabled={!isFormValid}
          >
            Regístrate
          </button>
        </div>
      </form>

      <div className="register__signin">
        <p>¿Ya eres miembro?</p>
        <Link to="signin" className="register__login-link">
          Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
};

export default Register;
