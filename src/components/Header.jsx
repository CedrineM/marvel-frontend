import { Link } from "react-router-dom";
import logo from "../assets/logoMarvelBlack.png";
import ButtonNavigate from "./ButtonNavigate";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div>
          <ButtonNavigate to={"/comics"}>Comics</ButtonNavigate> |{" "}
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
          <button>Favoris</button> |{" "}
          <button>Connexion/S'inscrire/Déconnexion</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
