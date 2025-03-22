import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logoMarvelBlack.png";
import ButtonNavigate from "./ButtonNavigate";
import { useState } from "react";

const Header = ({ isConnected, visible, setVisible, setConnect }) => {
  if (visible.signup || visible.login) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "inherit";
  }
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const handleModalOnclick = (action) => {
    if (action === "toggleSignupLogin") {
      if (!visible.login && !visible.signup) {
        const copy = { ...visible };
        copy.signup = !copy.signup;
        setVisible(copy);
      } else if (
        (!visible.login && visible.signup) ||
        (visible.login && !visible.signup)
      ) {
        const copy = { ...visible };
        copy.signup = !copy.signup;
        copy.login = !copy.login;
        setVisible(copy);
      }
    } else if (action === "favorites") {
      const copy = { ...visible };
      copy.from = "/favorites";
      copy.login = !copy.login;
      setVisible(copy);
    }
  };

  return (
    <header>
      <div className="container">
        <div>
          <ButtonNavigate to={"/comics"}>Comics</ButtonNavigate>{" "}
          <span> | </span>
          <ButtonNavigate to={"/characters"}>Personnages</ButtonNavigate>
        </div>
        <div className="logo">
          <div>
            <Link to={"/"}>
              <img src={logo} alt="Logo Marvel" />
            </Link>
          </div>
        </div>
        <div>
          {isConnected ? (
            <ButtonNavigate to={"/favorites"}>Favoris</ButtonNavigate>
          ) : (
            <button
              onClick={() => {
                handleModalOnclick("favorites");
              }}
            >
              Favoris
            </button>
          )}
          <span> | </span>
          {isConnected ? (
            <button
              className="disconnect-button"
              onClick={() => {
                setConnect(null);
                navigate("/");
              }}
            >
              Déconnexion
            </button>
          ) : (
            <button
              onClick={() => {
                handleModalOnclick("toggleSignupLogin");
              }}
            >
              Se connecter/S'inscrire
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
