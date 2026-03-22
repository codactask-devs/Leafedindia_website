import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import burgerBox from "../../assets/Main/burgerBoxMain.jpg";
import foodBox from "../../assets/Main/foodBoxMain.jpg";
import cupMain from "../../assets/Main/cupMain.jpg";
import bowlMain from "../../assets/Main/bowlMain.jpg";
import foodTrayMain from "../../assets/Main/foodTrayMain.jpg";
import foodBoxAlt1 from "../../assets/FOOD BOX/foodBox1.jpg";
import foodBoxAlt2 from "../../assets/FOOD BOX/foodBox2.jpg";
import Stack from "../../animations/Stack";
import { images } from "../LandingPage/Gallery";

const products = [
    {
        title: "Burger Box",
        description: "Perfectly sized, breathable paper boxes for fresh burgers.",
        image: burgerBox,
        bg: "bg-[#fdf8f3]",
        category: "Fast Food",
        span: "md:col-span-1"
    },
    {
        title: "Paper Cups",
        description: "Versatile, leak-proof cups for hot and cold beverages.",
        image: cupMain,
        bg: "bg-[#f3f9f6]",
        category: "Beverage",
        span: "md:col-span-1 md:row-span-2",
        imgHeight: "h-full"
    },
    {
        title: "Bowl",
        description: "Sturdy and stylish bowls for salads, soups, and more.",
        image: bowlMain,
        bg: "bg-[#fef7f4]",
        category: "Catering",
        span: "md:col-span-1"
    },
    {
        title: "Paper Food Box",
        description: "The ultimate sustainable solution for full meals and takeaway.",
        image: foodBox,
        bg: "bg-[#f8fafc]",
        category: "Takeaway",
        span: "md:col-span-2"
    },
    {
        title: "Paper Tray",
        description: "Open-top trays for easy serving and eco-friendly dining.",
        image: foodTrayMain,
        bg: "bg-[#fdf2f8]",
        category: "Serving",
        span: "md:col-span-1"
    },
    {
        title: "Pizza Box",
        description: "Insulated, robust paper boxes to keep pizzas hot and crisp.",
        image: foodBoxAlt1, // Placeholder
        bg: "bg-[#fffbeb]",
        category: "Pizza",
        span: "md:col-span-1"
    },
    {
        title: "Hexagon Box",
        description: "Unique geometric packaging for premium gifting and food.",
        image: foodBoxAlt2,
        bg: "bg-[#f0fdf4]",
        category: "Specialty",
        span: "md:col-span-1"
    },
    {
        title: "Product Shuffle",
        description: "Explore our diverse range through interactive cards.",
        isStack: true,
        bg: "bg-white",
        category: "Explore",
        span: "md:col-span-1"
    }
];

const ProductGallery = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="w-full py-16 px-6 lg:px-20 bg-orange-50 overflow-hidden">

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 px-4">
                    <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <span className="text-[#fb923c] font-black text-[10px] uppercase tracking-[0.3em] inline-block mb-2">
                            Premium Packaging
                        </span>
                        <h2 className="text-[28px] md:text-[36px] font-black text-[#1a2b4b] leading-[1.1] max-w-md">
                            Our Eco-Friendly Product Range
                        </h2>
                    </div>

                    <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                        <div className="w-10 h-1 bg-[#fb923c] mb-3" />
                        <p className="text-gray-500 font-bold text-xs max-w-[200px] leading-tight">
                            Crafted for quality, designed for the planet. Browse our complete selection.
                        </p>
                    </div>
                </div>

                {/* Masonry Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {products.map((product, index) => {
                        const isStackTile = product.isStack;

                        return (
                            <div
                                key={index}
                                className={`group cursor-pointer transition-all duration-1000 transform ${product.span} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
                                style={{ transitionDelay: `${400 + (index * 150)}ms` }}
                            >
                                <div className={`relative rounded-[32px] overflow-hidden ${isStackTile ? 'bg-linear-to-br from-[#f8fafc] to-[#f1f5f9] h-full' : 'bg-[#f9fafb] flex flex-col h-full'} shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 border border-gray-100 group`}>
                                    {/* Image/Stack Area */}
                                    <div className={`${isStackTile ? 'h-[320px] md:h-full' : (product.imgHeight || 'h-[220px] md:h-[260px]')} w-full ${product.bg} flex items-center justify-center relative overflow-hidden transition-colors duration-500`}>
                                        {isStackTile ? (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className="w-[240px] h-[240px] md:w-[260px] md:h-[260px]">
                                                    <Stack
                                                        randomRotation={true}
                                                        sensitivity={180}
                                                        sendToBackOnClick={true}
                                                        cards={images.map((src, i) => (
                                                            <img
                                                                key={i}
                                                                src={src}
                                                                alt={`shuffle-${i}`}
                                                                loading="lazy"
                                                                className="w-full h-full object-cover pointer-events-none rounded-2xl shadow-lg border-2 border-white/50"
                                                            />
                                                        ))}
                                                        autoplay={true}
                                                        autoplayDelay={4000}
                                                        showHint={false}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                        )}
                                        {/* Category Tag (Premium Pill Style) */}
                                        <div className={`absolute top-6 left-6 bg-white shadow-xl px-5 py-2.5 rounded-2xl transition-all duration-300 group-hover:bg-[#0d6e41] group-hover:scale-105 z-10 border border-gray-100 ${isStackTile ? 'hidden md:block' : ''}`}>
                                            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-[#0d6e41] group-hover:text-white">
                                                {product.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Area - Hidden for Stack */}
                                    {!isStackTile && (
                                        <div className="p-7 flex flex-col gap-3 bg-white grow transition-colors duration-500">
                                            <div className="flex items-center justify-between gap-3">
                                                <h3 className="text-xl md:text-2xl font-black text-[#1a2b4b] tracking-tight leading-none">
                                                    {product.title}
                                                </h3>
                                                <div className="shrink-0 w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#0d6e41] transform transition-all duration-500 group-hover:scale-110 group-hover:bg-[#fb923c] group-hover:text-white group-hover:shadow-md group-hover:shadow-orange-200">
                                                    <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                                                </div>
                                            </div>
                                            <p className="text-gray-500 text-xs font-medium leading-relaxed max-w-[28ch]">
                                                {product.description}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default ProductGallery;
