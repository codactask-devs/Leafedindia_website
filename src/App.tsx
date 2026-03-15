
import HomePage from "./pages/HomePage";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";
import Footer from "./shared/Footer";
import WhyChooseUs from "./pages/WhyChooseUs";

function App() {

  // useEffect(() => {
  //   const lenis = new Lenis();

  //   function raf(time: number) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  // }, []);

  return (
    <>
      <HomePage />
      <Gallery />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </>
  );
}

export default App;