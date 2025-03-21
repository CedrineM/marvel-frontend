import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Comics from "./pages/Comics";
import Home from "./pages/Home";
import Characters from "./pages/Characters";

import CharacterPage from "./pages/Character";

// https://site--backend-marvel--vphy6y45v8nk.code.run/
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
