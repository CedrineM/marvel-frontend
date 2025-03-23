import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";

const Character = ({
  character,
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
      const index = copy.indexOf(character._id);
      if (index !== -1) {
        copy.splice(index, 1);
        setFavorites(copy);
      } else {
        copy.push(character._id);
        setFavorites(copy);
      }

      //ajoute ou suppression à la base de donnée
      try {
        await axios.post(
          `https://site--backend-marvel--vphy6y45v8nk.code.run/favorite`,
          { item: character, type: "characters" },
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

  const navigate = useNavigate();
  return (
    <div className="character-object">
      {!favorites.includes(character._id) ? (
        <FaRegHeart
          className="character-favorite-activated"
          onClick={handleAddRemoveFavorite}
        />
      ) : (
        <FaHeart
          className="character-favorite-disabled"
          onClick={handleAddRemoveFavorite}
        />
      )}

      <div
        onClick={() => {
          navigate(`/character/${character._id}`);
        }}
      >
        <div className="character-object-img">
          <img
            src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
            alt={`image du personnage ${character.name}`}
          />
        </div>
        <div className="character-object-text">
          <h2>{character.name}</h2>
          {character.description && (
            <p>{character.description.slice(0, 110) + "..."}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Character;
