import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopicsComponent from './components/TopicCard';
import TopicSelected from './Pages/TopicSelected';
import NavBar from './components/Navbar';
import Login from './Pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          {/* Ruta del login */}
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas */}
          <Route 
            path="/" 
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
