import axios from "axios";
import { useState, useEffect } from "react";
import Comic from "../components/Comic";
import Pagination from "../components/Pagination";
import "./Comics.css";

const Comics = ({ isConnected, setVisible, visible }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ title: "", limit: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const urlBack = import.meta.env.VITE_API_URL;
  console.log(urlBack);
  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/favorites`,
          {
            headers: { Authorization: `Bearer ${isConnected}` },
          }
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
        let url = `${import.meta.env.VITE_API_URL}/comics?page=${currentPage}`;
        if (filters.title) {
          url += `&title=${filters.title}`;
        }
        if (filters.limit) {
          url += `&limit=${filters.limit}`;
        }

        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [filters, currentPage, isConnected]);

  return isLoading ? (
    <main className="comics">
      <div className="container">
        <p>
          En chargement .... Spider Man parcours la toile pour trouver ce que
          vous voulez ....
        </p>
      </div>
    </main>
  ) : (
    <main className="comics">
      <div className="container">
        <section>
          <div>
            <span>Comics</span> <span>| {data.count} comics trouvés </span>
          </div>
          <div>
            <input
              type="text"
              id="search"
              name="title"
              value={filters.title}
              placeholder="Recherche par titre ..."
              onChange={handleChange}
            />

            <input
              type="number"
              id="limit"
              name="limit"
              value={filters.limit}
              placeholder="comics / page"
              onChange={handleChange}
            />
          </div>
        </section>
        <section>
          <div>
            {data.results.map((comic) => {
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

export default Comics;
