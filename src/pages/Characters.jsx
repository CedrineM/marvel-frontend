import axios from "axios";
import { useState, useEffect } from "react";
import Character from "../components/Character";
import Pagination from "../components/Pagination";
import "./Characters.css";

const Characters = ({ isConnected, setVisible, visible }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ name: "", limit: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteResponse = await axios.get(
          `https://site--backend-marvel--vphy6y45v8nk.code.run//favorites`,
          {
            headers: { Authorization: `Bearer ${isConnected}` },
          }
        );
        const tabFavorites = favoriteResponse.data.map((fav) => {
          return fav.item._id;
        });
        setFavorites(tabFavorites);
      } catch (error) {
        console.log(error.favoriteResponse);
      }
    };

    if (isConnected) {
      fetchFavorites();
    }

    const fetchData = async () => {
      try {
        let url = `${
          import.meta.env.VITE_API_URL
        }/characters?page=${currentPage}`;
        if (filters.name) {
          url += `&name=${filters.name}`;
        }
        if (filters.limit) {
          url += `&limit=${filters.limit}`;
        }

        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(response.error);
      }
    };
    fetchData();
  }, [filters, currentPage, isConnected]);

  return isLoading ? (
    <main className="characters">
      <div className="container">
        <p>
          En chargement .... Spider Man parcours la toile pour trouver ce que
          vous voulez ....
        </p>
      </div>
    </main>
  ) : (
    <main className="characters">
      <div className="container">
        <section>
          <div>
            <span>Personnages</span>{" "}
            <span>| {data.count} Personnages trouvés </span>
          </div>
          <div>
            <input
              type="text"
              id="search"
              name="name"
              value={filters.name}
              placeholder="Recherche par nom ..."
              onChange={handleChange}
            />

            <input
              type="number"
              id="limit"
              name="limit"
              value={filters.limit}
              placeholder="personnages / page"
              onChange={handleChange}
            />
          </div>
        </section>
        <section>
          <div>
            {data.results.map((character) => {
              return (
                <Character
                  character={character}
                  key={character._id}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  isConnected={isConnected}
                  setVisible={setVisible}
                  visible={visible}
                />
              );
            })}
          </div>
        </section>
        <section>
          <Pagination
            currentPage={currentPage}
            total={data.count}
            limit={data.limit}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </section>
      </div>
    </main>
  );
};

export default Characters;
