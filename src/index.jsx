import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "../server/context/AuthContext.jsx";
import App from "./App"; // Aqui importamos o App corretamente

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AuthProvider>
);
