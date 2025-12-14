import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../../utils/useFormWithValidation";
import "../../../../blocks/login.css";

// Componente de inicio de sesión de usuario
const Login = ({ handleLogin }) => {
  // Usamos el hook de validación
  const { values, handleChange, errors, isFormValid, resetForm } =
    useFormWithValidation();

  //Evita el comportamiento del navegador por defecto y llama
  // al controlador de inicio de sesión.
  const handleSubmit = (e) => {
    e.preventDefault();

    // Llamamos a la función de login pasada desde App.jsx
    handleLogin(values)
      .then(() => {
        // Login exitoso: cerramos formulario
        resetForm();
      })
      .catch(() => {
        resetForm();
      });
  };
  return (
    <div className="login">
      <p className="login__welcome">Inicia sesión</p>

      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="email"> </label>
        <input
          className="login__input"
          type="email"
          id="email"
          name="email"
          placeholder="Correo electrónico"
          required
          value={values.email || ""}
          onChange={handleChange}
        />

        <span className="login__error">{errors.email}</span>

        <label htmlFor="password"></label>
        <input
          className="login__input"
          type="password"
          id="password"
          name="password"
          placeholder="Contraseña"
          required
          minLength={6}
          value={values.password || ""}
          onChange={handleChange}
        />

        <span className="login__error">{errors.password}</span>

        <div className="login__button-container">
          <button
            type="submit"
            className="login__button"
            disabled={!isFormValid}
          >
            Iniciar sesión
          </button>
        </div>
      </form>

      <div className="login__signup">
        <p>¿Aún no eres miembro?</p>
        <Link to="/signup" className="login__login-link">
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
};

export default Login;
