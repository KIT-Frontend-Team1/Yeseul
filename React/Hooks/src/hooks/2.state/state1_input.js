import { useState } from "react";

const State1Input = (initialValue) => {
  const [values, setValues] = useState(initialValue);

  const onChange = (e) => {
    // const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return [values, onChange, setValues];
};

export default State1Input;
