import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicial from "./pages/inicial/Inicial.jsx";
import Main from "./pages/main/Main.jsx";
import Login from "./pages/login/login.jsx";
import CadastroUser from "./pages/cadastroUser/cadastroUser.jsx";
import FormContainer from "./pages/anunciarPet/formContainer.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicial />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastroUser" element={<CadastroUser />} />
        <Route path="/anunciarPet" element={<FormContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
