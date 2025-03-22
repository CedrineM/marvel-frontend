import axios from "axios";
import { useState, useEffect } from "react";
import Character from "../components/Character";

const Characters = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ name: "", limit: "" });
  const [pages, setPages] = useState(1);

  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
    setPages(1);
  };

  const buttonPagination = () => {
    const tabPages = [];
    for (let i = 1; i <= Math.ceil(data.count / data.limit); i++) {
      tabPages.push(i);
    }
    return tabPages;
  };

  const pagination = (page) => {
    if (page === "next") {
      setPages(pages + 1);
    } else if (page === "previous") {
      setPages(pages - 1);
    } else {
      setPages(page);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://site--backend-marvel--vphy6y45v8nk.code.run/characters?page=${pages}`;
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
  }, [filters, pages]);

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
          <button
            disabled={pages === 1 && true}
            onClick={() => {
              pagination("previous");
            }}
          >
            Prev
          </button>
          <div>
            {buttonPagination().map((num) => {
              return (
                <button
                  key={num}
                  disabled={pages === num && true}
                  onClick={() => {
                    pagination(num);
                  }}
                >
                  {num}
                </button>
              );
            })}
          </div>
          <button
            disabled={pages === Math.ceil(data.count / 10) && true}
            onClick={() => {
              pagination("next");
            }}
          >
            Next
          </button>
        </section>
      </div>
    </main>
  );
};

export default Characters;
