import { Link } from "react-router-dom";
import { useState } from "react";
import logo_header from "../../../public/logo_header.png";

export default function Header({
  isLoggedIn,
  userEmail,
  onSignOut,
  currentPath,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo_header}
        alt="Logo Alrededor de EE.UU."
      />

      {/* Botón hamburguesa */}
      <button
        className={`header__burger ${menuOpen ? "header__burger-open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`header__nav ${menuOpen ? "header__nav-open" : ""}`}>
        {isLoggedIn && (
          <>
            <li className="header-email">
              <span className="header__link">{userEmail}</span>
            </li>
            <li className="header-logout">
              <button
                onClick={onSignOut}
                className="header__link button-logout"
              >
                Cerrar sesión
              </button>
            </li>
          </>
        )}
        {!isLoggedIn && currentPath === "/signin" && (
          <li className="register">
            <Link to="/signup" className="header__link">
              Regístrate
            </Link>
          </li>
        )}

        {!isLoggedIn && currentPath === "/signup" && (
          <li className="login">
            <Link to="/signin" className="header__link">
              Iniciar sesión
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}
