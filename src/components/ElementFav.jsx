import { FaHeartBroken } from "react-icons/fa";
import axios from "axios";

const ElementFav = ({ element, isConnected, setFavoriteRemove }) => {
  const handleRemoveFavorite = async () => {
    //ajoute ou suppression à la base de donnée
    try {
      await axios.post(
        `https://site--backend-marvel--vphy6y45v8nk.code.run/favorite`,
        { item: element.item, type: element.type },
        { headers: { Authorization: `Bearer ${isConnected}` } }
      );
      setFavoriteRemove(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="character-object">
      <FaHeartBroken
        className="character-favorite-activated"
        onClick={handleRemoveFavorite}
      />

      <div>
        <div className="character-object-img">
          <img
            src={`${element.item.thumbnail.path}/portrait_uncanny.${element.item.thumbnail.extension}`}
            alt={`image ${element.item.name || element.item.title}`}
          />
        </div>
        <div className="character-object-text">
          <h3>{element.item.name || element.item.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default ElementFav;
