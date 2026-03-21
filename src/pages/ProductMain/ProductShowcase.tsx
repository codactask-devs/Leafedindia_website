import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import burgerBox from "../../assets/Main/burgerBoxMain.jpg";
import foodBox from "../../assets/Main/foodBoxMain.jpg";
import noodlesBox from "../../assets/Main/noodlesBoxMain.jpg";

const products = [
    {
        title: "Mailing Box",
        description: "Durable, eco-friendly shipping solutions for your brand.",
        image: burgerBox,
        bg: "bg-[#fdf8f3]",
        category: "Shipping"
    },
    {
        title: "Take Away Box",
        description: "Keep food fresh and secure with sustainable materials.",
        image: foodBox,
        bg: "bg-[#f3f9f6]",
        category: "Takeaway"
    },
    {
        title: "Food Product Box",
        description: "Premium packaging designed for display and safety.",
        image: noodlesBox,
        bg: "bg-[#fef7f4]",
        category: "Food Grade"
    }
];

const ProductShowcase = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="py-24 px-6 lg:px-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 px-4">
                    <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                        <h2 className="text-[36px] md:text-[48px] font-black text-[#1a2b4b] leading-[1.1] max-w-2xl">
                            Explore Our Core Eco-Friendly Packaging Solutions
                        </h2>
                    </div>

                    <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <span className="text-[#fb923c] font-black text-xs md:text-sm uppercase tracking-[0.4em] inline-block mb-2">
                            Sustainable Excellence
                        </span>
                        <div className="w-12 h-1 bg-[#fb923c]" />
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className={`group cursor-pointer transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                            style={{ transitionDelay: `${500 + (index * 200)}ms` }}
                        >
                            <div className="relative rounded-[32px] overflow-hidden bg-[#f9fafb] flex flex-col h-full shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100">
                                {/* Image Area */}
                                <div className={`h-[320px] w-full ${product.bg} flex items-center justify-center relative overflow-hidden`}>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        loading="lazy"
                                        decoding="async"
                                        width={400}
                                        height={320}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Category Tag */}
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm transition-transform duration-300 group-hover:scale-105">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#0d6e41]">
                                            {product.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-10 flex flex-col gap-4 bg-white grow">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-2xl font-black text-[#1a2b4b] tracking-tight">
                                            {product.title}
                                        </h3>
                                        <div className="w-12 h-12 rounded-full bg-[#0d6e41] flex items-center justify-center text-white transform transition-all duration-300 group-hover:scale-110 group-hover:bg-[#fb923c] group-hover:shadow-[0_0_20px_rgba(251,146,60,0.4)]">
                                            <ChevronRight size={22} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-[25ch]">
                                        {product.description}
                                    </p>
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
