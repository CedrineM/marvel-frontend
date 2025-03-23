import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <p>
        &copy; 2025 MILESI Cédrine. Réalisé au cours de ma formation au
        Reacteur.
      </p>
      <div class="socials">
        <a href="https://github.com/CedrineM" target="_blank">
          <FaGithub />
        </a>
        <span> | </span>
        <a href="https://www.linkedin.com/in/cedrine-milesi/" target="_blank">
          <CiLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
