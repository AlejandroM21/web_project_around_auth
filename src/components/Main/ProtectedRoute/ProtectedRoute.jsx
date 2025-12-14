import { Navigate, useLocation } from "react-router";

//Componente que protege las rutas que requieren autenticacion
//anonymous es una prop opcional que permite acceder a la ruta sin estar logueado, por defecto es false.
function ProtectedRoute({ isLoggedIn, children, anonymous = false }) {
  // Obtener la ubicación actual para redirigir después del inicio de sesión
  // location es un objeto que representa la ubicación actual
  const location = useLocation();

  // from es la ruta a la que el usuario intentaba acceder antes de ser redirigido al login
  //from seria location.state.from.pathname si existe y si no existe, sera "/"
  const from = location.state?.from || "/";
  // Si la ruta es anónima y el usuario está logueado, redirigir a la ruta original
  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />; //from seria por ejemplo "/ducks" o "/my-profile" , segun de donde vino el usuario
  }
  // Si la ruta no es anónima y el usuario no está logueado, redirigir al /login
  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/signin" state={{ from: location }} />; //state pasa la ruta original para redirigir despues del login
  }

  return children; //si esta logeado, renderiza los componentes hijos de las rutas protegidas
}

export default ProtectedRoute;
