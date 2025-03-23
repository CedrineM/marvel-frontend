import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const Comic = ({
  comic,
  favorites,
  setFavorites,
  setVisible,
  isConnected,
  visible,
}) => {
  //add-remove favorite
  const handleAddRemoveFavorite = async () => {
    if (isConnected) {
      const copy = [...favorites];
      const index = copy.indexOf(comic._id);
      if (index !== -1) {
        copy.splice(index, 1);
        setFavorites(copy);
      } else {
        copy.push(comic._id);
        setFavorites(copy);
      }

      //ajoute ou suppression à la base de donnée
      try {
        await axios.post(
          `https://site--backend-marvel--vphy6y45v8nk.code.run/favorite`,
          { item: comic, type: "comics" },
          { headers: { Authorization: `Bearer ${isConnected}` } }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      const copy = { ...visible };
      copy.login = !copy.login;
      setVisible(copy);
    }
  };
  return (
    <div className="comic-object">
      {!favorites.includes(comic._id) ? (
        <FaRegHeart
          className="comic-favorite-activated"
          onClick={handleAddRemoveFavorite}
        />
      ) : (
        <FaHeart
          className="comic-favorite-disabled"
          onClick={handleAddRemoveFavorite}
        />
      )}

      <div>
        <div className="comic-object-img">
          <img
            src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
            alt={`image de couverture du comic ${comic.title}`}
          />
        </div>
        <div className="comic-object-text">
          <h2>{comic.title}</h2>
          {comic.description && (
            <p>{comic.description.slice(0, 110) + "..."}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comic;
