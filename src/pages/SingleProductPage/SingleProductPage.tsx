import { useParams } from "react-router-dom";
import NavBar from "../../shared/NavBar";
import ProductHeroSection from "./ProductHeroSection";
import { products } from "./productData";
import Footer from "../../shared/Footer";
import ProductVariantsSection from "./ProductVariantsSection";
import ProductFeaturesSection from "./ProductFeaturesSection";
import ProductSpecsSection from "./ProductSpecsSection";
import ProductCTASection from "./ProductCTASection";

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

            <ProductVariantsSection
                catchPhrase={activeProduct.variantsCatchPhrase}
                title={activeProduct.variantsTitle}
                description={activeProduct.variantsDescription}
                variants={activeProduct.variants}
            />

            <ProductFeaturesSection
                productName={activeProduct.productName}
                featuresImage={activeProduct.featuresImage}
            />

            <ProductSpecsSection
                productName={activeProduct.productName}
                specs={activeProduct.specs}
            />

            <ProductCTASection 
                productName={activeProduct.productName}
                ctaImage={activeProduct.ctaImage}
            />

            <Footer />

        </div>
    );
};

export default SingleProductPage;
