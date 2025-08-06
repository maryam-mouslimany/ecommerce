import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import AdminRouteGuard from "./components/AdminRouteGuard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AdminRouteGuard>
            <AppRoutes />
          </AdminRouteGuard>
        </AuthProvider>
      </BrowserRouter>
      {/* <Card /> */}
    </div>
  );
}

export default App;
