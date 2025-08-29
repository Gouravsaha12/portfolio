import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog"; // <-- new page
import Mainlayout from "./layouts/Mainlayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainlayout><Home /></Mainlayout>} />
        <Route path="/projects" element={<Mainlayout><Projects /></Mainlayout>} />
        <Route path="/blogs" element={<Mainlayout><Blogs /></Mainlayout>} />
        <Route path="/blogs/:id" element={<Mainlayout><Blog /></Mainlayout>} /> {/* dynamic blog */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;