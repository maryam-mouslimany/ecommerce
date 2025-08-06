import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import ChatWidget from "./features/AI/components/Chatbot/ChatWidget";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
      <ChatWidget />
      {/* <Card /> */}
    </div>
  );
}

export default App;
