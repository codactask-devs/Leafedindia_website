
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/LandingPage/HomePage";
import Gallery from "./pages/LandingPage/Gallery";
import Testimonials from "./pages/LandingPage/Testimonials";
import Footer from "./shared/Footer";
import WhyChooseUs from "./pages/LandingPage/WhyChooseUs";
import ProductPage from "./pages/ProductMain/ProductPage";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage";
import LogoScroll from "./shared/LogoScroll";

const LandingPage = () => (
  <>
    <HomePage />
    <LogoScroll />
    <Gallery />
    <WhyChooseUs />
    <Testimonials />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;