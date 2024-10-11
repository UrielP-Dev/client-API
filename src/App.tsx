import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TopicsComponent from "./components/TopicCard";
import TopicSelected from "./Pages/TopicSelected";
import NavBar from "./components/Navbar";
import Login from "./Pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          {/* Ruta del login */}
          <Route path="/login" element={<Login />} />

          {/* Redirección por defecto a la ruta login si no está autenticado */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to="/login" />{" "}
                {/* Redirige a login si no hay token */}
              </ProtectedRoute>
            }
          />

          {/* Rutas protegidas */}
          <Route
            path="/topics"
            element={
              <ProtectedRoute>
                <TopicsComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/topic-selected/:id"
            element={
              <ProtectedRoute>
                <TopicSelected />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
