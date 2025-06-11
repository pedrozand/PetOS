import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("usuario");
    if (userStorage) {
      setUsuario(JSON.parse(userStorage));
    }
  }, []);

  const login = (dadosUsuario) => {
    localStorage.setItem("usuario", JSON.stringify(dadosUsuario));
    setUsuario(dadosUsuario);
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
