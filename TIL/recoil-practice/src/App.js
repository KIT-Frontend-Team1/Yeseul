import "./App.css";
import { RecoilRoot } from "recoil";
import TodoList from "./components/todo";
import TempCelsius from "./components/ex3";
import FormContent from "./components/ex4";

function App() {
  return (
    <RecoilRoot>
      {/* <FontButton />
      <CharactoerCounter /> */}
      <TodoList />
      <TempCelsius />
      <FormContent />
    </RecoilRoot>
  );
}

export default App;
