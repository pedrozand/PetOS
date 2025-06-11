import { Navigate } from "react-router-dom";
import { useAuth } from "../../../server/context/AuthContext.jsx";

const RotaPrivada = ({ children }) => {
  const { usuario } = useAuth();

  return usuario ? children : <Navigate to="/login" />;
};

export default RotaPrivada;
