import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Comics from "./pages/Comics";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import CharacterPage from "./pages/Character";
import SignupLogin from "./components/SignupLogin";
import Cookies from "js-cookie";
import Favorites from "./pages/Favorites";

// https://site--backend-marvel--vphy6y45v8nk.code.run/
function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [visible, setVisible] = useState({
    signup: false,
    login: false,
    from: null,
  });

  const setConnect = (token) => {
    if (token) {
      Cookies.set("token", token);
      setIsConnected(true);
    } else {
      Cookies.remove("token");
      setIsConnected(false);
    }
  };

  return (
    <Router>
      <Header
        isConnected={isConnected}
        setIsConnected={setIsConnected}
        visible={visible}
        setVisible={setVisible}
        setConnect={setConnect}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterPage />} />
        <Route
          path="/favorites"
          element={<Favorites isConnected={isConnected} />}
        />
      </Routes>
      {(visible.login || visible.signup) && (
        <SignupLogin
          setConnect={setConnect}
          visible={visible}
          setVisible={setVisible}
        />
      )}
    </Router>
  );
}

export default App;
