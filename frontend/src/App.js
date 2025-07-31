import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { Card } from "./components/Card";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Card />
    </div>
  );
}

export default App;
