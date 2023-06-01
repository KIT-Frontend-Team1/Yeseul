import { useEffect, useState } from "react";
import axios from "axios";

const PokemonCard = ({ name, url }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setPhotoUrl(res.data.sprites.front_default);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div>
      <img src={photoUrl} alt={`${name}-front-default`} />
      <h3>{name}</h3>
    </div>
  );
};

export default PokemonCard;
