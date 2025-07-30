import logo from "./logo.svg";

import "./App.css";
import { Button } from "./components/Button/index";
import { Caption } from "./components/Caption/index";

function App() {
  return (
    <div className="App">
      <Button label="Primary Button" variant="primary" />
      <Caption />
    </div>
  );
}

export default App;
