import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Comics from "./pages/Comics";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import CharacterPage from "./pages/CharacterPages";
import SignupLogin from "./components/SignupLogin";
import Cookies from "js-cookie";
import Favorites from "./pages/Favorites";
import Footer from "./components/Footer";

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
      setIsConnected(token);
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
        <Route
          path="/comics"
          element={
            <Comics
              isConnected={isConnected}
              setVisible={setVisible}
              visible={visible}
            />
          }
        />
        <Route
          path="/characters"
          element={
            <Characters
              isConnected={isConnected}
              setVisible={setVisible}
              visible={visible}
            />
          }
        />
        <Route
          path="/character/:id"
          element={
            <CharacterPage
              isConnected={isConnected}
              setVisible={setVisible}
              visible={visible}
            />
          }
        />
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
      <Footer />
    </Router>
  );
}

export default App;
