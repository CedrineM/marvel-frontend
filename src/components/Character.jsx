import { Link } from "react-router-dom";

const Character = ({ character }) => {
  return (
    <Link to={`/character/${character._id}`}>
      <div className="comic-object">
        <div>
          <div className="comic-object-img">
            <img
              src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
              alt={`image du personnage ${character.name}`}
            />
          </div>
          <div className="comic-object-text">
            <h2>{character.name}</h2>
            {character.description && (
              <p>{character.description.slice(0, 110) + "..."}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Character;
