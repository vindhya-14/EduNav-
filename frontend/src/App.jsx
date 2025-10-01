import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";

import Navbar from "./components/Navbar";

import ResultPage from "./components/ResultPage";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div
        className="min-h-screen w-full bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1661277679965-9db1104e890f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWlsa3klMjB3YXl8ZW58MHx8MHx8fDA%3D')",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </Router>
  );
}
