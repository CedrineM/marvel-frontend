import { useNavigate } from "react-router-dom";

const ButtonNavigate = ({ to, children }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(to);
      }}
    >
      {children}
    </button>
  );
};

export default ButtonNavigate;
