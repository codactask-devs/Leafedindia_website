import { useParams } from "react-router-dom";
import NavBar from "../../shared/NavBar";
import ProductHeroSection from "./ProductHeroSection";
import { products } from "./productData";
import Footer from "../../shared/Footer";
import ProductVariantsSection from "./ProductVariantsSection";
import ProductFeaturesSection from "./ProductFeaturesSection";
import ProductSpecsSection from "./ProductSpecsSection";
import ProductCTASection from "./ProductCTASection";
import doodles from "../../assets/doodle/DODALS.jpg";

const SingleProductPage = () => {
    const { id } = useParams<{ id: string }>();

    // Fallback logic
    const activeProduct = (id && products[id as keyof typeof products]) || products["paper-bowls"];

    return (
        <div className="w-full min-h-screen bg-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <NavBar />

            <ProductHeroSection
                productName={activeProduct.productName}
                catchPhrase={activeProduct.catchPhrase}
                title={activeProduct.title}
                description={activeProduct.description}
                heroImage={activeProduct.heroImage}
            />

            {/* Doodle Section */}
            <div className="relative overflow-hidden">
                <div 
                    className="absolute inset-0 opacity-[0.04] pointer-events-none" 
                    style={{ 
                        backgroundImage: `url(${doodles})`, 
                        backgroundSize: '800px',
                        mixBlendMode: 'multiply'
                    }} 
                />
                <ProductVariantsSection
                    catchPhrase={activeProduct.variantsCatchPhrase}
                    title={activeProduct.variantsTitle}
                    description={activeProduct.variantsDescription}
                    variants={activeProduct.variants}
                    variantFolder={activeProduct.variantFolder}
                    productName={activeProduct.productName}
                />
            </div>

            {/* Grid Section */}
            <div className="bg-grid-subtle">
                <ProductFeaturesSection
                    productName={activeProduct.productName}
                    featuresImage={activeProduct.featuresImage}
                />
            </div>

            <ProductSpecsSection
                productName={activeProduct.productName}
                specs={activeProduct.specs}
            />

            {/* Mixed Background Section */}
            <div className="relative overflow-hidden bg-grid-subtle">
                 <div 
                    className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                    style={{ 
                        backgroundImage: `url(${doodles})`, 
                        backgroundSize: '1000px',
                        backgroundPosition: 'center',
                        mixBlendMode: 'multiply'
                    }} 
                />
                <ProductCTASection 
                    productName={activeProduct.productName}
                    ctaImage={activeProduct.ctaImage}
                />
            </div>

            <style>{`
                .bg-grid-subtle {
                    background-image: 
                        linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px);
                    background-size: 50px 50px;
                }
            `}</style>

            <Footer />

        </div>
    );
};

export default SingleProductPage;
