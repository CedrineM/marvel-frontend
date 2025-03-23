import axios from "axios";
import { useParams } from "react-router-dom";
import Comic from "../components/Comic";
import { useState, useEffect } from "react";
import "./CharacterPages.css";

const CharacterPage = ({ isConnected, setVisible, visible }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteResponse = await axios.get(
          "https://site--backend-marvel--vphy6y45v8nk.code.run/favorites",
          { headers: { Authorization: `Bearer ${isConnected}` } }
        );
        const tabFavorites = favoriteResponse.data.map((fav) => {
          return fav.item._id;
        });
        setFavorites(tabFavorites);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchFavorites();
    const fetchData = async () => {
      try {
        // récupération des comics liés au personnage
        const response = await axios.get(
          `https://site--backend-marvel--vphy6y45v8nk.code.run/comics/${id}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(response.error);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <main>
      <div>En chargement...</div>
    </main>
  ) : (
    <main className="character-page">
      <div className="container">
        <section>
          <div className="character-page-img">
            <img
              src={`${data.thumbnail.path}/standard_fantastic.${data.thumbnail.extension}`}
              alt=""
            />
          </div>
          <div className="character-page-description">
            <h1>{data.name}</h1>
            <p>{data.description}</p>
          </div>
        </section>
      </div>
      <section>
        <div className="container">
          <h2>Comics associer</h2>
          <div>
            {data.comics.map((comic) => {
              return (
                <Comic
                  comic={comic}
                  key={comic._id}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  isConnected={isConnected}
                  setVisible={setVisible}
                  visible={visible}
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CharacterPage;
