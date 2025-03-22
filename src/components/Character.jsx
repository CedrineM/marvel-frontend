import { Link } from "react-router-dom";

const Character = ({ character }) => {
  return (
    <Link className="character-object" to={`/character/${character._id}`}>
      <div>
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
    </Link>
  );
};

export default Character;
