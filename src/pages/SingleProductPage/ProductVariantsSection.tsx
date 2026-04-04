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
    productName: string;
}

const ProductVariantsSection: React.FC<ProductVariantsSectionProps> = ({
    catchPhrase,
    title,
    description,
    variants,
    variantFolder,
    productName
}) => {
    // Dynamic loading of additional variants
    const dynamicImages = variantFolder ? getImagesInFolder(variantFolder) : [];
    
    // Filter out dynamic images that are already present in static variants
    // We compare URIs or filenames to avoid duplicates
    const existingImageUrls = new Set(variants.map(v => v.image));
    
    const additionalVariants: Variant[] = dynamicImages
        .filter(imgUrl => !existingImageUrls.has(imgUrl))
        .map((imgUrl, idx) => {
            // Get filename without extension for name
            const fileName = imgUrl.split('/').pop()?.split('.')[0] || `Variant ${idx + 1}`;
            // Prettify name (e.g. burgerbox2 -> Burgerbox 2)
            const prettyName = fileName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();

            return {
                name: prettyName,
                description: `A premium ${productName.toLowerCase()} variant.`,
                image: imgUrl
            };
        });

    const allVariants = [...variants, ...additionalVariants];

    return (
        <section className="w-full py-20 px-6 lg:px-20 bg-transparent">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
                    <div className="max-w-2xl space-y-4">
                        <div className="flex items-center gap-2 text-[#7ab55c]">
                            <Leaf size={18} fill="currentColor" />
                            <span className="text-[12px] font-black uppercase tracking-[0.2em]">
                                {catchPhrase}
                            </span>
                        </div>
                        <h2 className="text-[42px] md:text-[64px] font-black text-[#1a2b4b] leading-[1.05] tracking-tight">
                            {title}
                        </h2>
                        <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                            {description}
                        </p>
                    </div>

                    {/* FSC Card */}
                    <div className="bg-[#f7f8f6] p-6 rounded-2xl flex items-center gap-5 border border-gray-100 shadow-sm self-start lg:self-center">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Leaf size={24} className="text-[#0d6e41]" />
                        </div>
                        <div>
                            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                FSC CERTIFIED
                            </p>
                            <p className="text-[#1a2b4b] font-bold text-sm">
                                Responsible Forestry
                            </p>
                        </div>
                    </div>
                </div>

                {/* Variants Grid */}
                <div className="flex flex-nowrap justify-center gap-8 md:gap-6 lg:gap-8 overflow-x-auto pb-8 scrollbar-hide">
                    {allVariants.map((variant, index) => (
                        <div
                            key={index}
                            className="flex-1 min-w-[280px] max-w-[320px] bg-white rounded-[40px] p-4 shadow-sm hover:shadow-xl transition-all duration-500 group border border-gray-50 flex flex-col items-center text-center"
                        >
                            <div className="w-full aspect-square rounded-[32px] overflow-hidden mb-6 bg-[#f9f9f9]">
                                <img
                                    src={variant.image}
                                    alt={variant.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="px-4 pb-4 space-y-2">
                                <h3 className="text-xl font-black text-[#1a2b4b] tracking-tight">
                                    {variant.name}
                                </h3>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                    {variant.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductVariantsSection;
