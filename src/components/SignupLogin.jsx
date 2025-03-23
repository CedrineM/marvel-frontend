import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./SignupLogin.css";

const SignupLogin = ({ setConnect, visible, setVisible }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleModalOnClick = (action) => {
    if (action === "close") {
      const copy = { ...visible };
      copy.login = false;
      copy.signup = false;
      copy.from = null;
      setVisible(copy);
    }
    if (action === "toggleSignupLogin") {
      const copy = { ...visible };
      copy.signup = !copy.signup;
      copy.login = !copy.login;
      setErrorMessage("");
      setVisible(copy);
    }
  };

  const handleSubmit = async (type, event) => {
    event.preventDefault(); // Pour empêcher le navigateur de changer de page lors de la soumission du formulaire

    try {
      //Demande de création de compte
      if (type === "signup") {
        const response = await axios.post(
          "https://site--backend-marvel--vphy6y45v8nk.code.run/user/signup",
          formData
        );

        if (response.data.token) {
          console.log("Form data submitted successfully:", response.data);
          setConnect(response.data.token);
          setFormData({
            email: "",
            username: "",
            password: "",
          });
          handleModalOnClick("close");
        }

        //Demande de connexion
      } else if (type === "login") {
        const response = await axios.post(
          "https://site--backend-marvel--vphy6y45v8nk.code.run/user/login",
          formData
        );
        if (response.data.token) {
          // console.log("Form data submitted successfully:", response.data);
          setConnect(response.data.token);
          setFormData({
            email: "",
            password: "",
          });
          if (visible.from) {
            handleModalOnClick("close");
            return navigate(visible.from);
          }
          handleModalOnClick("close");
        }
      }
    } catch (error) {
      //   console.log("Error submitting form data:", error.response);
      if (error.response.status === 409) {
        setErrorMessage("Un compte est déjà associé à cette email");
      } else {
        setErrorMessage("Les informations saisies sont incorrectes");
      }
    }
  };
  return visible.login ? (
    <div
      className="signup-login-modal"
      onClick={() => {
        handleModalOnClick("close");
      }}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          className="close-button"
          onClick={() => {
            handleModalOnClick("close");
          }}
        >
          X
        </button>
        <h1>Se connecter</h1>
        <form
          onSubmit={(event) => {
            handleSubmit("login", event);
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            value={formData.password}
          />
          {errorMessage && <p className="errorForm">{errorMessage}</p>}
          <button className="button-submit">
            <span>Se connecter</span>
          </button>
        </form>
        <p
          className="link-signup-login"
          onClick={() => {
            handleModalOnClick("toggleSignupLogin");
          }}
        >
          Pas encore de compte ? Inscrit-toi !
        </p>
      </div>
    </div>
  ) : (
    <div
      className="signup-login-modal"
      onClick={() => {
        handleModalOnClick("close");
      }}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          className="close-button"
          onClick={() => {
            handleModalOnClick("close");
          }}
        >
          X
        </button>
        <h1>S'inscrire</h1>
        <form
          onSubmit={(event) => {
            handleSubmit("signup", event);
          }}
        >
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            onChange={handleChange}
            value={formData.username}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            value={formData.password}
          />
          {errorMessage && <p className="errorForm">{errorMessage}</p>}

          <button className="button-submit">
            <span>S'inscrire</span>
          </button>
        </form>
        <p
          className="link-signup-login"
          onClick={() => {
            handleModalOnClick("toggleSignupLogin");
          }}
        >
          Tu as déjà un compte ? Connecte-toi !
        </p>
      </div>
    </div>
  );
};

export default SignupLogin;
