import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const LandingPage: React.FC = () => {
  return (
    <>
      <HomePage />
      <LogoScroll />
      <div className="relative bg-[#fdfae9] ">
        <Gallery />
        {/* <section className="absolute inset-0 z-0 pointer-events-none">
          <div className=" bg-[#0d6e41] w-full" />
          <div className="flex h-full w-full flex-row">
            <div className="w-[60%] h-full bg-[#0d6e41] hidden md:block rounded-br-[70px]" />
            <div className="flex-1 h-full bg-white rounded-b-[70px] " />
          </div>
        </section> */}
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