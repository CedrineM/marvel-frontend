import axios from "axios";
import { useParams } from "react-router-dom";
import Character from "../components/Character";
import Comic from "../components/Comic";
import { useState, useEffect } from "react";

const CharacterPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(data);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
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
    <main>
      <div>Character - id {id}</div>
      <Character character={data} />
      <div>
        {data.comics.map((comic) => {
          return <Comic comic={comic} key={comic._id} />;
        })}
      </div>
    </main>
  );
};

export default CharacterPage;
