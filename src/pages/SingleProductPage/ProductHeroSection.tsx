import { ArrowRight, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bg1 from "../../assets/bg2.png";

interface ProductHeroSectionProps {
    productName: string;
    catchPhrase: string;
    title: React.ReactNode;
    description: string;
    heroImage: string;
    ctaText?: string;
    secondaryCtaText?: string;
}

const ProductHeroSection: React.FC<ProductHeroSectionProps> = ({
    productName,
    catchPhrase,
    title,
    description,
    heroImage,
    ctaText = "View Sizes",
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section
            className="w-full pt-32 pb-16 px-6 lg:px-20 overflow-hidden relative"
            style={{
                backgroundImage: `url(${bg1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                {/* Left Content */}
                <div className={`flex-1 space-y-6 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                    {/* Breadcrumbs */}
                    <nav className="flex items-center mb-4 gap-2 text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">
                        <Link to="/" className="hover:text-[#fb923c] transition-colors">Home</Link>
                        <span className="text-gray-300 text-[14px]">›</span>
                        <Link to="/products" className="hover:text-[#fb923c] transition-colors">Products</Link>
                        <span className="text-gray-300 text-[14px]">›</span>
                        <span className="text-[#1a2b4b]">{productName}</span>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-px bg-[#fb923c]" />
                        <span className="text-[12px] md:text-[14px] font-black uppercase tracking-[0.3em] text-[#fb923c]">
                            {catchPhrase}
                        </span>
                    </div>

                    <h1 className="text-[44px] md:text-[64px] font-black text-[#1a2b4b] leading-[1.1] tracking-tight">
                        {title}
                    </h1>

                    <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <button
                            onClick={() => {
                                document.getElementById('product-specs')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group flex items-center gap-3 px-8 py-4 bg-[#0d6e41] text-white rounded-full font-bold text-lg hover:bg-[#3d5a0a] transition-all duration-300 shadow-xl shadow-green-100 hover:cursor-pointer"
                        >
                            {ctaText}
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                    </div>
                </div>

                {/* Right Image */}
                <div className={`flex-1 relative transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
                    <div className="relative z-10 rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl border-8 md:border-12 border-white">
                        <img
                            src={heroImage}
                            alt="Product Hero"
                            loading="eager"
                            fetchPriority="high"
                            className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                        />
                        {/* Floating Trusted Card */}
                        <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-gray-100 max-w-[180px] md:max-w-[240px] animate-pulse-gentle">
                            <div className="flex gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className="fill-[#fb923c] text-[#fb923c]" />
                                ))}
                            </div>
                            <p className="text-[10px] md:text-[12px] font-bold text-[#1a2b4b] leading-tight">
                                Trusted by 3,000+ F&B brands across the country.
                            </p>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-30 z-0" />
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-30 z-0" />
                </div>
            </div>

            <style>{`
                @keyframes pulse-gentle {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                }
                .animate-pulse-gentle {
                    animation: pulse-gentle 4s infinite ease-in-out;
                }
            `}</style>
        </section>
    );
};

export default ProductHeroSection;
