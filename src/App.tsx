import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/LandingPage/HomePage";
import Gallery from "./pages/LandingPage/Gallery";
import Testimonials from "./pages/LandingPage/Testimonials";
import Footer from "./shared/Footer";
import WhyChooseUs from "./pages/LandingPage/WhyChooseUs";
import ProductPage from "./pages/ProductMain/ProductPage";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage";
import LogoScroll from "./shared/LogoScroll";
import ScrollToTop from "./shared/ScrollToTop";
import WhatsAppButton from "./shared/WhatsAppButton";
import RotatingQuotes from "./shared/RotatingQuotes";

// Lazy load the heavy Studio editor
const Editor = lazy(() => import("./studio/pages/Editor"));

// Simple loading fallback
const Loader: React.FC = () => (
  <div className="flex items-center justify-center h-screen bg-[#fdfae9]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d6e41]"></div>
  </div>
);

// Handles scrolling to hash sections after route changes
const HashScrollHandler: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Give the page time to render before scrolling
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);

  return null;
};

const LandingPage: React.FC = () => {
  return (
    <>
      <HomePage />
      <LogoScroll />
      <div className="relative bg-[#fdfae9] ">
        <Gallery />
        <WhyChooseUs />
        <Testimonials />
      </div>
      <RotatingQuotes />
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <HashScrollHandler />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route
          path="/studio"
          element={
            <Suspense fallback={<Loader />}>
              <Editor />
            </Suspense>
          }
        />
      </Routes>
      <WhatsAppButton />
    </Router>
  );
}

export default App;