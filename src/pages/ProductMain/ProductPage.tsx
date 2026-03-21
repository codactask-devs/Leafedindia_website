import Footer from "../../shared/Footer";
import NavBar from "../../shared/NavBar";
import ProductHeroModern from "./ProductHeroModern";
import ProductShowcase from "./ProductShowcase";

const ProductPage = () => {
    return (
        <div className="w-full min-h-screen bg-[#fefbea]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <NavBar />

            <ProductHeroModern />

            <ProductShowcase />

            <div className="h-32 bg-linear-to-b from-[#fefbea] to-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #0d6e41 1px, transparent 1px), linear-gradient(-45deg, #0d6e41 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <Footer />
        </div>
    )
}

export default ProductPage;
