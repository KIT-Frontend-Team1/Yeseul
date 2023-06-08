import "./App.css";
import { RecoilRoot } from "recoil";
import TodoList from "./components/todo";

function App() {
  return (
    <RecoilRoot>
      {/* <FontButton />
      <CharactoerCounter /> */}
      <TodoList />
    </RecoilRoot>
  );
}

export default App;
