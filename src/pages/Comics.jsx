import axios from "axios";
import { useState, useEffect } from "react";
import Comic from "../components/Comic";

const Comics = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ title: "", limit: "" });
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
        let url = `https://site--backend-marvel--vphy6y45v8nk.code.run/comics?page=${pages}`;
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
        console.log(response.error);
      }
    };
    fetchData();
  }, [filters, pages]);

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
              return <Comic comic={comic} key={comic._id} />;
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

export default Comics;
