import React, { useState } from "react";
import { FileText, Layers, Droplets, PenTool } from "lucide-react";
import type { SpecificationData } from "./productData";
import bg2 from "../../assets/bg1.png";
import quoteBackground from "../../assets/quote_background.png";


interface ProductSpecsSectionProps {
    productName: string;
    specs: SpecificationData;
}

const materialLibrary: Record<string, { title: string, description: string, bgColor: string, icon: React.ReactNode }> = {
    "white-paperboard": {
        title: "White Paperboard",
        description: "Clean, premium look for branding.",
        bgColor: "bg-[#f8f9fa]",
        icon: <FileText size={24} className="text-gray-400" />
    },
    "kraft-paperboard": {
        title: "Kraft Paperboard",
        description: "Natural brown texture for eco-conscious brands.",
        bgColor: "bg-[#eaddd1]",
        icon: <Layers size={24} className="text-[#8b5e34]" />
    },
    "pe-aqueous": {
        title: "PE/Aqueous Lining",
        description: "Extra protection against moisture and grease.",
        bgColor: "bg-[#f0f4f8]",
        icon: <Droplets size={24} className="text-[#3b82f6]" />
    },
    "aqueous": {
        title: "Aqueous Lining",
        description: "Eco-friendly protection against moisture.",
        bgColor: "bg-[#f0f4f8]",
        icon: <Droplets size={24} className="text-[#3b82f6]" />
    },
    "soy-ink": {
        title: "Soy-based or water-based inks",
        description: "Safe, vibrant, and environmentally friendly.",
        bgColor: "bg-[#eff6ff]",
        icon: <PenTool size={24} className="text-[#1e40af]" />
    }
};

const productMaterialsMap: Record<string, string[]> = {
    "Paper Food Box": ["white-paperboard", "kraft-paperboard", "pe-aqueous"],
    "Burger Box": ["white-paperboard", "kraft-paperboard", "pe-aqueous"],
    "Paper Tray": ["white-paperboard", "kraft-paperboard", "pe-aqueous"],
    "Pizza Box": ["white-paperboard", "kraft-paperboard", "pe-aqueous"],
    "Paper Cups": ["aqueous"],
    "Bowls": ["aqueous"],
    "Hexagon Box": ["white-paperboard", "kraft-paperboard", "pe-aqueous", "soy-ink"],
};

const ProductSpecsSection: React.FC<ProductSpecsSectionProps> = ({
    productName,
    specs
}) => {
    const [activeTab, setActiveTab] = useState<"materials" | "sizes">("materials");

    // Fallback to default materials if product not found
    const currentMaterialKeys = productMaterialsMap[productName] || ["white-paperboard", "kraft-paperboard", "pe-aqueous"];
    const materials = currentMaterialKeys.map(key => materialLibrary[key]);

    return (
        <section
            id="product-specs"
            className="w-full py-20 px-6 lg:px-20 overflow-hidden relative"

        >

            <div className="max-w-7xl mx-auto"
            >
                <h2 className="text-[32px] md:text-[48px] font-black text-[#1a2b4b] text-center mb-12 tracking-tight">
                    Specifications & Materials for {productName}
                </h2>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-8">
                    <div className="flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                        <button
                            onClick={() => setActiveTab("materials")}
                            className={`hover:cursor-pointer px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === "materials"
                                ? "bg-[#1a2b4b] text-white shadow-md"
                                : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            MATERIALS
                        </button>
                        <button
                            onClick={() => setActiveTab("sizes")}
                            className={`hover:cursor-pointer px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === "sizes"
                                ? "bg-[#1a2b4b] text-white shadow-md"
                                : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            SIZES
                        </button>
                    </div>
                </div>

                {/* Container */}
                <div style={{
                    backgroundImage: `url(${quoteBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }} className="bg-[#f8f9fc] rounded-[24px] md:rounded-[40px] border border-gray-100 p-5 md:p-12 lg:p-16 min-h-[200px] md:min-h-[500px] shadow-sm">
                    {activeTab === "materials" ? (
                        <div className="space-y-12 animate-in fade-in duration-500 max-w-5xl mx-auto">
                            <h3 className="text-3xl font-black text-[#1a2b4b] text-center tracking-tight">
                                Materials
                            </h3>
                            <div className="flex flex-col gap-6">
                                {materials.map((mat, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white w-full md:w-[70%] max-w-2xl mx-auto rounded-[32px] md:rounded-[40px] p-8 md:p-10 border border-gray-50 shadow-sm flex flex-col md:flex-row items-center md:items-start group hover:shadow-lg transition-all duration-500 gap-6 md:gap-8"
                                    >
                                        <div className={`w-20 h-20 md:w-28 md:h-28 shrink-0 rounded-2xl md:rounded-[32px] ${mat.bgColor} flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}>
                                            <div className="scale-125 md:scale-150">
                                                {mat.icon}
                                            </div>
                                        </div>
                                        <div className="flex flex-col text-center md:text-left pt-2">
                                            <h4 className="text-xl md:text-2xl font-black text-[#1a2b4b] mb-2 md:mb-3 tracking-tight">
                                                {mat.title}
                                            </h4>
                                            <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed">
                                                {mat.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
                            <h3 className="text-3xl font-black text-[#1a2b4b] text-center tracking-tight">
                                Sizes
                            </h3>
                            <div className="text-center">
                                <p className="text-[#1a2b4b] font-bold text-lg mb-2">
                                    {specs.volumeOptions}
                                </p>

                            </div>

                            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm mt-8 bg-white">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#94c11f] text-white">
                                            <th className="px-6 py-4 font-bold text-sm">Volume</th>
                                            <th className="px-6 py-4 font-bold text-sm">DIMENSION (Top diameter; base diameter; height)</th>
                                            <th className="px-6 py-4 font-bold text-sm">Pieces/Carton</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {specs.tableData.map((row, idx) => (
                                            <tr key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-[#fdfdfd]"} hover:bg-[#f9f9f9] transition-colors`}>
                                                <td className="px-6 py-4 text-sm font-medium text-[#1a2b4b]">{row.volume}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{row.dimension}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{row.pieces}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductSpecsSection;
