import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    const activeProduct = (id && products[id as keyof typeof products]) || products["bowls"];
    const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);

    // close lightbox on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedGalleryImage(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

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
            <div className="relative bg-grid-premium overflow-clip cv-auto">

                <ProductVariantsSection
                    catchPhrase={activeProduct.variantsCatchPhrase}
                    title={activeProduct.variantsTitle}
                    description={activeProduct.variantsDescription}
                    variants={activeProduct.variants}
                    galleryImages={activeProduct.galleryImages}
                    onImageClick={(imgUrl) => setSelectedGalleryImage(imgUrl)}
                />
            </div>

            {/* Features & Specs Section */}
            <div className="relative">
                <ProductFeaturesSection
                    productName={activeProduct.productName}
                    featuresImage={activeProduct.featuresImage}
                    className="cv-auto"
                />
                <ProductSpecsSection
                    productName={activeProduct.productName}
                    specs={activeProduct.specs}
                    className="cv-auto"
                />
            </div>

            {/* CTA Section with Refined Background */}
            <div className="relative overflow-hidden bg-grid-premium py-10 cv-auto">

                <ProductCTASection
                    productName={activeProduct.productName}
                    ctaImage={activeProduct.ctaImage}
                />
            </div>

            <RotatingQuotes />
            <Footer />

            {/* Lightbox Modal - Placed at top level to avoid content-visibility clipping */}
            <AnimatePresence>
                {selectedGalleryImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4 cursor-zoom-out"
                        onClick={() => setSelectedGalleryImage(null)}
                    >
                        <button
                            onClick={() => setSelectedGalleryImage(null)}
                            className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white hover:text-white bg-black/50 hover:bg-[#86bc25] rounded-full p-3 transition-colors z-[1000] cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>

                        <motion.img
                            src={selectedGalleryImage}
                            alt="Lightbox view"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3, type: "spring", damping: 25 }}
                            className="max-w-full max-h-[90vh] object-contain rounded-[16px] xl:rounded-[24px] shadow-2xl cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SingleProductPage;
