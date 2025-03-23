import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import ElementFav from "../components/ElementFav";

const Favorites = ({ isConnected }) => {
  const [favoriteData, setFavoriteData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteRemove, setFavoriteRemove] = useState(false);

  useEffect(() => {
    if (isConnected) {
      const fetchFavorites = async () => {
        try {
          const favoriteResponse = await axios.get(
            "https://site--backend-marvel--vphy6y45v8nk.code.run/favorites",
            { headers: { Authorization: `Bearer ${isConnected}` } }
          );
          setFavoriteData(favoriteResponse.data);
          setIsLoading(false);
          setFavoriteRemove(false);
        } catch (error) {
          console.log(error.response);
        }
      };
      fetchFavorites();
    }
  }, [favoriteRemove]);

  return isConnected ? (
    isLoading ? (
      <main className="favorites">
        <div className="container">
          <p>En chargement...</p>
        </div>
      </main>
    ) : (
      <main className="favorites">
        <div className="container">
          <div className="fav-characters">
            <h2>Personnages Favoris</h2>
            {favoriteData.map((element) => {
              if (element.type === "characters") {
                return (
                  <ElementFav
                    key={element._id}
                    element={element}
                    isConnected={isConnected}
                    setFavoriteRemove={setFavoriteRemove}
                  />
                );
              }
            })}
          </div>
          <div className="fav-comics">
            <h2>Comis Favoris</h2>
            {favoriteData.map((element) => {
              if (element.type === "comics") {
                return (
                  <ElementFav
                    key={element._id}
                    element={element}
                    isConnected={isConnected}
                    setFavoriteRemove={setFavoriteRemove}
                  />
                );
              }
            })}
          </div>
        </div>
      </main>
    )
  ) : (
    <Navigate to={"/"} />
  );
};

export default Favorites;
