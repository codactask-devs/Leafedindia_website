import React, { useState, useEffect, useRef } from "react";
import { Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variant } from "./productData";
import { getImagesInFolder } from "../../shared/utils/assetLoader";

interface ProductVariantsSectionProps {
    catchPhrase: string;
    title: string;
    description: string;
    variants: Variant[];
    variantFolder?: string;
}

const ProductVariantsSection: React.FC<ProductVariantsSectionProps> = ({
    catchPhrase,
    title,
    description,
    variants,
    variantFolder,
}) => {
    const [activeVariantIndex, setActiveVariantIndex] = useState(0);
    const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    // close lightbox on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedGalleryImage(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
                        if (index !== -1) {
                            setActiveVariantIndex(index);
                        }
                    }
                });
            },
            {
                rootMargin: "-40% 0px -40% 0px", // Trigger when the element crosses the vertical center
                threshold: 0
            }
        );

        const validRefs = sectionRefs.current.filter((ref): ref is HTMLDivElement => ref !== null);
        validRefs.forEach((ref) => {
            observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [variants]);

    // Dynamic loading of additional gallery images
    const dynamicImages = variantFolder ? getImagesInFolder(variantFolder) : [];
    
    // Filter out dynamic images that are already present in static variants
    const existingImageUrls = new Set(variants.map(v => v.image));
    const galleryItems = dynamicImages.filter(imgUrl => !existingImageUrls.has(imgUrl));

    return (
        <section className="w-full py-24 px-6 lg:px-20 bg-transparent">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-20">
                    <div className="max-w-2xl space-y-5">
                        <div className="flex items-center gap-2 text-[#7ab55c]">
                            <Leaf size={18} fill="currentColor" />
                            <span className="text-[12px] font-black uppercase tracking-[0.2em]">
                                {catchPhrase}
                            </span>
                        </div>
                        <h2 className="text-[48px] md:text-[68px] font-black text-[#1a2b4b] leading-none tracking-tight">
                            {title}
                        </h2>
                        <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                            {description}
                        </p>
                    </div>

                    {/* FSC Card */}
                    <div className="bg-[#f7f8f6] p-7 rounded-[32px] flex items-center gap-6 border border-gray-100 shadow-sm self-start lg:self-center">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                            <Leaf size={28} className="text-[#0d6e41]" />
                        </div>
                        <div>
                            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                FSC CERTIFIED
                            </p>
                            <p className="text-[#1a2b4b] font-bold text-base leading-none mt-1">
                                Responsible Forestry
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- Section 1: Variants (Sticky Scroll Layout) --- */}
                <div className="mb-24 lg:mb-32 relative">
                    {/* Mobile Header */}
                    <div className="lg:hidden flex items-center gap-4 mb-4">
                        <h3 className="text-2xl font-black text-[#1a2b4b] uppercase tracking-tight">
                            Product Variants
                        </h3>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start relative">
                        {/* Sticky Left Media (Desktop) */}
                        <div className="hidden lg:flex w-1/2 flex-col sticky top-24 h-[calc(100vh-8rem)] justify-center">
                            {/* Desktop Header placed inside sticky container so it never gets buried */}
                            <div className="flex items-center gap-4 mb-8 w-full">
                                <h3 className="text-2xl font-black text-[#1a2b4b] uppercase tracking-tight">
                                    Product Variants
                                </h3>
                                <div className="flex-1 h-px bg-gray-100" />
                            </div>
                            
                            <div className="w-full aspect-square rounded-[40px] bg-[#f9f9fafb] overflow-hidden shadow-2xl relative border border-gray-100">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeVariantIndex}
                                        src={variants[activeVariantIndex]?.image}
                                        alt={variants[activeVariantIndex]?.name}
                                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 1.05, y: -20 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Scrolling Right Content */}
                        <div className="w-full lg:w-1/2 flex flex-col lg:pt-[20vh] lg:pb-[40vh]">
                            {variants.map((variant, index) => (
                                <div
                                    key={index}
                                    ref={(el) => { sectionRefs.current[index] = el; }}
                                    className="min-h-[50vh] lg:min-h-[80vh] flex flex-col justify-center transition-opacity duration-700 pt-10 lg:pt-0"
                                    style={{ opacity: activeVariantIndex === index ? 1 : 0.3 }}
                                >
                                    {/* Mobile inline image */}
                                    <div className="lg:hidden w-full aspect-square rounded-[32px] bg-[#f9f9fafb] overflow-hidden shadow-lg mb-8 border border-gray-100">
                                        <img src={variant.image} alt={variant.name} className="w-full h-full object-cover" />
                                    </div>
                                    
                                    <div className="pr-4 lg:pr-10">
                                        <h4 className="text-[32px] md:text-[48px] font-black text-[#1a2b4b] tracking-tight leading-[1.1] mb-6">
                                            {variant.name}
                                        </h4>
                                        <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
                                            {variant.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Section 2: Gallery --- */}
                {galleryItems.length > 0 && (
                    <div className="mb-10">
                        <div className="flex items-center gap-4 mb-10">
                            <h3 className="text-2xl font-black text-[#1a2b4b] uppercase tracking-tight">
                                Gallery
                            </h3>
                            <div className="flex-1 h-px bg-gray-100" />
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[160px] md:auto-rows-[220px] gap-4 md:gap-5 grid-flow-row-dense">
                            {galleryItems.map((imgUrl, index) => {
                                // Create a visual pattern for a masonry-like feel
                                const position = index % 5;
                                let spanClass = "col-span-1 row-span-1";
                                
                                if (position === 0) {
                                    spanClass = "col-span-2 row-span-2"; // Large feature image
                                } else if (position === 3) {
                                    spanClass = "col-span-2 row-span-1"; // Wide landscape image
                                }

                                return (
                                    <div 
                                        key={index} 
                                        className={`group relative rounded-[24px] overflow-hidden bg-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-zoom-in ${spanClass}`}
                                        onClick={() => setSelectedGalleryImage(imgUrl)}
                                    >
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10 pointer-events-none" />
                                        <img 
                                            src={imgUrl} 
                                            alt={`gallery-${index}`} 
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedGalleryImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 cursor-zoom-out"
                        onClick={() => setSelectedGalleryImage(null)}
                    >
                        <button
                            onClick={() => setSelectedGalleryImage(null)}
                            className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white hover:text-white bg-black/50 hover:bg-[#86bc25] rounded-full p-3 transition-colors z-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
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
        </section>
    );
};

export default ProductVariantsSection;
