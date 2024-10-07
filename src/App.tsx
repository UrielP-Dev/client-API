import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopicsComponent from "./components/TopicCard";
import TopicSelected from "./Pages/TopicSelected";
import NavBar from "./components/Navbar";
function App() {
  return (
    <>
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<TopicsComponent />} />{" "}
            <Route
              path="/topic-selected/:id"
              element={<TopicSelected />}
            />{" "}
          </Routes>
        </div>
      </Router>
    </>
  );
}
export default App;
