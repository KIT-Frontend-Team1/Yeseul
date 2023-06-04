import { useState } from "react";

const usePrevModal = (initialValue) => {
  const [isModal, setIsModal] = useState(initialValue);

  const handlePrevModal = () => {
    setIsModal((prev) => !prev);
  };
  return [isModal, handlePrevModal, setIsModal];
};

export default usePrevModal;
