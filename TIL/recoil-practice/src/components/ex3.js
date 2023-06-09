import { atom, selector, useRecoilState } from "recoil";

const tempFahrenheit = atom({
  key: "tempFahrenheit",
  default: 32,
});

const tempCelsius = selector({
  key: "tempCelsius",
  get: ({ get }) => ((get(tempFahrenheit) - 32) * 5) / 9, // 읽기
  set: ({ set }, newValue) => set(tempFahrenheit, (newValue * 9) / 5 + 32), // 쓰기
});

export default function TempCelsius() {
  const [tempF, setTempF] = useRecoilState(tempFahrenheit);
  const [tempC, setTempC] = useRecoilState(tempCelsius);

  const addTenCelsius = () => setTempC(tempC + 10); // tempC가 10 증가하면서 tempCelsius의 set이 실행되어 tempFahrenheit 값을 변경, newValue에 10이 들어가면서 10 * 9 / 5 + 32 = 50
  const addTenFahrenheit = () => setTempF(tempF + 10); // tempF이 증가하면서 tempCelsius의 get이 실행되어 tempFahrenheit 값을 기반으로 tempCelsius값을 계산, tempFahrenheit이 50의 상태에서 실행하면 -> 60으로 증가하고 get (60 - 32) * 5 / 9 = 15.55555556

  return (
    <div>
      Temp (Celsius): {tempC}
      <br />
      Temp (Fahrenheit): {tempF}
      <br />
      <button onClick={addTenCelsius}>Add 10 Celsius</button>
      <br />
      <button onClick={addTenFahrenheit}>Add 10 Fahrenheit</button>
    </div>
  );
}
