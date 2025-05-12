import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicial from "./pages/inicial/Inicial.jsx"; // Página inicial
import Main from "./pages/main/Main.jsx"; // Outra página do sistema
import Login from "./pages/login/login.jsx"; // Página de Login
import CadastroUser from "./pages/cadastroUser/cadastroUser.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicial />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastroUser" element={<CadastroUser />} />
      </Routes>
    </Router>
  );
}

export default App;
