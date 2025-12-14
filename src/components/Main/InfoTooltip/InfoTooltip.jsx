import Popup from "../Popup/Popup"; // // Importa el componente Popup que sirve como modal genérico reutilizable

// Importa los íconos que se mostrarán según éxito o error
import successIcon from "../../../images/success-icon.png";
import errorIcon from "../../../images/error-icon.png";

// modal específico para mostrar mensajes de registro/login
export default function InfoTooltip({ isOpen, isSuccess, message, onClose }) {
  // Si el modal no está abierto, no renderiza nada (retorna null)
  if (!isOpen) return null;

  // Renderiza el Popup pasando title vacío (porque no usamos título aquí)
  // y onClose para cerrar el modal cuando se haga clic en el botón de cierre

  return (
    <Popup isOpen={isOpen} title="" onClose={onClose}>
      <div className="infotooltip__content">
        <img
          src={isSuccess ? successIcon : errorIcon} // selecciona el icono según isSuccess
          alt={isSuccess ? "Éxito" : "Error"}
          className="infotooltip__icon"
        />
        <h2 className="infotooltip__message">{message}</h2>
      </div>
    </Popup>
  );
}
