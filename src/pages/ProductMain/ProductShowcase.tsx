import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

const products = [
    {
        title: "Mailing Box",
        bg: "bg-[#f3d5b5]",
        icon: "📦"
    },
    {
        title: "Take Away Box",
        bg: "bg-[#d8e2dc]",
        icon: "🍱"
    },
    {
        title: "Food Product Box",
        bg: "bg-[#ffe5d9]",
        icon: "🧧"
    }
];

const ProductShowcase = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="py-24 px-6 lg:px-20 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                    <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                        <h2 className="text-[36px] md:text-[48px] font-black text-[#1a2b4b] leading-tight max-w-2xl">
                            Explore Our Core Eco-Friendly Packaging Solutions
                        </h2>
                    </div>
                    
                    <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <span className="text-[#fb923c] font-black text-xs md:text-sm uppercase tracking-[0.4em]">
                            Sustainable Excellence
                        </span>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <div 
                            key={index}
                            className={`group cursor-pointer transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                            style={{ transitionDelay: `${500 + (index * 200)}ms` }}
                        >
                            <div className="relative rounded-[32px] overflow-hidden bg-gray-50 flex flex-col h-full shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
                                {/* Image Placeholder Area */}
                                <div className={`h-[300px] w-full ${product.bg} flex items-center justify-center relative overflow-hidden transition-transform duration-700 group-hover:scale-105`}>
                                    <span className="text-8xl transform transition-transform duration-700 group-hover:scale-125 group-hover:rotate-6">
                                        {product.icon}
                                    </span>
                                    {/* Subtle Overlay */}
                                    <div className="absolute inset-0 bg-white/10" />
                                </div>
                                
                                {/* Content Area */}
                                <div className="p-8 flex items-center justify-between bg-white pt-6">
                                    <h3 className="text-2xl font-black text-[#1a2b4b]">
                                        {product.title}
                                    </h3>
                                    <div className="w-10 h-10 rounded-full bg-[#0d6e41] flex items-center justify-center text-white transform transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-[#fb923c]">
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProductShowcase;
