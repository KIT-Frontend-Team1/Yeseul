import { useState } from "react";
import PokemonCard from "./PokemonCard";
import axios from "axios";

const mainUrl = "https://pokeapi.co/api/v2/pokemon/";

const PokemonList = () => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  const handleClick = () => {
    axios
      .get(mainUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setErr(`Something Wrong: ${err}`);
      });
  };

  if (err) {
    return <p>{err}</p>;
  }

  return (
    <div>
      <button onClick={handleClick}>포켓몬 정보 조회하기</button>
      {data && (
        <div>
          {data.results.map((pokemon) => (
            <PokemonCard
              key={`${pokemon.name}-${pokemon.url}`}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
