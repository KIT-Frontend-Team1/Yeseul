import ContextQ1Detail2 from "./Detail2";
import ModalStore, { useModalStore } from "../../../../../store/2_context";
import { useContext } from "react";

const ContextQ1Detail = () => {
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
      <h2>ContextQ1Detail</h2>
      <button onClick={prevModal}>{isModalOpen ? "숨기기" : "보이기"}</button>
      <ContextQ1Detail2 />
    </>
  );
};
export default ContextQ1Detail;
