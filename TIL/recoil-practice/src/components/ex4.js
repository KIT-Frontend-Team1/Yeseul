import { useState } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const namesState = atom({
  key: "namesState",
  default: ["Ella", "Chris", "Paul"],
});

export default function FormContent() {
  const names = useRecoilValue(namesState);
  const setNamesState = useSetRecoilState(namesState);
  const [name, setName] = useState("");

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => setNamesState((names) => [...names, name])}>
        Add Name
      </button>
      <ul>
        {names.map((name, i) => (
          <li key={i}>{name}</li>
        ))}
      </ul>
    </>
  );
}
