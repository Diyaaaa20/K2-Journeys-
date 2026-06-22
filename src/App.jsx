import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import VisaPage from "./pages/VisaPage";
import BlogPage from "./pages/BlogPage";
import TravelStories from "./pages/TravelStories";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/about" />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/visa" element={<VisaPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/travel-stories" element={<TravelStories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
