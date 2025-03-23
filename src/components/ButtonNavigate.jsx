import { useLocation, useNavigate } from "react-router-dom";
import "./ButtonNavigation.css";

const ButtonNavigate = ({ to, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="div-button-nav">
      <button
        class="button-nav"
        onClick={() => {
          navigate(to);
        }}
      >
        <span> {children}</span>
      </button>
      <div className={to === pathname ? "button-active-nav" : "hidden"}></div>
    </div>
  );
};

export default ButtonNavigate;
