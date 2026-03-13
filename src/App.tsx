import Lenis from "lenis";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import Gallery from "./pages/Gallery";
import Testimonials from "./shared/Testimonials";
import Footer from "./shared/Footer";

function App() {

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <HomePage />
      <Gallery />
      <Testimonials />
      <Footer />
    </>
  );
}

export default App;