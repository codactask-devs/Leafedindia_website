import { useParams } from "react-router-dom";
import NavBar from "../../shared/NavBar";
import ProductHeroSection from "./ProductHeroSection";
import { products } from "./productData";
import Footer from "../../shared/Footer";
import ProductVariantsSection from "./ProductVariantsSection";
import ProductFeaturesSection from "./ProductFeaturesSection";
import ProductSpecsSection from "./ProductSpecsSection";
import ProductCTASection from "./ProductCTASection";

import RotatingQuotes from "../../shared/RotatingQuotes";

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

            {/* Variants & Gallery Section with Unified Background */}
            <div className="relative bg-grid-premium overflow-clip">

                <ProductVariantsSection
                    catchPhrase={activeProduct.variantsCatchPhrase}
                    title={activeProduct.variantsTitle}
                    description={activeProduct.variantsDescription}
                    variants={activeProduct.variants}
                    variantFolder={activeProduct.variantFolder}
                />
            </div>

            {/* Features & Specs Section */}
            <div className="relative">
                <ProductFeaturesSection
                    productName={activeProduct.productName}
                    featuresImage={activeProduct.featuresImage}
                />
                <ProductSpecsSection
                    productName={activeProduct.productName}
                    specs={activeProduct.specs}
                />
            </div>

            {/* CTA Section with Refined Background */}
            <div className="relative overflow-hidden bg-grid-premium py-10">

                <ProductCTASection 
                    productName={activeProduct.productName}
                    ctaImage={activeProduct.ctaImage}
                />
            </div>

            <style>{`
                .bg-grid-premium {
                    background-image: 
                        linear-gradient(to right, rgba(13, 110, 65, 0.08) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(13, 110, 65, 0.08) 1px, transparent 1px);
                    background-size: 40px 40px;
                }
            `}</style>

            <RotatingQuotes />
            <Footer />

        </div>
    );
};

export default SingleProductPage;
