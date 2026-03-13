import Lenis from "lenis";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import Gallery from "./pages/Gallery";

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
    </>
  );
}

export default App;