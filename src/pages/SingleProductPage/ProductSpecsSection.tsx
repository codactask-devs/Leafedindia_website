import React, { useState } from "react";
import { FileText, Layers, Droplets, PenTool } from "lucide-react";
import type { SpecificationData } from "./productData";

interface ProductSpecsSectionProps {
    productName: string;
    specs: SpecificationData;
}

const ProductSpecsSection: React.FC<ProductSpecsSectionProps> = ({
    productName,
    specs
}) => {
    const [activeTab, setActiveTab] = useState<"materials" | "sizes">("materials");

    const materials = [
        {
            title: "White Paperboard",
            description: "Clean, premium look for branding.",
            bgColor: "bg-[#f8f9fa]",
            icon: <FileText size={24} className="text-gray-400" />
        },
        {
            title: "Kraft Paperboard",
            description: "Natural brown texture for eco-conscious brands.",
            bgColor: "bg-[#eaddd1]",
            icon: <Layers size={24} className="text-[#8b5e34]" />
        },
        {
            title: "PLA or Aqueous Lining",
            description: "Extra protection against moisture and grease.",
            bgColor: "bg-[#f0f4f8]",
            icon: <Droplets size={24} className="text-[#3b82f6]" />
        },
        {
            title: "Soy-based or water-based inks",
            description: "Extra protection against moisture and grease.",
            bgColor: "bg-[#eff6ff]",
            icon: <PenTool size={24} className="text-[#1e40af]" />
        }
    ];

    return (
        <section className="w-full py-20 px-6 lg:px-20 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-[32px] md:text-[48px] font-black text-[#1a2b4b] text-center mb-12 tracking-tight">
                    Specifications & Materials for {productName}
                </h2>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-8">
                    <div className="flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                        <button
                            onClick={() => setActiveTab("materials")}
                            className={`px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                                activeTab === "materials"
                                    ? "bg-[#1a2b4b] text-white shadow-md"
                                    : "text-gray-400 hover:text-gray-600"
                            }`}
                        >
                            MATERIALS
                        </button>
                        <button
                            onClick={() => setActiveTab("sizes")}
                            className={`px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                                activeTab === "sizes"
                                    ? "bg-[#1a2b4b] text-white shadow-md"
                                    : "text-gray-400 hover:text-gray-600"
                            }`}
                        >
                            SIZES
                        </button>
                    </div>
                </div>

                {/* Container */}
                <div className="bg-[#f8f9fc] rounded-[40px] border border-gray-100 p-8 md:p-12 lg:p-16 min-h-[500px] shadow-sm">
                    {activeTab === "materials" ? (
                        <div className="space-y-12 animate-in fade-in duration-500">
                            <h3 className="text-3xl font-black text-[#1a2b4b] text-center tracking-tight">
                                Materials
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {materials.map((mat, idx) => (
                                    <div key={idx} className="bg-white rounded-[32px] p-8 border border-gray-50 shadow-sm flex flex-col items-center text-center group hover:shadow-lg transition-shadow duration-500">
                                        <div className={`w-full aspect-square rounded-[24px] ${mat.bgColor} mb-8 flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}>
                                            {mat.icon}
                                        </div>
                                        <h4 className="text-lg font-black text-[#1a2b4b] mb-3 tracking-tight">
                                            {mat.title}
                                        </h4>
                                        <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                            {mat.description}
                                        </p>
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
                                <p className="text-[#3b82f6] font-bold underline cursor-pointer">
                                    (custom sizes possible)
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
