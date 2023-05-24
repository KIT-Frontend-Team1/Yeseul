import { useContext } from "react";
import ModalStore, { useModalStore } from "../../../../../store/2_context";

const ContextQ1Detail2 = () => {
  // 기존 코드
  // const [isModalOpen, setIsModalOpen] = useContext(ModalStore);

  // 리팩토링 2
  const { isModalOpen, prevModal } = useModalStore();

  // 리팩토링 1
  // const { isModalOpen, setIsModalOpen } = useModalStore();

  // modal 숨기기, 보이기 switch 기능
  // const prevModal = () => {
  //   setIsModalOpen((prev) => !prev);
  // };

  return (
    <>
      <h2>ContextQ1Detail2</h2>
      <button onClick={prevModal}>{isModalOpen ? "숨기기" : "보이기"}</button>
    </>
  );
};
export default ContextQ1Detail2;
