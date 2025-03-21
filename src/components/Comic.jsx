const Comic = ({ comic }) => {
  return (
    <div className="comic-object">
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
