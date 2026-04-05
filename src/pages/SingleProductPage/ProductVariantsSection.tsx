import React from "react";
import { Leaf } from "lucide-react";
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

                {/* --- Section 1: Variants --- */}
                <div className="mb-14">
                    <div className="flex items-center gap-4 mb-10">
                        <h3 className="text-2xl font-black text-[#1a2b4b] uppercase tracking-tight">
                            Product Variants
                        </h3>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {variants.map((variant, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 border border-gray-50 flex flex-col items-center text-center"
                            >
                                <div className="w-full aspect-square rounded-[24px] overflow-hidden mb-6 bg-[#f9f9fafb]">
                                    <img
                                        src={variant.image}
                                        alt={variant.name}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-xl font-black text-[#1a2b4b] tracking-tight group-hover:text-[#0d6e41] transition-colors">
                                        {variant.name}
                                    </h4>
                                    <p className="text-gray-500 text-sm font-bold leading-relaxed px-2">
                                        {variant.description}
                                    </p>
                                </div>
                            </div>
                        ))}
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
        </section>
    );
};

export default ProductVariantsSection;
