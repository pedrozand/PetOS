import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicial from "./pages/inicial/Inicial.jsx"; // Página inicial
import Main from "./pages/main/Main.jsx"; // Outra página do sistema

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicial />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
