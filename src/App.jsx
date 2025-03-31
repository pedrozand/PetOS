import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicial from "./pages/inicial/Inicial.jsx";
import Main from "./pages/main/Main.jsx";

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
