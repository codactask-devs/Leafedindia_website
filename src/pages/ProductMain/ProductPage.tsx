import Footer from "../../shared/Footer";
import NavBar from "../../shared/NavBar";
import ProductHeroModern from "./ProductHeroModern";
import ProductGallery from "./ProductGallery";
import BrandFreshLook from "./BrandFreshLook";
import FAQ from "../../shared/FAQ";
import RotatingQuotes from "../../shared/RotatingQuotes";

const ProductPage = () => {
    return (
        <div className="w-full min-h-screen bg-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <NavBar />

            <ProductHeroModern />
            
            <div className="relative">
                {/* Unified Background Layer */}
                <div className="absolute inset-0 z-0 bg-linear-to-b from-white via-[#fefbea] to-white">
                    <div 
                        className="absolute inset-0 opacity-[0.08]" 
                        style={{ 
                            backgroundImage: `linear-gradient(#0d6e41 1px, transparent 1px), linear-gradient(90deg, #0d6e41 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                        }} 
                    />
                </div>

                <div className="relative z-10">
                    <ProductGallery />
                    <FAQ />
                </div>
            </div>

            <BrandFreshLook />
            <RotatingQuotes />
            <Footer />
        </div>
    )
}

export default ProductPage;
