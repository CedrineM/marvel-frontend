import { Navigate } from "react-router-dom";
const Favorites = ({ isConnected }) => {
  return isConnected ? <div>Favorites</div> : <Navigate to={"/"} />;
};

export default Favorites;
