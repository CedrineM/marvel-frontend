import axios from "axios";
import { useState, useEffect } from "react";
import Comic from "../components/Comic";
import Pagination from "../components/Pagination";

const Comics = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ title: "", limit: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://site--backend-marvel--vphy6y45v8nk.code.run/comics?page=${currentPage}`;
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
  }, [filters, currentPage]);

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
