/*
context
저장 냉장고 만들기 createContext
*/

// 기존 풀이
// import { createContext } from "react";
// const ModalStore = createContext();

// export default ModalStore;

// 리팩토링
import { createContext, useContext, useState } from "react";
export const ModalStore = createContext();
export const useModalStore = () => useContext(ModalStore);

const ModalStoreProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prevModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // useState의 상태와, prevModal 함수를 value 값으로 전달한다.

  return (
    <ModalStore.Provider value={{ isModalOpen, prevModal }}>
      {children}
    </ModalStore.Provider>
  );
};

export default ModalStoreProvider;
