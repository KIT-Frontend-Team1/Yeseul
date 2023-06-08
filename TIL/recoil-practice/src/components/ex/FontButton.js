import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import Text from "./Text";

// atom: 가장 작은 state 단위
export const fontSizeState = atom({
  key: "fontSizeState",
  default: 14,
});

// selector: 파생된 state, atoms나 다른 selectors를 입력으로 받아들이는 순수 함수
const fontSizeLabelState = selector({
  key: "fontSizeLabelState",
  get: ({ get }) => {
    const fontSize = get(fontSizeState);
    const unit = "px";

    return `${fontSize}${unit}`;
  },
});

const FontButton = () => {
  // useRecoilState : 읽기, 쓰기 가능
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);

  // useRecoilValue: 읽기 전용(getter return)
  const fontSizeLabel = useRecoilValue(fontSizeLabelState);

  return (
    <>
      <div>Curren font size : {fontSizeLabel}</div>
      <button onClick={() => setFontSize(fontSize + 1)} style={{ fontSize }}>
        Click to Enlarge
      </button>
      <Text />
    </>
  );
};

export default FontButton;
