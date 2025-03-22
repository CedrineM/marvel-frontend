import axios from "axios";
import { useState, useEffect } from "react";
import Character from "../components/Character";
import Pagination from "../components/Pagination";

const Characters = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ name: "", limit: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
    setPages(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://site--backend-marvel--vphy6y45v8nk.code.run/characters?page=${currentPage}`;
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
  }, [filters, currentPage]);

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
              return <Character character={character} key={character._id} />;
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
