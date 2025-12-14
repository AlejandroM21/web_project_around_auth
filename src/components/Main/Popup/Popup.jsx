import { useEffect } from "react";
export default function Popup(props) {
  const { title, children, onClose, isOpen } = props;

  // Cerrar con Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc); // limpiar al desmontar
    };
  }, [isOpen, onClose]);

  // Función que detecta clic en el overlay
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("popup")) {
      // si clickeaste el fondo, no el contenido
      onClose();
    }
  };

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        {/* <!-- Botón de cierre --> */}
        <button
          className="popup__button-close"
          aria-label="Cerrar modal"
          type="button"
          onClick={onClose}
        ></button>
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
