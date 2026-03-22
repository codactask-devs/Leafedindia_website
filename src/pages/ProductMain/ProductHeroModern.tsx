import foodBoxMain from "../../assets/FOOD BOX/foodBoxMain.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductHeroModern = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden flex md:items-center">
            <div className="absolute inset-0 z-0">
                <img
                    src={foodBoxMain}
                    alt="Sustainable Packaging"
                    width={1920}
                    height={1080}
                    decoding="async"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent z-10" />
            </div>

            <div className="relative pt-28 md:pt-0 z-20 w-full px-6 lg:px-16">
                <div className="max-w-2xl text-left">
                    <nav className={`flex items-center gap-2 text-[13px] font-bold text-gray-400 mb-6 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
                        <Link to="/" className="hover:text-[#0d6e41] transition-colors">Home</Link>
                        <span className="text-gray-300 font-normal">›</span>
                        <span className="text-[#1a2b4b] font-black">Product</span>
                    </nav>

                    <div className={`transition-all duration-1000 delay-150 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} mb-8`}>
                        <p className="text-[#1a2b4b] font-bold text-lg md:text-xl mb-3 tracking-tight">
                            Eco Friendly Food Packaging Products
                        </p>
                        <div className="w-40 h-[2px] bg-[#1a2b4b]" />
                    </div>

                    <h1 className={`text-[54px] md:text-[78px] font-black text-[#1a2b4b] leading-[1.1] mb-2 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                        Our Products
                    </h1>

                    <div className={`transition-all duration-1000 delay-450 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} mb-6`}>
                        <span className="text-[#fb923c] font-black text-[12px] md:text-[14px] uppercase tracking-[0.3em]">
                            Sustainable Excellence
                        </span>
                    </div>

                    <p className={`text-[17px] md:text-[19px] text-gray-700 leading-relaxed font-bold max-w-lg transition-all duration-1000 delay-600 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                        Sustainable packaging solutions designed for the modern food industry.
                        From food-grade materials to custom branding, we help your brand make a
                        positive impact without compromising on quality or aesthetics.
                    </p>
                </div>
            </div>

            <div className={`hidden  absolute bottom-10 left-16 md:flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-50' : 'opacity-0'}`}>
                <div className="w-1 h-12 bg-linear-to-b from-[#1a2b4b] to-transparent rounded-full animate-scroll-hint" />
                <span className="text-[10px] font-bold text-[#1a2b4b] uppercase tracking-widest">Scroll</span>
            </div>

            <style>{`
                @keyframes scroll-hint {
                    0% { transform: scaleY(0); transform-origin: top; }
                    50% { transform: scaleY(1); transform-origin: top; }
                    51% { transform: scaleY(1); transform-origin: bottom; }
                    100% { transform: scaleY(0); transform-origin: bottom; }
                }
                .animate-scroll-hint {
                    animation: scroll-hint 2.5s infinite ease-in-out;
                }
            `}</style>
        </section>
    );
}

export default ProductHeroModern;
